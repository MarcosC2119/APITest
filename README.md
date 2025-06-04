# API Demo - Next.js REST API

Una API REST completa construida con Next.js que demuestra todos los métodos HTTP con ejemplos prácticos y documentación detallada.

## 🚀 Inicio Rápido

1. **Instalación de dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Construir para producción:**
```bash
npm run build
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📚 Documentación de la API

### Endpoint Base: `/api/tasks`

#### GET `/api/tasks`
- **Descripción:** Obtiene todas las tareas disponibles
- **Respuesta:** Array de tareas
- **Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "title": "Learn Next.js",
    "description": "Study Next.js documentation",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST `/api/tasks`
- **Descripción:** Crea una nueva tarea
- **Cuerpo requerido:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false
}
```
- **Respuesta:** Tarea creada con ID
- **Códigos de estado:**
  - 201: Tarea creada exitosamente
  - 400: Datos inválidos o faltantes

#### HEAD `/api/tasks`
- **Descripción:** Obtiene solo los headers de la respuesta
- **Headers de respuesta:**
  - `Content-Type: application/json`
  - `X-Total-Count`: Número total de tareas
  - `Cache-Control: no-store`

#### OPTIONS `/api/tasks`
- **Descripción:** Obtiene información sobre los métodos disponibles
- **Headers de respuesta:**
  - `Allow: GET, POST, HEAD, OPTIONS`
  - `Cache-Control: no-store`

### Endpoint Base: `/api/tasks/[id]`

#### GET `/api/tasks/[id]`
- **Descripción:** Obtiene una tarea específica por ID
- **Respuesta:** Objeto de tarea
- **Códigos de estado:**
  - 200: Tarea encontrada
  - 404: Tarea no encontrada

#### PUT `/api/tasks/[id]`
- **Descripción:** Reemplaza completamente una tarea existente
- **Cuerpo requerido:**
```json
{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "completed": true
}
```
- **Respuesta:** Tarea actualizada
- **Códigos de estado:**
  - 200: Tarea actualizada
  - 400: Datos inválidos
  - 404: Tarea no encontrada

#### PATCH `/api/tasks/[id]`
- **Descripción:** Actualiza parcialmente una tarea
- **Cuerpo:** Cualquier campo a actualizar
```json
{
  "completed": true
}
```
- **Respuesta:** Tarea actualizada
- **Códigos de estado:**
  - 200: Tarea actualizada
  - 400: Datos inválidos
  - 404: Tarea no encontrada

#### DELETE `/api/tasks/[id]`
- **Descripción:** Elimina una tarea específica
- **Respuesta:** Sin cuerpo
- **Códigos de estado:**
  - 204: Tarea eliminada
  - 404: Tarea no encontrada

#### OPTIONS `/api/tasks/[id]`
- **Descripción:** Obtiene información sobre los métodos disponibles para una tarea específica
- **Headers de respuesta:**
  - `Allow: GET, PUT, PATCH, DELETE, OPTIONS`
  - `Cache-Control: no-store`

## 🛠️ Características

- Interfaz de usuario interactiva para probar la API
- Documentación detallada de cada endpoint
- Validación de datos en todas las rutas
- Manejo de errores consistente
- Respuestas en formato JSON
- Headers de caché apropiados

## ⚠️ Limitaciones

- Los datos se mantienen en memoria (se reinician al reiniciar el servidor)
- No hay autenticación implementada
- Sin paginación para grandes conjuntos de datos

## 🛠️ Tecnologías Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## 📝 Notas de Desarrollo

- La aplicación usa el App Router de Next.js
- Implementa todas las operaciones CRUD
- Incluye una interfaz de usuario para pruebas
- Sigue las mejores prácticas REST
- Implementa manejo de errores HTTP estándar


