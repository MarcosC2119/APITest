import ApiTester from './components/ApiTester';
import MethodCard from './components/MethodCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header con estilo Next.js */}
      <header className="relative border-b border-white/[0.08] bg-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        <div className="relative max-w-4xl mx-auto px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              API Demo
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Una API REST completa que demuestra todos los métodos HTTP con ejemplos prácticos y documentación detallada
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Sección de prueba interactiva */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-white">Prueba la API</h2>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-medium">
              Interactivo
            </span>
          </div>
          <div className="bg-black border border-white/[0.08] rounded-lg p-6">
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-gray-400">
                Usa el siguiente panel para probar todos los endpoints de la API. Selecciona el método HTTP,
                ingresa la URL y, si es necesario, proporciona un cuerpo JSON para la petición.
              </p>
            </div>
            <ApiTester />
          </div>
        </section>

        {/* Sección de documentación */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-white">Documentación</h2>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium">
              Detallada
            </span>
          </div>

          <div className="space-y-6">
            {/* GET /api/tasks */}
            <div className="bg-black border border-white/[0.08] rounded-lg overflow-hidden">
              <MethodCard
                method="GET"
                endpoint="/api/tasks"
                description="Obtiene todas las tareas disponibles en el sistema. Esta ruta devuelve un array con todas las tareas."
                example="curl http://localhost:3000/api/tasks"
                responseExample={`[
  {
    "id": 1,
    "title": "Learn Next.js",
    "description": "Study Next.js documentation and tutorials",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Build API",
    "description": "Create a REST API with Next.js",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]`}
                notes={[
                  "No requiere autenticación",
                  "Devuelve un array vacío si no hay tareas",
                  "Los resultados no están paginados"
                ]}
              />

              {/* POST /api/tasks */}
              <MethodCard
                method="POST"
                endpoint="/api/tasks"
                description="Crea una nueva tarea en el sistema. Requiere un cuerpo JSON con el título y la descripción."
                example={`curl -X POST http://localhost:3000/api/tasks \\
-H "Content-Type: application/json" \\
-d '{"title":"Nueva tarea","description":"Descripción de la tarea"}'`}
                requestBody={`{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false  // opcional, por defecto es false
}`}
                responseExample={`{
  "id": 3,
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}`}
                notes={[
                  "El campo 'title' es obligatorio",
                  "El campo 'description' es obligatorio",
                  "El campo 'completed' es opcional",
                  "El ID se genera automáticamente"
                ]}
              />

              {/* GET /api/tasks/[id] */}
              <MethodCard
                method="GET"
                endpoint="/api/tasks/[id]"
                description="Obtiene una tarea específica por su ID. Devuelve 404 si la tarea no existe."
                example="curl http://localhost:3000/api/tasks/1"
                responseExample={`{
  "id": 1,
  "title": "Learn Next.js",
  "description": "Study Next.js documentation and tutorials",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}`}
                notes={[
                  "El ID debe ser un número válido",
                  "Devuelve 404 si la tarea no existe",
                  "No requiere autenticación"
                ]}
              />

              {/* PUT /api/tasks/[id] */}
              <MethodCard
                method="PUT"
                endpoint="/api/tasks/[id]"
                description="Actualiza completamente una tarea existente. Requiere todos los campos en el cuerpo de la petición."
                example={`curl -X PUT http://localhost:3000/api/tasks/1 \\
-H "Content-Type: application/json" \\
-d '{"title":"Tarea actualizada","description":"Nueva descripción","completed":true}'`}
                requestBody={`{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "completed": true
}`}
                responseExample={`{
  "id": 1,
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}`}
                notes={[
                  "Requiere todos los campos en el cuerpo",
                  "Reemplaza completamente la tarea existente",
                  "Devuelve 404 si la tarea no existe",
                  "El ID y createdAt no se pueden modificar"
                ]}
              />

              {/* PATCH /api/tasks/[id] */}
              <MethodCard
                method="PATCH"
                endpoint="/api/tasks/[id]"
                description="Actualiza parcialmente una tarea existente. Solo se actualizan los campos proporcionados."
                example={`curl -X PATCH http://localhost:3000/api/tasks/1 \\
-H "Content-Type: application/json" \\
-d '{"completed":true}'`}
                requestBody={`{
  "title": "Nuevo título",     // opcional
  "description": "Nueva descripción",  // opcional
  "completed": true            // opcional
}`}
                responseExample={`{
  "id": 1,
  "title": "Learn Next.js",
  "description": "Study Next.js documentation and tutorials",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}`}
                notes={[
                  "Solo actualiza los campos proporcionados",
                  "Los campos no incluidos mantienen su valor actual",
                  "Devuelve 404 si la tarea no existe",
                  "El ID y createdAt no se pueden modificar"
                ]}
              />

              {/* DELETE /api/tasks/[id] */}
              <MethodCard
                method="DELETE"
                endpoint="/api/tasks/[id]"
                description="Elimina una tarea existente. No requiere cuerpo en la petición."
                example="curl -X DELETE http://localhost:3000/api/tasks/1"
                responseExample="// No hay cuerpo en la respuesta, solo código de estado 204"
                notes={[
                  "No requiere cuerpo en la petición",
                  "Devuelve 204 si la tarea se eliminó correctamente",
                  "Devuelve 404 si la tarea no existe",
                  "La eliminación es permanente"
                ]}
              />

              {/* HEAD /api/tasks */}
              <MethodCard
                method="HEAD"
                endpoint="/api/tasks"
                description="Obtiene solo los headers de la respuesta, útil para verificar la existencia de recursos o metadatos."
                example="curl -I http://localhost:3000/api/tasks"
                responseExample={`// Headers de respuesta
Content-Type: application/json
X-Total-Count: 2
Cache-Control: no-store`}
                notes={[
                  "No devuelve cuerpo en la respuesta",
                  "Útil para verificar la existencia de recursos",
                  "Incluye el header X-Total-Count con el número total de tareas"
                ]}
              />

              {/* OPTIONS /api/tasks */}
              <MethodCard
                method="OPTIONS"
                endpoint="/api/tasks"
                description="Obtiene información sobre los métodos HTTP disponibles para el endpoint."
                example="curl -X OPTIONS http://localhost:3000/api/tasks"
                responseExample={`// Headers de respuesta
Allow: GET, POST, HEAD, OPTIONS
Cache-Control: no-store`}
                notes={[
                  "No devuelve cuerpo en la respuesta",
                  "Útil para descubrir los métodos disponibles",
                  "Sigue el estándar HTTP para el método OPTIONS"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Sección de notas generales */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-white">Notas Generales</h2>
            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-sm font-medium">
              Importante
            </span>
          </div>
          <div className="bg-black border border-white/[0.08] rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Características Generales
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Todas las respuestas son en formato JSON con validación de esquema</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Validación de datos en todas las rutas con mensajes de error descriptivos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Manejo de errores consistente con códigos de estado HTTP apropiados</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Limitaciones
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Los datos se mantienen en memoria y se reinician al reiniciar el servidor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>No hay autenticación implementada para proteger los endpoints</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Sin paginación de resultados para grandes conjuntos de datos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] mt-16">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="text-center text-gray-400">
            <p>API Demo - Una demostración de métodos HTTP con Next.js</p>
            <p className="mt-2 text-sm">Creado con ❤️ usando Next.js y Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
