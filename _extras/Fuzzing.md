---
layout: default
title: Fuzzing
---


```bash
gobuster dir -u http://10.10.11.58/ -w /usr/share/SecLists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt -t 100 -x php,html,txt,bak
```

```bash
wfuzz -c -t 200 -w /usr/share/SecLists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt -H "Host: palabra-FUZZ.url.com":'http://site.com'
```

```bash
wfuzz -c --hc=400,302 -t 200 --hw 16 -t 200 -w /usr/share/SecLists/Discovery/Web-Content/directory-list-lowercase-2.3-medium.txt -H "Host: FUZZ.url.com":'http://site.com'
```

```bash
gobuster fuzz -u "http://site.com"?file=FUZZ -W "files.txt"
```

```bash
gobuster dns -d linkvortex.htb -w /usr/share/SecLists/Discovery/DNS/subdomains-top1million-110000.txt -t 200
```

```bash
gobuster vhost -u http://linkvortex.htb -w /usr/share/SecLists/Discovery/DNS/subdomains-top1million-110000.txt -t 200
```

Si no encuentra nada con el resto, probad con este:

```bash
ffuf -u http://linkvortex.htb -H "Host: FUZZ.url.com" -w wordlist -mc all -ac
```

Que no falte

```
.git
```

```
graphql
```