
import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import type { Agent, TrainingFile, QAItem } from '../types';
import PlusIcon from './icons/PlusIcon';
import UploadIcon from './icons/UploadIcon';
import ChatTest from './ChatTest';

interface AgentEditorProps {
  agent: Agent;
  onSave: (agent: Agent) => void;
  onBack: () => void;
}

const FileUploader: React.FC<{ files: TrainingFile[], setFiles: React.Dispatch<React.SetStateAction<TrainingFile[]>> }> = ({ files, setFiles }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFiles(prev => [...prev, { name: file.name, content, size: file.size }]);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(handleFileRead);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(handleFileRead);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  return (
    <div>
        <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white'}`}
        >
            <UploadIcon className="w-12 h-12 mx-auto text-gray-400"/>
            <p className="mt-4 font-semibold text-gray-700">Arrastra y suelta archivos aquí</p>
            <p className="text-sm text-gray-500">o</p>
            <label className="cursor-pointer text-primary-600 font-semibold hover:underline">
                explora tus archivos
                <input type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>
        </div>
        <div className="mt-6 space-y-2">
            {files.map(file => (
                <div key={file.name} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                    <span className="text-gray-700 truncate">{file.name}</span>
                    <button onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">&times;</button>
                </div>
            ))}
        </div>
    </div>
  );
};

const QnAEditor: React.FC<{ qas: QAItem[], setQas: React.Dispatch<React.SetStateAction<QAItem[]>> }> = ({ qas, setQas }) => {
    const [newQa, setNewQa] = useState<Omit<QAItem, 'id'>>({ title: '', question: '', answer: ''});

    const addQa = () => {
        if (!newQa.title || !newQa.question || !newQa.answer) return;
        setQas(prev => [...prev, { ...newQa, id: `qa_${Date.now()}` }]);
        setNewQa({ title: '', question: '', answer: '' });
    };
    
    const removeQa = (id: string) => {
        setQas(prev => prev.filter(qa => qa.id !== id));
    };

    return (
        <div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-1">Agregar preguntas y respuestas</h3>
                <p className="text-sm text-gray-500 mb-4">Elabora respuestas para preguntas clave.</p>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input type="text" value={newQa.title} onChange={e => setNewQa({...newQa, title: e.target.value})} placeholder="Ej: Solicitudes de reembolso" className="w-full p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
                        <input type="text" value={newQa.question} onChange={e => setNewQa({...newQa, question: e.target.value})} placeholder="Ej: ¿Cómo solicito un reembolso?" className="w-full p-2 border rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Respuesta</label>
                        <textarea value={newQa.answer} onChange={e => setNewQa({...newQa, answer: e.target.value})} placeholder="Escribe tu respuesta aquí..." rows={4} className="w-full p-2 border rounded-md"></textarea>
                    </div>
                    <button onClick={addQa} className="flex items-center bg-primary-100 text-primary-700 font-semibold py-2 px-3 rounded-md hover:bg-primary-200">
                        <PlusIcon className="w-5 h-5 mr-1" /> Agregar pregunta
                    </button>
                </div>
            </div>
            <div className="mt-6 space-y-3">
                {qas.map(qa => (
                     <div key={qa.id} className="bg-white p-4 rounded-md border">
                        <div className="flex justify-between items-start">
                             <div>
                                <h4 className="font-semibold text-gray-800">{qa.title}</h4>
                                <p className="text-sm text-gray-600 mt-1"><strong>P:</strong> {qa.question}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>R:</strong> {qa.answer}</p>
                             </div>
                             <button onClick={() => removeQa(qa.id)} className="text-red-500 hover:text-red-700 text-2xl">&times;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AgentEditor: React.FC<AgentEditorProps> = ({ agent, onSave, onBack }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'qna'>('files');
  const [name, setName] = useState(agent.name);
  const [files, setFiles] = useState<TrainingFile[]>(agent.files);
  const [qas, setQas] = useState<QAItem[]>(agent.qas);

  const handleSave = useCallback(() => {
    onSave({ id: agent.id, name, files, qas });
  }, [agent.id, name, files, qas, onSave]);
  
  const currentAgentState: Agent = { id: agent.id, name, files, qas };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="text-gray-500 hover:text-gray-800">&larr; Volver</button>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-2xl font-bold text-gray-800 bg-transparent focus:outline-none focus:ring-0 border-b-2 border-transparent focus:border-primary-500"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-primary-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-primary-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex border-b border-gray-200 mb-6">
                <button onClick={() => setActiveTab('files')} className={`py-2 px-4 font-medium ${activeTab === 'files' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}>
                    Fuentes de Datos
                </button>
                 <button onClick={() => setActiveTab('qna')} className={`py-2 px-4 font-medium ${activeTab === 'qna' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}>
                    Preguntas y Respuestas
                </button>
            </div>
            {activeTab === 'files' ? <FileUploader files={files} setFiles={setFiles} /> : <QnAEditor qas={qas} setQas={setQas} />}
          </div>
          <div className="lg:col-span-1 h-[80vh]">
            <ChatTest agent={currentAgentState} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentEditor;
