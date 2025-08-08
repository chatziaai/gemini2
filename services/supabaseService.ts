import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase desde variables de entorno
const supabaseUrl = process.env.POSTGRES_SUPABASE_URL || 'https://txjvhjobetfdmigkejbu.supabase.co';
const supabaseAnonKey = process.env.POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4anZoam9iZXRmZG1pZ2tlamJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTYwMDAsImV4cCI6MjA2OTgzMjAwMH0.FDxBb1rbUxg6OKVbVxXLaD8sfW8cfxf5UzC8o93Ai0';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para verificar la conexión a Supabase
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Probando conexión a Supabase...');
    console.log('URL:', supabaseUrl);
    console.log('Clave anónima configurada:', !!supabaseAnonKey);
    
    // Primero verificar la autenticación básica
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Error de autenticación:', authError.message);
      return {
        success: false,
        error: authError.message,
        details: 'Error de autenticación con Supabase'
      };
    }
    
    console.log('✅ Autenticación exitosa');
    
    // Intentar hacer una consulta simple para verificar la conexión
    const { data, error } = await supabase
      .from('agents') // Asumiendo que existe una tabla 'agents'
      .select('*')
      .limit(1);
    
              if (error) {
       console.log('❌ Error al consultar tabla agents:', error.message);
       
       // Si la tabla no existe, devolver información de la conexión básica
       return {
         success: true,
         message: 'Conexión exitosa a Supabase (tabla agents no encontrada)',
         error: error.message,
         details: 'La tabla "agents" no existe. Ejecuta el script supabase-setup.sql en tu panel de administración.',
         auth: authData
       };
     } else {
       console.log('✅ Conexión a Supabase exitosa');
       console.log('📊 Datos recuperados:', data?.length || 0, 'registros');
       return {
         success: true,
         message: 'Conexión exitosa a Supabase',
         data: data,
         auth: authData
       };
     }
  } catch (error) {
    console.error('❌ Error inesperado:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: 'Error inesperado al conectar con Supabase'
    };
  }
};

// Función para obtener agentes desde Supabase
export const getAgents = async () => {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al obtener agentes:', error);
      return { data: [], error: error.message };
    }
    
    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error inesperado al obtener agentes:', error);
    return { data: [], error: 'Error inesperado' };
  }
};

// Función para guardar un agente en Supabase
export const saveAgent = async (agent: any) => {
  try {
    const { data, error } = await supabase
      .from('agents')
      .insert([agent])
      .select();
    
    if (error) {
      console.error('Error al guardar agente:', error);
      return { data: null, error: error.message };
    }
    
    return { data: data?.[0] || null, error: null };
  } catch (error) {
    console.error('Error inesperado al guardar agente:', error);
    return { data: null, error: 'Error inesperado' };
  }
}; 