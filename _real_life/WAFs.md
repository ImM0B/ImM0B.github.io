---
layout: default
title: WAFs
---

# Bypass

Tratar de acceder a la IP del backend
```
https://viewdns.info/iphistory/?domain=DOMAIN
```

___
**Wafw00f**  
Detecta la presencia y tipo de WAF mediante patrones conocidos.

```bash
wafw00f https://target.com
```

**WhatWaf**  
Similar a Wafw00f pero con más payloads de evasión.

```bash
whatwaf -u https://target.com
```

**WhatWeb**  
Recon de tecnologías web, puede detectar plugins de seguridad y WAFs.  
✅ **Check:** Ver si WhatWeb está bloqueado por el WAF:

```bash
whatweb https://target.com
```

**Gobuster**  
Fuzzing de rutas/archivos.  
✅ **Check:** Ver si fuzzing está bloqueado:

```bash
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt
```

**ViewDNS**  
Ver historial de IPs para identificar la IP real del backend y saltar el WAF (si hay CDN o reverse proxy).

- [Historial IP](https://viewdns.info/iphistory/)
    
- [Reverse IP Lookup](https://viewdns.info/reverseip/)
    

**Wappalyzer**  
Extensión o CLI para detectar tecnologías y posibles WAFs.

**curl -I**  
Revisar cabeceras HTTP para detectar pistas del WAF:

```bash
curl -I https://target.com
```

---

### 🧪 Testing de resistencia del WAF

**GoTestWAF**  
Envía payloads automatizados para comprobar la eficacia del WAF.

Ejecución básica:

```bash
sudo docker run --rm \
-v ${PWD}/reports:/app/reports \
wallarm/gotestwaf \
--url=https://domain --noEmailReport
```

Ejecución con delays y menos concurrencia (para evadir detección por tasa):

```bash
sudo docker run --rm \
-v ${PWD}/reports:/app/reports \
wallarm/gotestwaf \
--url=https://domain \
--noEmailReport \
--randomDelay 2000 \
--sendDelay 2000 \
--workers 1
```

---
