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

Para ver la aplicación en el navegador basta con abrir `index.html` (servidor local recomendado para módulos ES).

Ejemplo con `npx serve`:

```bash
npx serve .
# luego abrir http://localhost:3000
```

**Cambios relevantes realizados**

- Se eliminaron comentarios generados por IA y se añadieron JSDoc claros en `js/app.js`.
- Se añadió soporte para `blurb` y `tags` en la tarjeta del campeón y estilos en `css/styles.css`.
- Se inicializó un repositorio Git y se empujó la rama `main` al remoto proporcionado.

**Tests**

- La suite de Jest incluida pasa completamente (`4/4`).

**Próximos pasos sugeridos**

- Enriquecer la tarjeta con estadísticas o habilidades.
- Mejorar manejo de versiones de la API (centrar versión en constante o configuración).

**Licencia**

- Proyecto entregable de práctica (sin licencia especificada).
