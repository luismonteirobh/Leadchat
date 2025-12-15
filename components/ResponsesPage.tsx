import React, { useState } from 'react';
import { CannedResponse } from '../types';
import { MOCK_CANNED_RESPONSES } from '../constants';

export const ResponsesPage: React.FC = () => {
  const [responses, setResponses] = useState<CannedResponse[]>(MOCK_CANNED_RESPONSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CannedResponse>>({
    shortcut: '',
    content: ''
  });

  const handleOpenModal = (response?: CannedResponse) => {
    if (response) {
      setEditingId(response.id);
      setFormData({ shortcut: response.shortcut, content: response.content });
    } else {
      setEditingId(null);
      setFormData({ shortcut: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.shortcut || !formData.content) return;

    if (editingId) {
      setResponses(responses.map(r => 
        r.id === editingId ? { ...r, shortcut: formData.shortcut!, content: formData.content! } : r
      ));
    } else {
      const newResponse: CannedResponse = {
        id: Math.random().toString(36).substr(2, 9),
        shortcut: formData.shortcut!,
        content: formData.content!
      };
      setResponses([...responses, newResponse]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta resposta pronta?')) {
      setResponses(responses.filter(r => r.id !== id));
    }
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Respostas Prontas</h1>
            <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
              Respostas prontas são modelos de resposta pré-escritas que te ajudam a responder rapidamente a uma conversa.
              Os agentes podem digitar o caractere ' / ' seguido pelo atalho para inserir uma resposta pronta durante uma conversa.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">Saiba mais sobre respostas prontas &gt;</a>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Adicionar resposta pronta
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Atalho</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/2">Conteúdo</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-1/4">Ações</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {responses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50 group">
                       <td className="py-4 px-6 text-sm font-medium text-gray-900 align-top">{response.shortcut}</td>
                       <td className="py-4 px-6 text-sm text-gray-600 align-top line-clamp-2 block">{response.content}</td>
                       <td className="py-4 px-6 text-right align-top">
                          <div className="flex items-center justify-end gap-1">
                             <button 
                                onClick={() => handleOpenModal(response)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded hover:bg-gray-100 transition-colors"
                                title="Editar"
                             >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                             </button>
                             <button 
                                onClick={() => handleDelete(response.id)}
                                className="text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                                title="Excluir"
                             >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">
                 {editingId ? 'Editar resposta pronta' : 'Adicionar resposta pronta'}
               </h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-sm text-gray-500">
                 Respostas Prontas são modelos de resposta predefinidas que podem ser usados para enviar respostas rapidamente durante conversas.
               </p>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Atalho</label>
                  <input 
                     type="text" 
                     value={formData.shortcut}
                     onChange={(e) => setFormData({...formData, shortcut: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="Por favor, insira um atalho."
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea 
                     value={formData.content}
                     onChange={(e) => setFormData({...formData, content: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 h-32 resize-none"
                     placeholder="Por favor, escreva a mensagem que deseja salvar como um modelo para usar posteriormente."
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
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
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