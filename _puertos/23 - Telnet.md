---
layout: default
title: 23 - Telnet
---
```bash
nmap -n -sV -Pn --script "*telnet*" -p 23 -iL 23.txt -oN 23_targeted.txt
```