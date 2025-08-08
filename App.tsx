
import React, { useState, useCallback } from 'react';
import type { Agent } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AgentEditor from './components/AgentEditor';

type View = 'landing' | 'dashboard' | 'editor';

const App: React.FC = () => {
  const [view, setView] = useState<View>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('view') as View || 'landing';
  });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  const handleLogin = useCallback(() => {
    setView('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setView('landing');
  }, []);

  const handleCreateNewAgent = useCallback(() => {
    const newAgent: Agent = {
      id: `agent_${Date.now()}`,
      name: 'Nuevo Agente sin título',
      files: [],
      qas: [],
    };
    setActiveAgent(newAgent);
    setView('editor');
  }, []);
  
  const handleEditAgent = useCallback((agent: Agent) => {
    setActiveAgent(agent);
    setView('editor');
  }, []);

  const handleSaveAgent = useCallback((updatedAgent: Agent) => {
    setAgents(prevAgents => {
      const existingAgentIndex = prevAgents.findIndex(a => a.id === updatedAgent.id);
      if (existingAgentIndex > -1) {
        const newAgents = [...prevAgents];
        newAgents[existingAgentIndex] = updatedAgent;
        return newAgents;
      } else {
        return [...prevAgents, updatedAgent];
      }
    });
    setView('dashboard');
    setActiveAgent(null);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setView('dashboard');
    setActiveAgent(null);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onLoginClick={handleLogin} />;
      case 'dashboard':
        return <Dashboard agents={agents} onCreateNew={handleCreateNewAgent} onEdit={handleEditAgent} onLogout={handleLogout} />;
      case 'editor':
        if (activeAgent) {
          return <AgentEditor agent={activeAgent} onSave={handleSaveAgent} onBack={handleBackToDashboard} />;
        }
        // Fallback to dashboard if no active agent
        setView('dashboard');
        return null;
      default:
        return <LandingPage onLoginClick={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
};

export default App;
