# GYS Eco Frontend

E-commerce frontend para GYS Importplast EIRL - Productos ecológicos y biodegradables.

Construido con [Next.js](https://nextjs.org) y [React 19](https://react.dev).

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crea un archivo .env.local con:
# NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Iniciar servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# URL del API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Conexión con Backend

Este frontend está diseñado para conectarse con el backend NestJS (`gys-eco-backend`).

**Puertos por defecto:**
- Frontend (Next.js): `http://localhost:3000`
- Backend (NestJS): `http://localhost:3001`

## 📁 Estructura del Proyecto

```
gys-eco-frontend/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (shop)/            # Rutas de la tienda
│   └── orders/            # Rutas de pedidos
├── components/            # Componentes React
│   ├── auth/              # Componentes de autenticación
│   ├── cart/              # Componentes del carrito
│   ├── layout/            # Layout components
│   ├── products/          # Componentes de productos
│   └── ui/                # Componentes UI reutilizables
├── hooks/                 # Custom React hooks
├── lib/                   # Utilidades y constantes
├── services/              # Servicios de API
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

## 🔌 Servicios Disponibles

| Servicio | Descripción |
|----------|-------------|
| `authService` | Login, registro, logout |
| `productService` | CRUD de productos |
| `categoryService` | CRUD de categorías |
| `cartService` | Gestión del carrito |
| `contactService` | Formulario de contacto |

## 🛒 Características

- ✅ Autenticación JWT (login/registro)
- ✅ Catálogo de productos con filtros
- ✅ Carrito de compras (local storage)
- ✅ Diseño responsive
- ✅ Modo offline con datos de fallback

## 📚 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Linter
```

## 🛠️ Tecnologías

- **Framework:** Next.js 16
- **UI:** React 19 + Tailwind CSS 4
- **State Management:** Zustand
- **TypeScript:** Strict mode

## 📝 Licencia

UNLICENSED - Proyecto privado
