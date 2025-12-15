import React, { useState } from 'react';

interface AppsPageProps {
  onBack: () => void;
}

export const AppsPage: React.FC<AppsPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', endpoint: '' });

  const handleCreate = () => {
    // Logic to create app would go here
    setIsModalOpen(false);
    setFormData({ name: '', endpoint: '' });
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Painel de Aplicativos</h1>
            <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
              O Painel de Aplicativos permite que organizações incorporem um aplicativo dentro do painel para fornecer o contexto para agentes de suporte ao cliente. Este recurso permite que você crie uma aplicação independente e incorpore para fornecer informações de usuário, seus pedidos ou seu histórico de pagamentos anteriores.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">Saiba mais sobre o Painel de Aplicativos &gt;</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Adicionar um novo aplicativo
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
           <p className="text-gray-500 text-sm">Ainda não há aplicativos nesta conta</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">Adicionar um novo aplicativo</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 space-y-5">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input 
                     type="text" 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="Digite um nome para o aplicativo"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</label>
                  <input 
                     type="text" 
                     value={formData.endpoint}
                     onChange={(e) => setFormData({...formData, endpoint: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="Digite a URL do endpoint onde seu aplicativo está hospedado"
                  />
               </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
               >
                  Cancelar
               </button>
               <button 
                  onClick={handleCreate}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
               >
                  Enviar
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};