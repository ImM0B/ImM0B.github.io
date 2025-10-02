---
title: 80,443 - HTTP & HTTPS
layout: default
---

Buscar Vhost:

```bash
ffuf -u http://IP -H "Host: FUZZ.DOMAIN" -w /opt/SecLists/Discovery/DNS/subdomains-top1million-20000.txt -mc all -ac
```

# BruteForce HTTP auth

```bash
hydra -l apache -P /usr/share/wordlists/rockyou.txt IP http-get / -s 242 -t 64
```
