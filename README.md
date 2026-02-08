# Buscador de Campeones - League of Legends

Proyecto de práctica: buscador simple de campeones usando la API de Data Dragon (Riot).

**Descripción**

- Frontend estático que consulta la lista de campeones y muestra una tarjeta con información básica.

**Qué incluye**

- Búsqueda por nombre (insensible a mayúsculas).
- Tarjeta de campeón con imagen, `name`, `title`, `blurb` y `tags`.
- Indicadores de carga y mensajes de error.
- JSDoc en `js/app.js`.

**Archivos clave**

- [index.html](index.html)
- [js/app.js](js/app.js)
- [css/styles.css](css/styles.css)
- Tests: [test/app.test.js](test/app.test.js)

**Cómo ejecutar**
Instala dependencias y ejecuta tests:

```bash
npm install
npm test
```

Para ver la aplicación en el navegador basta con abrir `index.html`.
