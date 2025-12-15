import React from 'react';
import { ViewType } from '../types';

interface IntegrationItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  viewName?: ViewType;
}

interface IntegrationsPageProps {
  onNavigate: (view: ViewType) => void;
}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ onNavigate }) => {
  const integrations: IntegrationItem[] = [
    {
      id: 'webhooks',
      title: 'Webhooks',
      description: 'Eventos webhook fornecem atualizações sobre atividades em tempo real na sua conta Chatwoot. Você pode se inscrever em seus eventos preferidos, e o Chatwoot enviará as chamadas HTTP com as atualizações.',
      isConnected: true,
      viewName: 'webhooks',
      icon: <span className="material-symbols-outlined text-3xl text-blue-500">webhook</span>
    },
    {
      id: 'apps',
      title: 'Painel de Aplicativos',
      description: 'O Painel de Aplicativos permite que você crie e incorpore aplicativos que exibem informações, pedidos ou histórico de pagamento, fornecendo mais contexto aos seus agentes de suporte ao cliente.',
      isConnected: false,
      viewName: 'apps',
      icon: <span className="material-symbols-outlined text-3xl text-blue-400">extension</span>
    },
    {
      id: 'openai',
      title: 'OpenAI',
      description: 'Aproveite o poder dos grandes modelos de linguagem do OpenAI com recursos como sugestões de resposta, resumo, reformulação de mensagens, verificação ortográfica e classificação de rótulos.',
      isConnected: false,
      viewName: 'openai',
      icon: (
        <div className="size-8 bg-black rounded-full flex items-center justify-center text-white">
             <span className="material-symbols-outlined text-[20px]">smart_toy</span>
        </div>
      ) 
    },
    {
      id: 'dialogflow',
      title: 'Dialogflow',
      description: 'Construa chatbots com o Dialogflow e integre-os facilmente na sua caixa de entrada. Esses bots podem lidar com as consultas iniciais antes de transferi-las para um agente de atendimento ao cliente.',
      isConnected: false,
      viewName: 'dialogflow',
      icon: <span className="material-symbols-outlined text-3xl text-orange-500">forum</span>
    },
    {
      id: 'google_translate',
      title: 'Tradutor do Google',
      description: 'Integre o Google Tradutor para ajudar os agentes a traduzir facilmente as mensagens dos clientes. Esta integração detecta automaticamente o idioma e o converte para o idioma preferido do agente ou do administrador.',
      isConnected: false,
      viewName: 'google-translate',
      icon: <span className="material-symbols-outlined text-3xl text-blue-600">g_translate</span>
    },
    {
      id: 'dyte',
      title: 'Dyte',
      description: 'Dyte é um produto que integra as funcionalidades de áudio e vídeo em sua aplicação. Com esta integração, os seus agentes podem iniciar chamadas de vídeo/voz com seus clientes diretamente do chatwoot.',
      isConnected: false,
      viewName: 'dyte',
      icon: (
        <div className="size-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">video_camera_front</span>
        </div>
      )
    },
  ];

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Integrações</h1>
          <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
            Chatwoot se integra com várias ferramentas e serviços para melhorar a eficiência de seu time. Explore a lista abaixo para configurar seus aplicativos favoritos.
          </p>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">Aprenda mais sobre integrações &gt;</a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col h-full hover:shadow-sm transition-shadow">
              
              {/* Card Top: Icon & Status */}
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                    {item.icon}
                 </div>
                 
                 {item.isConnected ? (
                    <div className="bg-green-500 text-white rounded-full p-0.5" title="Conectado">
                        <span className="material-symbols-outlined text-[16px] block font-bold">check</span>
                    </div>
                 ) : (
                    <div className="bg-gray-300 text-white rounded-full p-0.5" title="Desconectado">
                        <span className="material-symbols-outlined text-[16px] block font-bold">check</span>
                    </div>
                 )}
              </div>

              {/* Card Middle: Title & Action */}
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                 <button 
                  onClick={() => item.viewName && onNavigate(item.viewName)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                 >
                    Configurar
                 </button>
              </div>

              {/* Card Bottom: Description */}
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                 {item.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};