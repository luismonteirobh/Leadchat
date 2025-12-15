import React, { useState } from 'react';
import { Label } from '../types';
import { LABELS as INITIAL_LABELS } from '../constants';

export const LabelsPage: React.FC = () => {
  const [labels, setLabels] = useState<Label[]>(INITIAL_LABELS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState<Partial<Label>>({
    name: '',
    description: '',
    color: '#D86ADE',
    showInSidebar: true
  });

  const PRESET_COLORS = [
     '#D86ADE', '#A41111', '#151E68', '#0EE004', '#F4BD43', '#A8B7D0', '#E4F9E5', '#AAC5B7', '#D44A20', '#3b82f6'
  ];

  const handleCreate = () => {
    if (!newLabel.name) return;
    const label: Label = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLabel.name,
      description: newLabel.description || '',
      color: newLabel.color || '#000000',
      showInSidebar: newLabel.showInSidebar
    };
    setLabels([...labels, label]);
    setIsModalOpen(false);
    setNewLabel({ name: '', description: '', color: '#D86ADE', showInSidebar: true });
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Etiquetas</h1>
            <p className="text-gray-600 text-sm max-w-3xl leading-relaxed">
              As etiquetas ajudam você a categorizar e priorizar conversas e leads. Você pode atribuir uma etiqueta a uma conversa ou contato usando o painel lateral.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block">Aprenda mais sobre etiquetas &gt;</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Adicionar etiqueta
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Nome</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/2">Descrição</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-1/4">Cor</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {labels.map((label) => (
                    <tr key={label.id} className="hover:bg-gray-50 group">
                       <td className="py-4 px-6 text-sm font-medium text-gray-900">{label.name}</td>
                       <td className="py-4 px-6 text-sm text-gray-600">{label.description}</td>
                       <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                             <span className="text-xs text-gray-500 font-mono">{label.color}</span>
                             <span className="w-4 h-4 rounded shadow-sm border border-black/5" style={{ backgroundColor: label.color }}></span>
                             <div className="w-8 flex justify-end">
                                <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                   <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                                <button className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                   <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                             </div>
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">Adicionar etiqueta</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-sm text-gray-500">Etiquetas permitem agrupar as conversas.</p>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Etiqueta</label>
                  <input 
                     type="text" 
                     value={newLabel.name}
                     onChange={(e) => setNewLabel({...newLabel, name: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="nome da etiqueta"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <input 
                     type="text" 
                     value={newLabel.description}
                     onChange={(e) => setNewLabel({...newLabel, description: e.target.value})}
                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                     placeholder="Descrição da etiqueta"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
                  <div className="flex flex-wrap gap-2">
                     {PRESET_COLORS.map(color => (
                        <button 
                           key={color}
                           onClick={() => setNewLabel({...newLabel, color})}
                           className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${newLabel.color === color ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                           style={{ backgroundColor: color }}
                        />
                     ))}
                  </div>
               </div>

               <div className="flex items-center gap-2 pt-2">
                  <input 
                     type="checkbox" 
                     id="showInSidebar"
                     checked={newLabel.showInSidebar}
                     onChange={(e) => setNewLabel({...newLabel, showInSidebar: e.target.checked})}
                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showInSidebar" className="text-sm text-gray-700 select-none">Exibir etiqueta na barra lateral</label>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
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