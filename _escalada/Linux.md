---
layout: default
title: Linux
---


Probarlas todas garantiza escalada,probarlas todas antes de pararse con algo:

Sudoers (a veces no pide pass)
```bash
sudo su
```

```bash
sudo -l
```

SUID
```bash
find / -user root -type f -perm -4000 -ls 2>/dev/null
```

Monitorizar procesos
```bash
pspy
```

Archivos de un grupo raro (id)
```bash
find / -group apache 2>/dev/null | grep -v -e '^/run' -e '^/sys' -e '^/proc' (id)
```

Variables de entorno
```bash
env
```

Capabilities
```bash
getcap -r / 2>/dev/null
```
```
/usr/bin/ping          = cap_net_raw+ep
/usr/bin/traceroute6   = cap_net_raw+ep
/usr/bin/mtr-packet    = cap_net_raw+ep
```

Versión del kernel
```bash
uname -a
```

Puertos locales
```bash
ss -nltp
```
```bash
ss -lup
```

Archivos
```bash
ls -la /var/www

cat /var/mail/user
```

Otros
```
- Probar contraseñas ya encontradas (contra usuarios, servicios y ssh)
- Linpeas
- Buscar vulns para software instalado
```

