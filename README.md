onTrack es una aplicación web de finanzas personales creada con React y Vite. Su objetivo es ofrecer una maqueta interactiva para consultar movimientos, cuentas, presupuestos y preferencias de perfil.

## Funcionalidades

- **Inicio de sesión:** acceso de prueba sin autenticación real.
- **Dashboard:** vista general de las finanzas.
- **Movimientos:** consulta de ingresos y gastos con filtros.
- **Nuevo movimiento:** formulario de ingresos y gastos.
- **Mis cuentas:** visualización de cuentas y saldo total.
- **Presupuestos:** resumen de gastos y límites por categoría.
- **Mi perfil:** información personal, preferencias y opción de cerrar sesión.

## Tecnologías

- React
- Vite
- JavaScript
- CSS

## Requisitos

- Node.js y npm instalados.
- Un editor de código, como Visual Studio Code.

## Instalación y ejecución

1. Abre una terminal en la carpeta del proyecto.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre en el navegador la dirección que aparece en la terminal.

Si `npm run dev` muestra un error, revisa que `package.json` tenga configurado el script `dev`.

## Organización del proyecto

Los componentes de las páginas y el menú lateral se encuentran en `src/assets/Pages/`. El archivo `src/App.jsx` controla la pantalla visible y el estado de la sesión.

Los estilos compartidos del dashboard usan el prefijo `db-`. Las páginas tienen sus propios archivos CSS para mantener la aplicación modular.

## Estado actual

MonTrack es una **maqueta interactiva**:

- Los datos mostrados son de ejemplo.
- El inicio de sesión no valida usuarios ni contraseñas.
- No hay conexión a un backend ni persistencia de datos.
- El formulario de movimientos aún no guarda datos de forma permanente.
- Algunas opciones son visuales y todavía no ejecutan acciones completas, como editar el perfil o cambiar la contraseña.