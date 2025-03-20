# Backend - NestJS API

## Tecnologías utilizadas

- **NestJS** - Framework para construir aplicaciones escalables en Node.js.
- **PostgreSQL** - Base de datos relacional.
- **TypeORM** - ORM para gestionar la base de datos.
- **Cloudinary** - Servicio de almacenamiento de imágenes y archivos.
- **Multer** - Middleware para la gestión de archivos en Node.js.

## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Configurar variables de entorno
Renombrar el archivo `.env.example` a `.env` y completar las variables de entorno necesarias:

```bash
mv .env.example .env
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecutar migraciones de la base de datos
```bash
npm run migration:run
```

### 5. Ejecutar los seeders (datos iniciales)
```bash
npm run seed
```

## Ejecución del servidor

Para ejecutar el servidor en modo desarrollo:
```bash
npm run start:dev
```

Para ejecutar en modo producción:
```bash
npm run build
npm run start:prod
```

## Endpoints principales

### Empleados
- `GET /employees` - Obtener todos los empleados
- `POST /employees` - Crear un nuevo empleado
- `GET /employees/:id` - Obtener detalles de un empleado
- `PUT /employees/:id` - Actualizar un empleado
- `DELETE /employees/:id` - Eliminar un empleado

### Documentos
- `POST /documents/upload` - Subir un documento (Multer + Cloudinary)
- `GET /documents/:employee_id` - Obtener documentos de un empleado
- `DELETE /documents/:id` - Eliminar un documento de Cloudinary y la base de datos


