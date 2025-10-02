---
title: "Introducción a Web Hacking"
---

# Introducción a Web Hacking

## OWASP Top 10

Las vulnerabilidades web más comunes según OWASP:

1. **Injection** - SQL, NoSQL, OS injection
2. **Broken Authentication** - Autenticación débil
3. **Sensitive Data Exposure** - Exposición de datos sensibles
4. **XML External Entities (XXE)** - Procesamiento inseguro de XML
5. **Broken Access Control** - Control de acceso roto

## Herramientas Básicas

```bash
# Burp Suite
# Configurar proxy en 127.0.0.1:8080

# OWASP ZAP
# Alternativa gratuita a Burp Suite

# Nikto
nikto -h http://target.com

# Dirb
dirb http://target.com /usr/share/wordlists/dirb/common.txt
```

## Metodología

1. **Reconocimiento** - Identificar tecnologías
2. **Enumeración** - Buscar endpoints y parámetros
3. **Explotación** - Aprovechar vulnerabilidades
4. **Post-explotación** - Mantener acceso y pivotar
