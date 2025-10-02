---
title: Gestores de contraseña y cifrados
layout: default
---


# **Keeper**

Para extraer la masterkey de un dmp de keepass (volcado de memoria)

```python
python3 poc.py -d KeePassDumpFull.dmp
```

Para abrir un kdbx
```bash
keepassxc passcodes.kdbx
```

Para convertir una putty key  en una pem:

```
https://tecadmin.net/convert-ppk-to-pem-using-command/
```

```bash
puttygen private.key -O private-openssh -o id_rsa
```

```bash
ssh -i id_rsa root@keeper.htb
```


# Crack KDBX


```bash
keepass2john CEH.kdbx > CEH.kdbx.hash
```

```bash
john CEH.kdbx.hash --wordlist=/usr/share/wordlists/rockyou.txt
```

```
keepassxc CEH.kdbx
```

# **Crack pwSafe**

```bash
pwsafe2john Backup.psafe3
john hash
```

# **.PFX**

```bash
openssl pkcs12 -in archivo.pfx -info
```

```bash
/usr/share/john/pfx2john.py archivo.pfx > dev_auth.hash
```

Extraer PEM
```bash
openssl pkcs12 -in archivo.pfx -nocerts -out key.pem -nodes
```

Extraer el certificado
```bash
openssl pkcs12 -in legacyy_dev_auth.pfx -nokeys -out key.cert
```

Por ejemplo para conectarse por secure evil-winrm
```bash
evil-winrm -c key.cert -k key.pem -i <target ip> -P 5986 -S
```