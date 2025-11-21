# Componente LoginSheet

## Descripción

El `LoginSheet` es un componente tipo "Sheet" (drawer lateral) que permite a los usuarios iniciar sesión o registrarse sin salir de la página actual. Se abre desde cualquier lugar de la aplicación shop.

## Características

- ✅ Aparece como overlay desde el lado derecho
- ✅ Permite alternar entre Login y Registro
- ✅ Formulario completo con validación
- ✅ Opción de "Recordar contraseña"
- ✅ Login con Google
- ✅ Mostrar/ocultar contraseña
- ✅ Cierre con ESC o clic fuera
- ✅ Responsive (ajusta su ancho en móviles)

## Uso

### Abrir el LoginSheet

El LoginSheet se controla mediante el store global `useUIStore`. Para abrirlo desde cualquier componente:

```tsx
import { useUIStore } from "@/store/ui.store";

function MiComponente() {
  const { openLoginSheet } = useUIStore();

  return <button onClick={openLoginSheet}>Iniciar Sesión</button>;
}
```

### Cerrar el LoginSheet

```tsx
const { closeLoginSheet } = useUIStore();
// o
const { toggleLoginSheet } = useUIStore();
```

## Integración

El `LoginSheet` ya está integrado en el layout principal del shop (`app/(shop)/layout.tsx`), por lo que no necesitas importarlo en cada página.

## Estado Global

El estado del LoginSheet se maneja con Zustand en `store/ui.store.ts`:

```typescript
interface UIState {
  isLoginSheetOpen: boolean;
  openLoginSheet: () => void;
  closeLoginSheet: () => void;
  toggleLoginSheet: () => void;
}
```

## Próximos pasos

- [ ] Implementar formulario de registro
- [ ] Conectar con el servicio de autenticación
- [ ] Agregar validación de formularios con Zod
- [ ] Implementar recuperación de contraseña
- [ ] Agregar autenticación con Google OAuth
