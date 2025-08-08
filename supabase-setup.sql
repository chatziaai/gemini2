-- Script para configurar la tabla agents en Supabase
-- Ejecuta este script en el SQL Editor de tu panel de administración de Supabase

-- Crear la tabla agents
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    files JSONB DEFAULT '[]'::jsonb,
    qas JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON public.agents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agents_name ON public.agents(name);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad (permite acceso anónimo para pruebas)
CREATE POLICY "Allow anonymous access to agents" ON public.agents
    FOR ALL USING (true);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_agents_updated_at 
    BEFORE UPDATE ON public.agents 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos datos de prueba
INSERT INTO public.agents (name, description, files, qas) VALUES
    ('Agente de Soporte Técnico', 'Agente especializado en resolver problemas técnicos', '[]', '[]'),
    ('Agente de Ventas', 'Agente para responder consultas de ventas y productos', '[]', '[]')
ON CONFLICT DO NOTHING;

-- Verificar que la tabla se creó correctamente
SELECT 'Tabla agents creada exitosamente' as status; 