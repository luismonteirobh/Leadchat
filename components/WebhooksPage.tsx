import React, { useState } from 'react';
import { Webhook, ViewType } from '../types';
import { MOCK_WEBHOOKS } from '../constants';

interface WebhooksPageProps {
  onBack: () => void;
}

const EVENT_OPTIONS = [
  { id: 'conversation_created', label: 'Conversa Criada (conversation_created)' },
  { id: 'conversation_status_changed', label: 'Status de conversa alterado (conversation_status_changed)' },
  { id: 'conversation_updated', label: 'Conversa Atualizada (conversation_updated)' },
  { id: 'message_created', label: 'Mensagem criada (message_created)' },
  { id: 'message_updated', label: 'Mensagem atualizada (message_updated)' },
  { id: 'webwidget_triggered', label: 'Widget de chat aberto pelo usuário (webwidget_triggered)' },
  { id: 'contact_created', label: 'Contato criado (contact_created)' },
  { id: 'contact_updated', label: 'Contato atualizado (contact_updated)' },
  { id: 'conversation_typing_on', label: 'Status de Digitação ativado (conversation_typing_on)' },
  { id: 'conversation_typing_off', label: 'Status de Digitação desativado (conversation_typing_off)' },
];

export const WebhooksPage: React.FC<WebhooksPageProps> = ({ onBack }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>(MOCK_WEBHOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ url: string; events: string[] }>({
    url: '',
    events: []
  });

  const handleOpenModal = (webhook?: Webhook) => {
    if (webhook) {
      setEditingId(webhook.id);
      setFormData({ url: webhook.url, events: webhook.events });
    } else {
      setEditingId(null);
      setFormData({ url: '', events: [] });
    }
    setIsModalOpen(true);
  };

  const handleToggleEvent = (eventId: string) => {
    setFormData(prev => {
      const exists = prev.events.includes(eventId);
      return {
        ...prev,
        events: exists 
          ? prev.events.filter(e => e !== eventId)
          : [...prev.events, eventId]
      };
    });
  };

  const handleSave = () => {
    if (!formData.url) return;

    if (editingId) {
      setWebhooks(webhooks.map(w => 
        w.id === editingId ? { ...w, url: formData.url, events: formData.events } : w
      ));
    } else {
      const newWebhook: Webhook = {
        id: Math.random().toString(36).substr(2, 9),
        url: formData.url,
        events: formData.events
      };
      setWebhooks([...webhooks, newWebhook]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este webhook?')) {
      setWebhooks(webhooks.filter(w => w.id !== id));
    }
  };

  const getEventLabel = (id: string) => {
    return EVENT_OPTIONS.find(e => e.id === id)?.label.split(' (')[0] || id;
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm mb-4 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back_ios</span>
          Integrações
        </button>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Webhooks</h1>
            <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
              Eventos webhook fornecem atualizações sobre atividades em tempo real na sua conta Chatwoot. Você pode se inscrever em seus eventos preferidos, e o Chatwoot enviará as chamadas HTTP com as atualizações.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">Saiba mais sobre webhooks &gt;</a>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Adicionar novo Webhook
          </button>
        </div>

        {/* List */}
        {webhooks.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
             <div className="grid grid-cols-[1fr_auto] gap-4 p-4 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
               <div>Webhook URL (endpoint)</div>
               <div>Ações</div>
             </div>
             
             <div className="divide-y divide-gray-100">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 flex items-start justify-between group hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-sm font-medium text-gray-900 break-all">{webhook.url}</span>
                      <span className="text-xs text-gray-500">
                        Eventos Inscritos: {webhook.events.map(e => getEventLabel(e)).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                       <button 
                          onClick={() => handleOpenModal(webhook)}
                          className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors"
                          title="Editar"
                       >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                       </button>
                       <button 
                          onClick={() => handleDelete(webhook.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                          title="Excluir"
                       >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
             <p className="text-gray-500">Nenhum webhook configurado.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out] flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
               <h3 className="text-lg font-semibold text-gray-900">
                 {editingId ? 'Editar webhook' : 'Adicionar novo webhook'}
               </h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
               <p className="text-sm text-gray-500 mb-6">
                 Webhook Os eventos fornecem informações em tempo real sobre o que está acontecendo na sua conta do Chatwoot. Digite um URL válido para configurar um retorno de chamada.
               </p>
               
               <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL do Webhook</label>
                  <input 
                     type="text" 
                     value={formData.url}
                     onChange={(e) => setFormData({...formData, url: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="Exemplo: https://example/api/webhook"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Eventos</label>
                  <div className="space-y-3">
                    {EVENT_OPTIONS.map(event => (
                      <div key={event.id} className="flex items-start gap-3">
                         <div className="flex items-center h-5">
                            <input
                              id={event.id}
                              type="checkbox"
                              checked={formData.events.includes(event.id)}
                              onChange={() => handleToggleEvent(event.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            />
                         </div>
                         <label htmlFor={event.id} className="text-sm text-gray-700 select-none cursor-pointer leading-tight">
                            {event.label}
                         </label>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100 shrink-0">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                  Cancelar
               </button>
               <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
               >
                  {editingId ? 'Salvar webhook' : 'Criar webhook'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};