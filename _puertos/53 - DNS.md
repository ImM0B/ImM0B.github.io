---
title: 53 -DNS
layout: default
---
```bash
nslookup IP
```

```bash
dig @IP DOMAIN
```

```bash
dig @DOMAIN axfr
```

```bash
dig @DOMAIN mx
```

```bash
dnsrecon -a -n IP -d DOMAIN
```

```bash
sudo /home/M0B/.local/bin/netexec smb IP --generate-hosts-file /etc/hosts
```