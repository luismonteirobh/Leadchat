import React, { useState } from 'react';

interface DialogflowPageProps {
  onBack: () => void;
}

export const DialogflowPage: React.FC<DialogflowPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    projectId: '', 
    keyFile: '', 
    region: 'Global - Default',
    inbox: ''
  });

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto">
        
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm mb-4 transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back_ios</span>
          Integrações
        </button>

        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dialogflow</h1>
            <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
              Dialogflow é uma plataforma de processamento de linguagem natural para a construção de interfaces conversais. Integrá-lo com Chatwoot permite que os bots lidem primeiro com consultas e transfiram para os agentes quando necessário. Ele ajuda a qualificar leads e reduzir a carga de trabalho dos agentes respondendo às FAQ. Para adicionar um fluxo de diálogo (Dialogflow), crie uma Conta de Serviço no Google Console e compartilhe as credenciais. Consulte sua documentação para obter detalhes
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap ml-4"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Adicionar um novo hook
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
           <p className="text-gray-500 text-sm">Não há integrações dialogflow configuradas nesta conta.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">Dialogflow</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-sm text-gray-500">
                  Crie chatbots para lidar com as consultas iniciais antes de transferir para agentes.
               </p>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dialogflow Project ID</label>
                  <input 
                     type="text" 
                     value={formData.projectId}
                     onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dialogflow Project Key File</label>
                  <textarea 
                     value={formData.keyFile}
                     onChange={(e) => setFormData({...formData, keyFile: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 h-20 resize-none"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dialogflow Region</label>
                  <select 
                     value={formData.region}
                     onChange={(e) => setFormData({...formData, region: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                  >
                      <option>Global - Default</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selecionar caixa de entrada</label>
                  <select 
                     value={formData.inbox}
                     onChange={(e) => setFormData({...formData, inbox: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                  >
                      <option value="">Selecionar caixa de entrada</option>
                      <option value="1">Whatsapp</option>
                  </select>
               </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
               >
                  Cancelar
               </button>
               <button 
                  onClick={handleCreate}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none shadow-sm"
               >
                  Criar
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};