import React, { useState } from 'react';
import { LABELS } from '../constants';
import { ViewType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeView, onNavigate }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-[260px] md:w-[240px] flex flex-col bg-white border-r border-gray-200 h-full text-gray-700 shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:static
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'}
        `}
      >
        {/* Header */}
        <div className="h-14 min-h-[56px] px-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <span className="w-1.5 h-6 bg-blue-600 rounded-r-md"></span>
            <span className="truncate">CM Parques e Re...</span>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
            </div>
            <input
              className="block w-full pl-9 pr-8 py-1.5 rounded-md bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-gray-700 placeholder-gray-400 transition-all shadow-sm outline-none"
              placeholder="Pesquisar..."
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined text-[16px]">edit_square</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 flex flex-col gap-0.5 scrollbar-thin pb-4">
          <a 
            onClick={() => onNavigate('chat')}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer group ${activeView === 'chat' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <span className={`material-symbols-outlined text-[20px] ${activeView === 'chat' ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>inbox</span>
            <span className="text-[13px] font-medium">Caixa de Entrada</span>
          </a>

          <div className="flex flex-col mt-1">
            <a className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px] text-gray-500">chat_bubble_outline</span>
              <span className="text-[13px] flex-1">Conversas</span>
              <span className="material-symbols-outlined text-[16px] text-gray-400">expand_less</span>
            </a>
            <div className="pl-3 mt-0.5 flex flex-col gap-0.5 border-l border-gray-100 ml-5">
              <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                <span>Todas as conversas</span>
              </a>
              <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                <span>Menções</span>
              </a>
              <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                <span>Não atendidas</span>
              </a>
            </div>
          </div>

          <a className="flex items-center gap-2.5 px-3 py-1.5 mt-1 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-gray-700">dns</span>
            <span className="text-[13px] font-medium">Canais</span>
          </a>

          {/* Labels Section */}
          <div className="mt-4 mb-1 px-3 flex items-center justify-between group cursor-pointer" onClick={() => onNavigate('labels')}>
            <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-700">
              <span className="material-symbols-outlined text-[18px]">label</span>
              <span className="text-[13px] font-medium">Etiquetas</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">add</span>
          </div>
          
          <div className="pl-9 pr-2 flex flex-col gap-0.5 mb-2">
            {LABELS.filter(l => l.showInSidebar).map((label) => (
              <a key={label.id} className="flex items-center gap-2 py-1 text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: label.color }}></span>
                <span className="truncate">{label.name}</span>
              </a>
            ))}
          </div>

          {/* Settings Section (New) */}
          <div className="mt-2">
             <a 
               className="flex items-center gap-2.5 px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer group"
               onClick={() => setIsSettingsOpen(!isSettingsOpen)}
             >
                <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-gray-700">settings</span>
                <span className="text-[13px] font-medium flex-1">Configurações</span>
                <span className={`material-symbols-outlined text-[16px] text-gray-400 transition-transform ${isSettingsOpen ? '' : '-rotate-90'}`}>expand_more</span>
             </a>
             
             {isSettingsOpen && (
               <div className="pl-3 mt-0.5 flex flex-col gap-0.5 border-l border-gray-100 ml-5">
                  <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                    <span>Conta</span>
                  </a>
                  <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                    <span>Agentes</span>
                  </a>
                  <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                    <span>Times</span>
                  </a>
                  <a className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer">
                    <span>Caixas de Entrada</span>
                  </a>
                  <a 
                    onClick={() => onNavigate('labels')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${activeView === 'labels' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <span>Etiquetas</span>
                  </a>
               </div>
             )}
          </div>

        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-gray-200 mt-auto">
          <div className="flex gap-2.5 items-center p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="relative">
              <div className="bg-amber-200 text-amber-800 flex items-center justify-center rounded-full size-8 text-xs font-bold border border-amber-300">
                LM
              </div>
              <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-gray-900 text-[13px] font-bold leading-tight truncate">Luis Monteiro</h1>
              <p className="text-gray-500 text-[11px] font-medium leading-tight truncate">luismonteirobh@gmail....</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};