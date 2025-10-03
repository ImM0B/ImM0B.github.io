---
layout: default
title: Theory
---
La diferencia con el CSRF es que la víctima envía el csrf token al hacer click en un botón legítimo, por lo que el csrf token no sirve para nada aquí.
La idea es meter el iframe de la página real con transparencia 0 , chrome puede detectar iframes con transparencia 0 pero firefox no.

### ✅ ¿Puede Chrome detectar la transparencia de iframes?

**Directamente no.** Chrome **no bloquea automáticamente un iframe solo por tener opacidad cero o estar oculto**. Lo que hace Chrome (y otros navegadores modernos) es:

- **Respetar encabezados de seguridad** enviados por el servidor del sitio embebido, como:
    
    - `X-Frame-Options: DENY` o `SAMEORIGIN`
        
    - `Content-Security-Policy: frame-ancestors 'none'`
        
    
    Estos encabezados **impiden que el contenido se cargue en un iframe si no está autorizado**, lo cual **previene clickjacking desde el origen**.
    

---

### 🕵️‍♂️ ¿Entonces qué pasa con iframes transparentes?

Si el servidor no usa estas protecciones, un atacante podría insertar un iframe con CSS como:

```css
iframe {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
```

Y el navegador **sí lo renderizará** si no hay políticas que lo bloqueen. No hay una detección automática por parte de Chrome basada en CSS como `opacity`, `pointer-events`, etc.

---

### 🔐 ¿Cómo prevenir el clickjacking?

Desde el **lado del desarrollador del sitio web legítimo**, las mejores prácticas incluyen:

1. **Usar `X-Frame-Options`**:

```http
    X-Frame-Options: DENY
```
    o:
```http
    X-Frame-Options: SAMEORIGIN
```
    
2. **O usar CSP moderna**:
```http
    Content-Security-Policy: frame-ancestors 'none';
```
    
3. **Detectar si se está en un iframe con JavaScript**:
    
```javascript
    if (window.top !== window.self) {
      // El sitio está siendo cargado dentro de un iframe
      window.top.location = window.location;
    }
```


---

### 🔍 Lo que hace Chrome (desde la versión 76+)

Chrome introdujo una **medida de seguridad experimental basada en la opacidad de iframes**:

- **Cuando un iframe es opaco por debajo de cierto umbral (por ejemplo, `opacity < 0.1`)**, Chrome puede:
    
    - **Bloquear la interacción del usuario** con ese iframe.
        
    - **Ignorar clics** en regiones del iframe considerado sospechoso (invisible o casi invisible).
        

Este comportamiento forma parte de lo que llaman **gesture requirement for cross-origin iframes**, o más específicamente, está relacionado con **"Click Interception Mitigations"** implementadas en el motor de renderizado.

---

### 🧪 ¿Cómo lo usan los atacantes?

Como bien mencionas, un atacante puede **ajustar el valor de `opacity` a justo por encima del umbral de detección**. Ejemplo:

```css
iframe {
  opacity: 0.11; /* suficiente para ser "visible", pero aún apenas perceptible al usuario */
}
```

Esto les permite **evadir la detección heurística de Chrome** mientras mantienen el iframe suficientemente oculto para que el usuario no lo vea, logrando el efecto deseado.

---

### ⚠️ Limitaciones de esta protección

- **No está estandarizado**: Firefox, Safari, y otros navegadores **no implementan esta lógica de umbral de opacidad**.
    
- **Solo se aplica en casos de iframes cross-origin** (de origen diferente).
    
- **No previene todos los ataques**, especialmente si el iframe tiene algún nivel de opacidad visible o si se usan otras técnicas como `pointer-events: none` con overlays.
    

---
