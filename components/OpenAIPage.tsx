import React, { useState } from 'react';

interface OpenAIPageProps {
  onBack: () => void;
}

export const OpenAIPage: React.FC<OpenAIPageProps> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ apiKey: '', showSuggestions: false });

  const handleCreate = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto">
        
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm mb-6 transition-colors">
          <span className="material-symbols-outlined text-[16px]">arrow_back_ios</span>
          Anterior <span className="text-gray-900 font-semibold ml-1 text-lg">Integrações</span>
        </button>

        <div className="border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-sm">
            <div className="shrink-0">
                <div className="size-16 bg-black rounded-xl flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[40px]">smart_toy</span>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg font-bold text-gray-900 mb-1">OpenAI</h2>
                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    Aproveite o poder dos grandes modelos de linguagem do OpenAI com recursos como sugestões de resposta, resumo, reformulação de mensagens, verificação ortográfica e classificação de rótulos.
                </p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"
            >
                Conectar
            </button>
        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">OpenAI</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-sm text-gray-600">Sugestões, resumos e aprimoramento de mensagem e resposta com IA.</p>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input 
                     type="text" 
                     value={formData.apiKey}
                     onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                  />
               </div>
               
               <div className="flex items-center gap-2 pt-1">
                  <input 
                     type="checkbox" 
                     id="showSuggestions"
                     checked={formData.showSuggestions}
                     onChange={(e) => setFormData({...formData, showSuggestions: e.target.checked})}
                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showSuggestions" className="text-sm text-gray-700 select-none">Show label suggestions</label>
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