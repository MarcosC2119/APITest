'use client';

import { useState } from 'react';

interface ApiResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
}

export default function ApiTester() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/tasks');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateJson = (json: string): boolean => {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    try {
      // Validar el endpoint
      if (!endpoint.startsWith('/api/')) {
        throw new Error('El endpoint debe comenzar con /api/');
      }

      // Validar el cuerpo de la petición para métodos que lo requieren
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        if (!requestBody.trim()) {
          throw new Error('Se requiere un cuerpo JSON para este método');
        }
        if (!validateJson(requestBody)) {
          throw new Error('El cuerpo de la petición debe ser un JSON válido');
        }
      }

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Agregar el cuerpo solo para métodos que lo requieren
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = requestBody;
      }

      const response = await fetch(endpoint, options);
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setResponse({
        status: response.status,
        data,
        headers,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar la petición');
    } finally {
      setLoading(false);
    }
  };

  const getMethodColor = (m: string) => {
    switch (m) {
      case 'GET': return 'bg-green-100 text-green-800 border-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PATCH': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExampleBody = () => {
    switch (method) {
      case 'POST':
        return `{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false
}`;
      case 'PUT':
        return `{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "completed": true
}`;
      case 'PATCH':
        return `{
  "completed": true
}`;
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector de método HTTP */}
        <div>
          <label htmlFor="method" className="block text-sm font-medium text-gray-300 mb-1">
            Método HTTP
          </label>
          <select
            id="method"
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setRequestBody(getExampleBody());
            }}
            className="w-full rounded-md border border-white/[0.12] px-3 py-2 bg-black text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
        </div>

        {/* Campo de endpoint */}
        <div>
          <label htmlFor="endpoint" className="block text-sm font-medium text-gray-300 mb-1">
            Endpoint
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/[0.12] bg-white/[0.05] text-gray-400 text-sm">
              http://localhost:3000
            </span>
            <input
              type="text"
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-white/[0.12] bg-black text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="/api/tasks"
            />
          </div>
        </div>
      </div>

      {/* Cuerpo de la petición (solo para POST, PUT, PATCH) */}
      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="requestBody" className="block text-sm font-medium text-gray-300">
              Cuerpo de la petición (JSON)
            </label>
            <button
              type="button"
              onClick={() => setRequestBody(getExampleBody())}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Cargar ejemplo
            </button>
          </div>
          <textarea
            id="requestBody"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-white/[0.12] px-3 py-2 font-mono text-sm bg-black text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Ingresa el cuerpo de la petición en formato JSON"
          />
        </div>
      )}

      {/* Botón de envío */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Procesando...
            </span>
          ) : (
            'Enviar Petición'
          )}
        </button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="rounded-md bg-red-900/20 p-4 border border-red-500/30">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-400">Error</h3>
              <div className="mt-2 text-sm text-red-300">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Respuesta */}
      {response && (
        <div className="rounded-md border border-white/[0.08] overflow-hidden">
          <div className="bg-white/[0.05] px-4 py-2 border-b border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(method)}`}>
                  {method}
                </span>
                <span className="text-gray-300 text-sm">
                  Status: {response.status} {response.status === 200 ? 'OK' : response.status === 201 ? 'Created' : response.status === 204 ? 'No Content' : ''}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="p-4 bg-black/60">
            {/* Headers */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Headers</h4>
              <div className="bg-white/[0.02] rounded-md p-3 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  {Object.entries(response.headers)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n')}
                </pre>
              </div>
            </div>

            {/* Body */}
            {response.data && (
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Respuesta</h4>
                <div className="bg-white/[0.02] rounded-md p-3 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    {typeof response.data === 'string'
                      ? response.data
                      : JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
} 