import React, { useState, useRef, useEffect } from 'react';
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [autoOffline, setAutoOffline] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

          {/* Settings Section */}
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
                    onClick={() => onNavigate('responses')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${activeView === 'responses' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <span>Respostas Prontas</span>
                  </a>
                  <a 
                    onClick={() => onNavigate('integrations')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${['integrations', 'webhooks', 'apps', 'openai', 'dialogflow', 'google-translate', 'dyte'].includes(activeView) ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <span>Integrações</span>
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

        {/* User Footer with Popup Menu */}
        <div className="p-3 border-t border-gray-200 mt-auto relative" ref={profileMenuRef}>
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-[fadeIn_0.1s_ease-out]">
               <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Disponibilidade</span>
                  <button 
                    onClick={() => setIsOnline(!isOnline)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md border ${isOnline ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
                  >
                     <div className={`size-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                     {isOnline ? 'Online' : 'Offline'}
                     <span className="material-symbols-outlined text-[14px]">expand_more</span>
                  </button>
               </div>
               
               <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100 mb-1">
                  <span className="text-sm text-gray-600">Marcar offline automaticamente</span>
                  <div 
                    onClick={() => setAutoOffline(!autoOffline)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors ${autoOffline ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                     <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${autoOffline ? 'translate-x-4.5' : 'translate-x-1'}`} style={{ transform: autoOffline ? 'translateX(18px)' : 'translateX(2px)' }}/>
                  </div>
                  <span className="material-symbols-outlined text-[14px] text-gray-400 ml-1">info</span>
               </div>

               <div className="py-1">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                     <span className="material-symbols-outlined text-[18px] text-gray-500">keyboard</span>
                     Atalhos do teclado
                  </a>
                  <a 
                    onClick={() => {
                       onNavigate('profile');
                       setIsProfileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                     <span className="material-symbols-outlined text-[18px] text-gray-500">person_outline</span>
                     Configurações do Perfil
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                     <span className="material-symbols-outlined text-[18px] text-gray-500">palette</span>
                     Alterar Tema
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                     <span className="material-symbols-outlined text-[18px] text-gray-500">book</span>
                     Ler documentação
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                     <span className="material-symbols-outlined text-[18px] text-gray-500">sticky_note_2</span>
                     Notas de versão
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                     <span className="material-symbols-outlined text-[18px] text-gray-500">admin_panel_settings</span>
                     Console de Super Admin
                  </a>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                     <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <span className="material-symbols-outlined text-[18px] text-gray-500">power_settings_new</span>
                        Encerrar sessão
                     </a>
                  </div>
               </div>
            </div>
          )}

          <div 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex gap-2.5 items-center p-1.5 rounded-lg cursor-pointer transition-colors ${isProfileMenuOpen || activeView === 'profile' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <div className="relative">
              <div className="bg-amber-200 text-amber-800 flex items-center justify-center rounded-full size-8 text-xs font-bold border border-amber-300">
                LM
              </div>
              <span className={`absolute bottom-0 right-0 size-2.5 border-2 border-white rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
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