# Configuración de Strapi CMS

Este documento describe cómo configurar Strapi como CMS para gestionar los productos de GYS Eco.

## 1. Instalación de Strapi

```bash
# En la carpeta raíz del proyecto (GYS)
cd C:\Users\David\Desktop\GYS

# Crear proyecto Strapi
pnpm create strapi-app gys-strapi

# Selecciona las siguientes opciones:
# - Skip cloud: Sí
# - Database: SQLite (para desarrollo) o PostgreSQL (para producción)
# - Typescript: Sí
```

## 2. Iniciar Strapi

```bash
cd gys-strapi
pnpm develop
```

Strapi estará disponible en: `http://localhost:1337/admin`

## 3. Crear Content Types

### 3.1 Category (Categoría)

En el Admin Panel de Strapi:

1. Ve a **Content-Type Builder**
2. Crea una nueva **Collection Type** llamada `Category`
3. Añade los siguientes campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| name | Text (Short) | Required |
| slug | UID (basado en name) | Required, Unique |

### 3.2 Product (Producto)

Crea una **Collection Type** llamada `Product` con estos campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| name | Text (Short) | Required |
| slug | UID (basado en name) | Required, Unique |
| description | Text (Long) | - |
| price | Number (Decimal) | Required |
| stock | Number (Integer) | Required, Default: 0 |
| sku | Text (Short) | Unique |
| material | Text (Short) | - |
| isCertified | Boolean | Default: true |
| image | Media (Single) | - |
| gallery | Media (Multiple) | - |
| category | Relation | Many-to-One con Category |

### 3.3 Componente: ProductDetails

Crea un **Component** en la categoría "product" llamado `details`:

| Campo | Tipo |
|-------|------|
| material | Text (Short) |
| dimensions | Text (Short) |
| thickness | Text (Short) |
| color | Text (Short) |
| units | Text (Short) |
| use | Text (Long) |

Luego añade este componente al Content Type `Product`:

| Campo | Tipo |
|-------|------|
| details | Component (product.details) |

## 4. Configurar Permisos Públicos

1. Ve a **Settings > Users & Permissions Plugin > Roles**
2. Edita el rol **Public**
3. En **Permissions**, habilita para `Product`:
   - `find` (listar todos)
   - `findOne` (ver uno)
4. En **Permissions**, habilita para `Category`:
   - `find` (listar todos)
   - `findOne` (ver uno)
5. Guarda los cambios

## 5. Añadir Datos de Ejemplo

### Categorías

| name | slug |
|------|------|
| Vasos | vasos |
| Platos | platos |
| Cubiertos | cubiertos |
| Bolsas | bolsas |
| Empaques | empaques |

### Productos de Ejemplo

1. **Vaso Biodegradable 12oz**
   - slug: vaso-biodegradable-12oz
   - price: 15.50
   - stock: 100
   - sku: VB-12-PLA
   - material: PLA
   - category: Vasos
   - isCertified: true

2. **Plato Hondo Ecológico**
   - slug: plato-hondo-ecologico
   - price: 22.00
   - stock: 50
   - sku: PH-ECO-BC
   - material: Bagazo de Caña
   - category: Platos

3. **Set de Cubiertos PLA**
   - slug: set-cubiertos-pla
   - price: 18.90
   - stock: 200
   - sku: SC-PLA-STD
   - material: PLA
   - category: Cubiertos

## 6. Variables de Entorno del Frontend

Asegúrate de tener en tu archivo `.env` del frontend:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## 7. Verificar Conexión

Una vez configurado Strapi, el frontend detectará automáticamente el CMS y cargará los productos desde allí.

Orden de prioridad de datos:
1. **Strapi** (si está disponible)
2. **Backend NestJS** (fallback)
3. **Datos locales** (último recurso)

## 8. API Endpoints de Strapi

Una vez configurado, estos endpoints estarán disponibles:

- `GET /api/products` - Lista de productos
- `GET /api/products/:id` - Detalle de producto
- `GET /api/products?filters[slug][$eq]=slug` - Producto por slug
- `GET /api/products?filters[category][slug][$eq]=vasos` - Productos por categoría
- `GET /api/categories` - Lista de categorías

## Notas Adicionales

- Para producción, considera usar PostgreSQL en lugar de SQLite
- Configura CORS en Strapi para permitir peticiones desde tu frontend
- Para imágenes, Strapi las sirve desde `/uploads/`


