import React, { useState, useEffect } from 'react';
import { testSupabaseConnection, getAgents, saveAgent } from '../services/supabaseService';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Pendiente');
  const [connectionDetails, setConnectionDetails] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setConnectionStatus('Probando...');
    
    try {
      const result = await testSupabaseConnection();
      setConnectionDetails(result);
      
      if (result.success) {
        setConnectionStatus('✅ Conectado');
      } else {
        setConnectionStatus('❌ Error de conexión');
        setError(result.error || 'Error desconocido');
      }
    } catch (err) {
      setConnectionStatus('❌ Error de conexión');
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const loadAgents = async () => {
    setLoading(true);
    try {
      const result = await getAgents();
      if (result.error) {
        setError(result.error);
      } else {
        setAgents(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar agentes');
    } finally {
      setLoading(false);
    }
  };

  const createTestAgent = async () => {
    setLoading(true);
    try {
      const testAgent = {
        name: `Agente de Prueba ${Date.now()}`,
        description: 'Agente creado para probar la conexión a Supabase',
        files: [],
        qas: [],
        created_at: new Date().toISOString()
      };
      
      const result = await saveAgent(testAgent);
      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
        await loadAgents(); // Recargar la lista
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear agente');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Prueba de Conexión a Supabase</h1>
      
      {/* Estado de la conexión */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Estado de la Conexión</h2>
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-lg font-medium ${
            connectionStatus.includes('✅') ? 'text-green-600' : 
            connectionStatus.includes('❌') ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {connectionStatus}
          </span>
          <button
            onClick={testConnection}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Probar Conexión'}
          </button>
        </div>
        
        {connectionDetails && (
          <div className="bg-gray-50 rounded p-4">
            <h3 className="font-medium mb-2">Detalles de la conexión:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(connectionDetails, null, 2)}
            </pre>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mt-4">
            <h3 className="font-medium text-red-800 mb-2">Error:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Operaciones de base de datos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Operaciones de Base de Datos</h2>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={loadAgents}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Cargar Agentes'}
          </button>
          
          <button
            onClick={createTestAgent}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Agente de Prueba'}
          </button>
        </div>

        {/* Lista de agentes */}
        <div>
          <h3 className="font-medium mb-3">Agentes en la base de datos ({agents.length}):</h3>
          {agents.length === 0 ? (
            <p className="text-gray-500">No hay agentes en la base de datos</p>
          ) : (
            <div className="space-y-3">
              {agents.map((agent, index) => (
                <div key={agent.id || index} className="border rounded p-3">
                  <h4 className="font-medium">{agent.name}</h4>
                  <p className="text-sm text-gray-600">{agent.description}</p>
                  <p className="text-xs text-gray-500">
                    Creado: {new Date(agent.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest; 