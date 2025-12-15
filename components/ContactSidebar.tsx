import React from 'react';
import { Conversation, User } from '../types';

interface ContactSidebarProps {
  conversation: Conversation | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactSidebar: React.FC<ContactSidebarProps> = ({ conversation, isOpen, onClose }) => {
  if (!isOpen || !conversation) return null;

  return (
    <aside className="w-[300px] bg-white border-l border-gray-200 h-full flex flex-col shrink-0 overflow-y-auto scrollbar-thin z-20 hidden md:flex">
      {/* Header */}
      <div className="h-14 min-h-[56px] px-4 flex items-center justify-between border-b border-gray-200 shrink-0">
        <h2 className="text-[15px] font-bold text-gray-900">Contatos</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-6">
        
        {/* Profile Header */}
        <div className="flex flex-col items-start">
          {conversation.user.avatarUrl ? (
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-16 border border-gray-100 shadow-sm mb-3"
              style={{ backgroundImage: `url("${conversation.user.avatarUrl}")` }}
            />
          ) : (
             <div className={`rounded-full size-16 flex items-center justify-center text-xl font-bold mb-3 ${conversation.user.colorClass || 'bg-teal-100 text-teal-700'}`}>
                {conversation.user.initials || conversation.user.name.substring(0,2).toUpperCase()}
             </div>
          )}
          
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900 font-bold text-[16px]">{conversation.user.name}</h3>
            <a href="#" className="text-gray-400 hover:text-gray-600">
               <span className="material-symbols-outlined text-[16px]">info</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
               <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
             <span className="material-symbols-outlined text-[18px]">mail</span>
             <span>Indisponível</span>
          </div>

          <div className="flex flex-col gap-2 w-full">
             <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">call</span>
                <span className="flex-1">+5519982003822</span>
                <span className="material-symbols-outlined text-[16px] text-gray-400 cursor-pointer">content_copy</span>
             </div>
             <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">person</span>
                <span className="flex-1 truncate">61521178669283@lid</span>
             </div>
             <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="material-symbols-outlined text-[18px] text-gray-400">domain</span>
                <span className="flex-1">Indisponível</span>
             </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2">
           <button className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              <span className="material-symbols-outlined text-[18px] block">chat_bubble_outline</span>
           </button>
           <button className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              <span className="material-symbols-outlined text-[18px] block">edit</span>
           </button>
           <button className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              <span className="material-symbols-outlined text-[18px] block">call_merge</span>
           </button>
           <button className="p-2 border border-gray-200 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 border-red-100">
              <span className="material-symbols-outlined text-[18px] block">delete</span>
           </button>
        </div>

        <hr className="border-gray-100" />

        {/* Accordions / Forms */}
        <div className="flex flex-col gap-5">
           
           {/* Actions Accordion Header */}
           <div className="flex items-center justify-between cursor-pointer group">
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Ações da conversa</h4>
              <span className="material-symbols-outlined text-[18px] text-blue-500">remove</span>
           </div>

           {/* Agent */}
           <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Agente atribuído</label>
              <div className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md hover:border-gray-300 cursor-pointer">
                 <div className="flex items-center gap-2">
                    <div className="bg-orange-100 text-orange-600 text-xs font-bold rounded-full size-5 flex items-center justify-center">C</div>
                    <span className="text-sm text-gray-800 font-medium">Cibelly</span>
                 </div>
                 <span className="material-symbols-outlined text-[18px] text-gray-400">expand_more</span>
              </div>
              <div className="flex justify-end">
                 <button className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5 font-medium">
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span> Atribuir a mim
                 </button>
              </div>
           </div>

           {/* Team */}
           <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Time atribuído</label>
              <div className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md hover:border-gray-300 cursor-pointer">
                 <div className="flex items-center gap-2">
                    <div className="bg-gray-100 text-gray-500 text-xs font-bold rounded-full size-5 flex items-center justify-center">CV</div>
                    <span className="text-sm text-gray-800 font-medium">consultores vale das águas</span>
                 </div>
                 <span className="material-symbols-outlined text-[18px] text-gray-400">expand_more</span>
              </div>
           </div>

           {/* Priority */}
           <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Prioridade</label>
              <div className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md hover:border-gray-300 cursor-pointer">
                 <span className="text-sm text-gray-800">Nenhuma</span>
                 <span className="material-symbols-outlined text-[18px] text-gray-400">expand_more</span>
              </div>
           </div>

           <hr className="border-gray-100" />

           {/* Tags */}
           <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-gray-700">Etiquetas da conversa</h4>
              <button className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 self-start px-2 py-1 rounded text-xs font-medium transition-colors">
                 <span className="material-symbols-outlined text-[14px]">add</span>
                 Adicionar etiquetas
              </button>
           </div>

           <hr className="border-gray-100" />

           {/* Macros */}
            <div className="flex items-center justify-between cursor-pointer group pb-4">
              <h4 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Macros</h4>
              <span className="material-symbols-outlined text-[18px] text-blue-500">add</span>
           </div>

        </div>
      </div>
    </aside>
  );
};