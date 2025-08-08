
import React from 'react';
import type { Agent } from '../types';
import PlusIcon from './icons/PlusIcon';
import UserIcon from './icons/UserIcon';
import MessageIcon from './icons/MessageIcon';

interface DashboardProps {
  agents: Agent[];
  onCreateNew: () => void;
  onEdit: (agent: Agent) => void;
  onLogout: () => void;
}

const DashboardHeader: React.FC<{ onLogout: () => void; }> = ({ onLogout }) => (
  <div className="bg-white shadow-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-semibold text-gray-800">
          Chatz<span className="text-primary-500">IA</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-primary-500">Docs</a>
          <a href="#" className="text-gray-600 hover:text-primary-500">Ayuda</a>
          <button onClick={onLogout} className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <UserIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AgentCard: React.FC<{ agent: Agent; onEdit: (agent: Agent) => void; }> = ({ agent, onEdit }) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-sm hover:border-primary-300 transition-all duration-300 p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 truncate">{agent.name}</h3>
      <p className="text-sm text-gray-500 mt-2">{agent.files.length} archivos, {agent.qas.length} Q&As</p>
    </div>
    <div className="mt-6">
      <button 
        onClick={() => onEdit(agent)}
        className="w-full text-center bg-primary-50 text-primary-600 font-semibold py-2 px-4 rounded-md hover:bg-primary-100 transition-colors">
        Editar Agente
      </button>
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ agents, onCreateNew, onEdit, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader onLogout={onLogout} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Mis Agentes de IA</h1>
          <button
            onClick={onCreateNew}
            className="flex items-center bg-primary-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-primary-600 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuevo agente de IA
          </button>
        </div>

        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} onEdit={onEdit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <MessageIcon className="w-16 h-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">No tienes agentes todavía</h2>
            <p className="mt-2 text-gray-500">Crea tu primer agente de IA para empezar.</p>
            <button
              onClick={onCreateNew}
              className="mt-6 flex items-center mx-auto bg-primary-500 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:bg-primary-600 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Crear Agente
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
