---
layout: default
title: Escaneo Pasivo
---

## Herramientas

- The Harvester
    
- Intelligence X
    
- Sherlock CLI
    
- Hunter.io
    
- Epieos.com
    
- Security Trails
    
- HackedList.io
    
- Pimeyes
    
- Phonebook.cz
    
- [Face++ Comparing](https://www.faceplusplus.com/face-comparing/)
    
- [Shodan Blog: 5 Free Things](https://blog.shodan.io/5-free-things-for-everybody/)
    
- Zoomeye, Shodan, FOFA
    

---

## Buscar vulnerabilidades pasivo

```bash
shodan search --fields ip_str net:IP/16 > listado_IPS
```

---

## Buscar subdominios

```bash
subdominator -d domain -s >> subdomains.txt
subdominator -d subdomains.txt -s
```


```bash
dnsrecon -r <IP>-<IP> | awk '{print $3}' >> subdomains.txt

curl -s 'https://api.securitytrails.com/v1/ips/nearby/<IP>?apikey=<API_KEY>' | jq -r '.blocks[].hostnames[]'

massdns -r ../lists/resolvers.txt -t PTR ../../<listado ips> -o L -w IPS.txt

curl -s 'https://api.securitytrails.com/v1/domain/<DOMAIN>/subdomains?apikey=<API_KEY>' | jq -r '.subdomains[]' | sed 's/$/.DOMAIN.es/' > subdomains.txt
```

---

## Listar IPs

```bash
prips 12.204.192.0 12.204.223.255 > ips_rango1.txt
prips 12.204.192.0 12.204.207.255 > ips_rango2.txt
```

---
## Assetfinderls

---

## Vulnerabilidades y puertos abiertos

```bash
while read -r line; do
  response=$(curl -s "https://internetdb.shodan.io/$line")

  has_ports=$(echo "$response" | jq '(.ports | length) > 0')

  if [ "$has_ports" != "true" ]; then
    continue
  fi

  echo "=====================================" >> shodan.txt
  echo "IP: $line" >> shodan.txt

  echo "$response" | jq -r '
    def join_or_na(arr): if arr == null or arr == [] then "Ninguno" else arr | join(", ") end;
    "PUERTOS ABIERTOS     : \(join_or_na(.ports))",
    "VULNERABILIDADES     : \(join_or_na(.vulns))"
  ' >> shodan.txt

  echo "=====================================" >> shodan.txt
  echo "" >> shodan.txt

  sleep 2
done < ips_pentest_externo.txt
```

---

## Cambiar lista de rangos a IPs

```bash
#!/bin/bash

while read -r line; do
  if [[ "$line" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+(/[0-9]+)?$ ]]; then
    if [[ "$line" == */* ]]; then
      prips "$line" >> ips.txt
    else
      echo "$line" >> ips.txt
    fi
  else
    echo "Formato inválido: $line" >&2
  fi
done < "$1"
```

---

## Resolver con nslookup

```bash
#!/bin/bash

> hosts_resueltos.txt

while read -r ip; do
  resultado=$(nslookup "$ip" 2>/dev/null | grep 'name =')
  if [[ -n "$resultado" ]]; then
    hostname=$(echo "$resultado" | awk -F' = ' '{print $2}' | sed 's/\.$//')
    echo "$ip,$hostname" >> hosts_resueltos.txt
  fi
done < ips.txt
```

---

## IsWebActive.sh

```bash
while read -r domain; do
  url_https="https://$domain"
  url_http="http://$domain"

  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url_https")

  if [[ "$code" =~ ^2|^3 ]]; then
    echo "[ACTIVA]   $url_https (HTTP $code)"
    continue
  fi

  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url_http")

  if [[ "$code" =~ ^2|^3 ]]; then
    echo "[ACTIVA]   $url_http (HTTP $code)"
  else
    echo "[INACTIVA] $domain (HTTP $code)"
  fi
done < dominios.txt
```

---

Dividir archivo de IPs
```
split -l 50 ips.txt ips_
```

___

## SecurityTrails - reverse lookup a ips para sacar subdominios

```bash
#!/bin/bash

# Mostrar ayuda
usage() {
  echo "Uso: $0 -i <archivo_entrada> -o <archivo_salida> -k <archivo_claves_api>"
  echo ""
  echo "Opciones:"
  echo "  -i   Archivo con la lista de IPs a consultar (una por línea)"
  echo "  -o   Archivo donde se guardarán los hostnames (se añaden sin duplicados)"
  echo "  -k   Archivo con las claves API de SecurityTrails (una por línea)"
  echo "  -h   Mostrar esta ayuda"
  exit 1
}

# Parsear argumentos
while getopts ":i:o:k:h" opt; do
  case $opt in
    i) input="$OPTARG" ;;
    o) output="$OPTARG" ;;
    k) keys_file="$OPTARG" ;;
    h) usage ;;
    \?) echo "❌ Opción inválida: -$OPTARG" >&2; usage ;;
    :) echo "❌ La opción -$OPTARG requiere un argumento." >&2; usage ;;
  esac
done

# Validar argumentos requeridos
if [[ -z "$input" || -z "$output" || -z "$keys_file" ]]; then
  echo "❌ Faltan argumentos obligatorios."
  usage
fi

# Validar existencia de archivos
[[ ! -f "$input" ]] && echo "❌ El archivo de entrada '$input' no existe." >&2 && exit 2
[[ ! -f "$keys_file" ]] && echo "❌ El archivo de claves '$keys_file' no existe." >&2 && exit 2

# Leer claves API en un array
mapfile -t API_KEYS < "$keys_file"
num_keys=${#API_KEYS[@]}

if [[ $num_keys -eq 0 ]]; then
  echo "❌ No se encontraron claves API en '$keys_file'" >&2
  exit 3
fi

# Contar IPs y verificar si hay suficientes claves
total_ips=$(grep -cve '^\s*$' "$input") # ignora líneas vacías
max_requests=$((num_keys * 50))

if (( total_ips > max_requests )); then
  echo "🚫 Demasiadas IPs: $total_ips. Máximo permitido con $num_keys claves API es $max_requests (50 por clave)." >&2
  exit 4
fi

# API
API_URL="https://api.securitytrails.com/v1/ips/nearby"

# Contadores
counter=1
key_index=0
requests_with_current_key=0

# Iterar por IPs
while IFS= read -r ip; do
  [[ -z "$ip" ]] && continue  # saltar líneas vacías
  echo "[$counter/$total_ips] Consultando IP: $ip"

  # Cambiar API key si se han hecho 50 solicitudes
  if (( requests_with_current_key >= 50 )); then
    ((key_index++))
    requests_with_current_key=0

    if (( key_index >= num_keys )); then
      echo "🚫 Se han agotado todas las claves API disponibles tras $counter solicitudes." >&2
      break
    fi

    echo "🔁 Cambiando a nueva API key (${key_index}+1 de $num_keys)"
  fi

  API_KEY="${API_KEYS[$key_index]}"
  ((requests_with_current_key++))

  response=$(curl -s --fail "$API_URL/$ip?apikey=$API_KEY")
  exit_code=$?

  if [ $exit_code -ne 0 ]; then
    echo "⚠️  Error consultando $ip (código curl: $exit_code)" >&2
  else
    hostnames=$(echo "$response" | jq -r '.blocks[].hostnames[]?' 2>/dev/null)

    if [[ -n "$hostnames" ]]; then
      echo "$hostnames" >> "$output"
      echo "✅ Hostnames encontrados:"
      echo "$hostnames"
    else
      echo "❌ No se encontraron hostnames para $ip"
    fi
  fi

  ((counter++))
  sleep 2
done < "$input"

# Eliminar duplicados del archivo de salida (in-place)
sort -u "$output" -o "$output"

echo "🎉 Consulta completada. Resultados únicos añadidos en: $output"


```

---

## httpx- consultar si los hosts están activos

```bash
~/go/bin/httpx -l hostnames_final.txt -sc -title -t 50 -timeout 5
```

---

## CheckHostnames.txt - Consultar si los hostnames están en alcance

```bash
#!/bin/bash

# Archivos de entrada y salida
HOSTNAMES_FILE="hostnames.txt"
IPS_FILE="ips.txt"
OUTPUT_FILE="hostnames_scope.txt"

# Limpiamos el archivo de salida anterior si existe
> "$OUTPUT_FILE"

# Recorremos cada hostname
while read -r hostname; do
  # Resolvemos la IP usando dig (puedes usar getent o nslookup si lo prefieres)
  ip=$(dig +short "$hostname" | grep -Eo '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | head -n1)

  # Si se ha obtenido una IP y está en la lista de IPs
  if [[ -n "$ip" ]] && grep -Fxq "$ip" "$IPS_FILE"; then
    echo "$hostname" >> "$OUTPUT_FILE"
    echo "[✔] $hostname -> $ip está en el scope"
  else
    echo "[✘] $hostname -> $ip no está en el scope"
  fi
done < "$HOSTNAMES_FILE"

```