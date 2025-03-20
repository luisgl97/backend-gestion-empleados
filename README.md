# Backend - NestJS API

## Tecnologías utilizadas

- **NestJS** - Framework para construir aplicaciones escalables en Node.js. (version: 11.0.5)
- **PostgreSQL** - Base de datos relacional. (version: 3.8)
- **TypeORM** - ORM para gestionar la base de datos.
- **Cloudinary** - Servicio de almacenamiento de imágenes y archivos.
- **Multer** - Middleware para la gestión de archivos en Node.js.

## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/luisgl97/backend-gestion-empleados.git
cd backend-gestion-empleados
```

### 2. Configurar variables de entorno
Renombrar el archivo **`.env.example`** a **`.env`** y completar las variables de entorno necesarias:


### 3. Crear la base de datos

Antes de ejecutar las migraciones, asegúrate de crear la base de datos configurando correctamente el archivo `.env` con los siguientes valores:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=rrhh
```

Luego, **crea la base de datos** en PostgreSQL **manualmente** con los datos anteriores

### 4. Instalar dependencias
```bash
npm install
```

### 5. Ejecutar migraciones de la base de datos
```bash
npm run migration:run
```

### 6. Ejecutar los seeders (datos iniciales)
```bash
npm run seed
```

## Ejecución del servidor

Para ejecutar el servidor en modo desarrollo:
```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3000` por defecto.


## Endpoints principales

### Empleados
- `GET /api/employees` - Obtener todos los empleados
- `POST /api/employees` - Crear un nuevo empleado
- `POST /api/employees/search` - Búsqueda de empleados por dni, nombre, apellidos o estado
- `GET /api/employees/:id` - Obtener detalles de un empleado
- `PUT /api/employees/:id` - Actualizar un empleado
- `DELETE /api/employees/:id` - Eliminar un empleado (Cambiar el estado a Inactivo)

- `POST /api/employees/view-pdf` - Obtener la url para visualizar el pdf
- `POST /api/employees/delete-pdf` - Eliminar el pdf de cloudinary y de la base de datos

### Puestos
- `GET /api/positions` - Obtener todos los puestos
- `POST /api/positions` - Crear un nuevo puesto
- `GET /api/positions/:id` - Obtener detalles de un puesto
- `PUT /api/positions/:id` - Actualizar un puesto
- `DELETE /api/positions/:id` - Eliminar un puesto

### Tipo de documentos
- `GET /api/type-documents` - Obtener todos los tipos de documentos
- `POST /api/type-documents` - Crear un nuevo tipo de documento
- `GET /api/type-documents/:id` - Obtener detalles de un documento
- `PUT /api/type-documents/:id` - Actualizar un tipo de documento
- `DELETE /api/type-documents/:id` - Eliminar un tipo de documento


