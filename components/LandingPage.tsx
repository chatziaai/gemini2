
import React, { useState } from 'react';
import type { FAQItem } from '../types';
import CheckIcon from './icons/CheckIcon';

const Header: React.FC<{ onLoginClick: () => void; }> = ({ onLoginClick }) => (
  <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/80">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-semibold text-gray-800">
          Chatz<span className="text-primary-500">IA</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Cómo funciona</a>
          <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Características</a>
          <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">Precios</a>
          <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center space-x-2">
          <button onClick={onLoginClick} className="text-gray-600 font-medium hover:text-primary-500 transition-colors px-4 py-2 rounded-md">
            Iniciar sesión
          </button>
          <button onClick={onLoginClick} className="bg-primary-500 text-white font-medium px-4 py-2 rounded-md hover:bg-primary-600 transition-shadow shadow-sm hover:shadow-md">
            Probar gratis
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Hero: React.FC<{ onLoginClick: () => void; }> = ({ onLoginClick }) => (
  <section className="py-20 md:py-32 bg-white">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Crea Agentes de IA para una <span className="text-primary-500">atención al cliente excepcional</span>.
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
          Genera en menos de 5 minutos un agente IA que puede resolver hasta el 50% de tus solicitudes de atención al cliente.
        </p>
        <button onClick={onLoginClick} className="mt-8 bg-primary-500 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1">
          Genera tu agente IA
        </button>
      </div>
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg">
        <div className="bg-white rounded-xl p-4">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">
                    AI
                </div>
                <div className="ml-3">
                    <p className="font-semibold text-gray-800">Asistente IA</p>
                    <p className="text-sm text-green-500 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                        Online
                    </p>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex justify-end">
                    <p className="bg-primary-500 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                        Hola, ¿en qué puedo ayudarte hoy?
                    </p>
                </div>
                <div className="flex justify-start">
                    <p className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs">
                        Quisiera saber sobre el plan Pro.
                    </p>
                </div>
                 <div className="flex justify-end">
                    <p className="bg-primary-500 text-white p-3 rounded-lg rounded-br-none max-w-xs">
                       Claro, el plan Pro cuesta $19/mes e incluye 10 chatbots y 2,000 mensajes. ¿Te gustaría saber más?
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);


const features = [
  { title: "Inteligencia Artificial avanzada", description: "Respuestas personalizadas para cada cliente, precisas y naturales." },
  { title: "Con tu contenido", description: "El agente responde basándose únicamente en el contenido que hayas facilitado." },
  { title: "Seguridad garantizada", description: "Estamos comprometidos a mantener tus datos seguros." },
  { title: "Funciona en todos los canales", description: "Integra fácilmente tu Agente IA con varias plataformas como WhatsApp, Telegram." },
  { title: "Es fácil de instalar", description: "No requiere programación." },
  { title: "Siempre disponible", description: "24 horas al día, 7 días a la semana." },
];

const Features: React.FC = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">La plataforma de agentes IA para la atención al cliente en español.</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Las características que necesitas para generar agentes IA de atención al cliente en español que funcionen, con inteligencia a nivel humano y en los que puedes confiar para interactuar con tus clientes.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingCard: React.FC<{ plan: string, price: string, features: string[], popular?: boolean, onSelect: () => void }> = ({ plan, price, features, popular, onSelect }) => (
  <div className={`border rounded-xl p-8 flex flex-col ${popular ? 'border-primary-500 border-2' : 'border-gray-200'}`}>
    {popular && <span className="text-xs font-semibold bg-primary-500 text-white py-1 px-3 rounded-full self-start mb-4">MÁS POPULAR</span>}
    <h3 className="text-2xl font-semibold text-gray-800">{plan}</h3>
    <p className="text-4xl font-extrabold text-gray-900 my-4">{price}<span className="text-base font-normal text-gray-500">/mes</span></p>
    <ul className="space-y-3 text-gray-600 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckIcon className="w-5 h-5 text-primary-500 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button onClick={onSelect} className={`mt-8 w-full py-3 rounded-lg font-semibold transition-colors ${popular ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
      Elegir Plan {plan}
    </button>
  </div>
);

const Pricing: React.FC<{ onLoginClick: () => void; }> = ({ onLoginClick }) => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Precios simples y transparentes</h2>
        <p className="mt-4 text-lg text-gray-600">Elige el plan que mejor se adapte a tus necesidades.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <PricingCard 
          plan="Gratis" 
          price="$0" 
          features={['2 Chatbots', '100 mensajes/mes', 'Soporte por comunidad']}
          onSelect={onLoginClick}
        />
        <PricingCard 
          plan="Pro" 
          price="$19" 
          features={['10 Chatbots', '2,000 mensajes/mes', 'Soporte prioritario', 'Análisis Básico']} 
          popular 
          onSelect={onLoginClick}
        />
        <PricingCard 
          plan="Empresa" 
          price="Contacto" 
          features={['Chatbots ilimitados', 'Mensajes personalizados', 'Acceso API y SLA', 'Soporte dedicado']}
          onSelect={onLoginClick}
        />
      </div>
    </div>
  </section>
);


const FAQAccordion: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-200 py-4">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left">
            <span className="text-lg font-medium text-gray-800">{item.question}</span>
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </button>
        {isOpen && (
            <div className="mt-3 text-gray-600">
                <p>{item.answer}</p>
            </div>
        )}
    </div>
);

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqItems: FAQItem[] = [
        {
            question: "¿Cómo funciona?",
            answer: "Simplemente conecta tus fuentes de conocimiento como documentos o tu sitio web, y nosotros generaremos automáticamente un agente IA que puede responder preguntas sobre ello. Puedes añadirlo a tu sitio web con una línea de código."
        },
        {
            question: "¿Se puede integrar con WhatsApp?",
            answer: "Sí, nuestros planes Pro y Empresa ofrecen integración con WhatsApp y otras plataformas de mensajería para que puedas atender a tus clientes dondequiera que estén."
        },
        {
            question: "¿Qué tan seguro es?",
            answer: "La seguridad es nuestra máxima prioridad. Todos los datos se almacenan de forma segura y están encriptados. No utilizamos tus datos para entrenar modelos para otros clientes."
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-semibold text-center mb-8">Preguntas Frecuentes</h2>
                {faqItems.map((item, index) => (
                    <FAQAccordion 
                        key={index} 
                        item={item} 
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                    />
                ))}
            </div>
        </section>
    );
};


const LandingPage: React.FC<{ onLoginClick: () => void; }> = ({ onLoginClick }) => {
  return (
    <>
      <Header onLoginClick={onLoginClick} />
      <main>
        <Hero onLoginClick={onLoginClick} />
        <Features />
        <Pricing onLoginClick={onLoginClick} />
        <FAQ />
      </main>
    </>
  );
};

export default LandingPage;
