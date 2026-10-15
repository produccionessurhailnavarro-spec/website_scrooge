# Producciones Surhail Navarro

Código de la página de Scrooge: Un cuento de Navidad.

Sitio publicado: https://surhail-escena.toastyreed8.chatgpt.site/

## Contenido

- Página principal y afiches actualizados.
- Funciones escolares: Teatro El Sol, 2 y 3 de diciembre de 2026; Teatro Balboa, 9 y 10 de diciembre de 2026.
- Precio escolar: $20 por estudiante, IVU incluido.
- Formulario de solicitudes y registro de producción protegido.
- PDF de información para escuelas.

## Desarrollo

Requiere Node.js 22.13 o superior y pnpm.

```sh
pnpm install
pnpm dev
```

```sh
node --test tests/requests.test.mjs tests/endpoints.test.mjs
pnpm build
```

## Estructura

- `app/site-content.ts`: contenido de la página.
- `public/assets/`: afiches y logo.
- `public/style.css`: estilos.
- `public/form.js`: formulario de solicitudes.
- `app/api/solicitudes/route.ts`: recepción de solicitudes.
- `app/solicitudes/route.ts`: registro de producción.
- `lib/requests.mjs`: validación y permisos.
- `public/informacion-escuelas.pdf`: documento para escuelas.

## Alojamiento y datos

Este proyecto utiliza Vinext y Cloudflare Workers, con una base de datos D1 y autenticación de ChatGPT proporcionadas por Sites. Guardar el código en GitHub no cambia el sitio publicado ni traslada los datos de reservaciones. Para alojarlo fuera de Sites se deben configurar la base de datos y la autenticación. GitHub Pages por sí solo no ejecuta las funciones del servidor.
