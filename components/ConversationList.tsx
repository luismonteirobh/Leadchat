import React, { useState, useRef, useEffect } from 'react';
import { Conversation, TabType } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onMenuClick: () => void;
}

type FilterField = 'status' | 'priority' | 'assignee' | 'inbox' | 'team' | 'id' | 'campaign' | 'labels' | 'browser_language' | 'country' | 'referrer' | 'created_at' | 'last_activity';
type FilterOperator = 'equal' | 'not_equal' | 'contains';

interface Filter {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
}

const FILTER_FIELDS: { id: FilterField; label: string; type: 'select' | 'text' | 'date'; options?: string[] }[] = [
  { id: 'status', label: 'Status', type: 'select', options: ['Abertas', 'Resolvidas', 'Pendentes', 'Adiadas', 'Todas'] },
  { id: 'priority', label: 'Prioridade', type: 'select', options: ['Nenhuma', 'Baixa', 'Média', 'Alta', 'Urgente'] },
  { id: 'assignee', label: 'Agente atribuído', type: 'text' },
  { id: 'inbox', label: 'Caixa de Entrada', type: 'select', options: ['Whatsapp', 'Email', 'API'] },
  { id: 'team', label: 'Nome do Time', type: 'text' },
  { id: 'id', label: 'Identificador da conversa', type: 'text' },
  { id: 'campaign', label: 'Nome da campanha', type: 'text' },
  { id: 'labels', label: 'Etiquetas', type: 'text' },
  { id: 'browser_language', label: 'Idioma do navegador', type: 'text' },
  { id: 'country', label: 'Nome do País', type: 'text' },
  { id: 'referrer', label: 'Link de origem', type: 'text' },
  { id: 'created_at', label: 'Criado em', type: 'date' },
  { id: 'last_activity', label: 'Última atividade', type: 'date' },
];

const OPERATORS: { id: FilterOperator; label: string; symbol?: string }[] = [
  { id: 'equal', label: 'Igual a', symbol: '=' },
  { id: 'not_equal', label: 'Diferente', symbol: '≠' },
  { id: 'contains', label: 'Contém' },
];

const SORT_OPTIONS = [
  { id: 'last_activity_asc', label: 'Última atividade: Mais antigas primeiro' },
  { id: 'last_activity_desc', label: 'Última atividade: Recentes primeiro' },
  { id: 'created_at_desc', label: 'Criado em: Recentes primeiro' },
  { id: 'created_at_asc', label: 'Criado em: Antigos primeiro' },
  { id: 'priority_desc', label: 'Prioridade: Altas primeiro' },
  { id: 'priority_asc', label: 'Prioridade: Baixas primeiro' },
  { id: 'waiting_since_asc', label: 'Resposta pendente: Longas primeiro' },
  { id: 'waiting_since_desc', label: 'Resposta pendente: Curtas primeiro' },
];

const STATUS_OPTIONS = ['Abertas', 'Resolvidas', 'Pendentes', 'Adiadas', 'Todas'];

// Helper component for buttons with tooltips
const IconButtonWithTooltip = ({ 
  icon, 
  label, 
  onClick, 
  isActive = false
}: { 
  icon: string; 
  label: string; 
  onClick?: () => void; 
  isActive?: boolean 
}) => {
  return (
    <div className="relative group flex items-center justify-center">
      <button 
        onClick={onClick}
        className={`p-1.5 rounded transition-colors ${isActive ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
      >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </button>
      {!isActive && (
        <div className="absolute top-full right-0 mt-2 hidden group-hover:block z-[60] pointer-events-none">
          <div className="bg-gray-900 text-white text-[11px] font-medium rounded py-1 px-2.5 whitespace-nowrap shadow-lg animate-[fadeIn_0.1s_ease-out]">
            {label}
          </div>
        </div>
      )}
    </div>
  );
};

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  activeTab,
  onTabChange,
  onMenuClick
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('last_activity_desc');
  const [activeSubmenu, setActiveSubmenu] = useState<'status' | 'sort' | null>(null);
  
  const [filters, setFilters] = useState<Filter[]>([
    { id: '1', field: 'status', operator: 'equal', value: 'Abertas' }
  ]);
  
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    if (isFilterOpen || isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen, isSortOpen]);

  // Reset submenu when sort menu closes
  useEffect(() => {
    if (!isSortOpen) setActiveSubmenu(null);
  }, [isSortOpen]);

  const handleAddFilter = () => {
    const newFilter: Filter = {
      id: Math.random().toString(36).substr(2, 9),
      field: 'status',
      operator: 'equal',
      value: 'Abertas'
    };
    setFilters([...filters, newFilter]);
  };

  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, field: keyof Filter, value: any) => {
    setFilters(filters.map(f => {
      if (f.id === id) {
        if (field === 'field') {
           const newFieldType = FILTER_FIELDS.find(ft => ft.id === value)?.type;
           const oldFieldType = FILTER_FIELDS.find(ft => ft.id === f.field)?.type;
           if (newFieldType !== oldFieldType) {
             return { ...f, [field]: value, value: '' }; 
           }
        }
        return { ...f, [field]: value };
      }
      return f;
    }));
  };

  // Get current status from filters or default
  const currentStatusFilter = filters.find(f => f.field === 'status');
  const currentStatus = currentStatusFilter ? currentStatusFilter.value : 'Todas';

  const updateStatusFilter = (newStatus: string) => {
    if (currentStatusFilter) {
      updateFilter(currentStatusFilter.id, 'value', newStatus);
    } else {
      // Add status filter if not exists
      const newFilter: Filter = {
        id: Math.random().toString(36).substr(2, 9),
        field: 'status',
        operator: 'equal',
        value: newStatus
      };
      setFilters([...filters, newFilter]);
    }
    setActiveSubmenu(null);
  };

  return (
    <section className="w-full md:w-[360px] flex flex-col bg-white border-r border-gray-200 h-full z-10 shrink-0 relative">
      {/* Header */}
      <div className="h-14 min-h-[56px] px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button 
            onClick={onMenuClick}
            className="md:hidden -ml-2 mr-1 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <h2 className="text-[15px] font-bold text-gray-900">Conversas</h2>
          <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-1.5 py-0.5 rounded border border-gray-200">{currentStatus}</span>
        </div>
        <div className="flex items-center gap-0.5 relative z-50">
          <IconButtonWithTooltip 
            icon="filter_list" 
            label="Filtrar conversas" 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            isActive={isFilterOpen} 
          />
          <div className="relative" ref={sortRef}>
            <IconButtonWithTooltip 
              icon="swap_vert" 
              label="Ordenar conversas"
              onClick={() => setIsSortOpen(!isSortOpen)}
              isActive={isSortOpen}
            />
            
            {/* Sort Popover */}
            {isSortOpen && (
              <div 
                className="absolute top-full right-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 w-[340px] animate-[fadeIn_0.1s_ease-out] p-5 flex flex-col gap-5"
              >
                {/* Status Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-800">Status</span>
                  <div className="relative">
                     <button 
                       onClick={() => setActiveSubmenu(activeSubmenu === 'status' ? null : 'status')}
                       className={`flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-800 transition-colors min-w-[140px] justify-between ${activeSubmenu === 'status' ? 'ring-2 ring-blue-100 bg-gray-200' : ''}`}
                     >
                       <span>{currentStatus}</span>
                       <span className="material-symbols-outlined text-[18px]">expand_more</span>
                     </button>
                     
                     {/* Status Submenu */}
                     {activeSubmenu === 'status' && (
                       <div className="absolute top-full right-0 mt-1 w-[160px] bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-[fadeIn_0.1s_ease-out]">
                         {STATUS_OPTIONS.map(status => (
                           <button
                             key={status}
                             onClick={() => updateStatusFilter(status)}
                             className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                           >
                             {status}
                             {currentStatus === status && <span className="material-symbols-outlined text-[16px] text-gray-700">check</span>}
                           </button>
                         ))}
                       </div>
                     )}
                  </div>
                </div>

                {/* Sort Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-800">Ordenar por</span>
                   <div className="relative">
                     <button 
                       onClick={() => setActiveSubmenu(activeSubmenu === 'sort' ? null : 'sort')}
                       className={`flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-800 transition-colors min-w-[180px] justify-between ${activeSubmenu === 'sort' ? 'ring-2 ring-blue-100 bg-gray-200' : ''}`}
                     >
                       <span className="truncate max-w-[140px]">
                         {SORT_OPTIONS.find(o => o.id === activeSort)?.label.split(':')[0]}...
                       </span>
                       <span className="material-symbols-outlined text-[18px]">expand_more</span>
                     </button>

                     {/* Sort Submenu */}
                     {activeSubmenu === 'sort' && (
                       <div className="absolute top-full right-0 mt-1 w-[260px] bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-[fadeIn_0.1s_ease-out] max-h-[300px] overflow-y-auto">
                         {SORT_OPTIONS.map(option => (
                           <button
                             key={option.id}
                             onClick={() => { setActiveSort(option.id); setActiveSubmenu(null); }}
                             className="w-full text-left px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center justify-between group"
                           >
                             <span className="truncate pr-2">{option.label}</span>
                             {activeSort === option.id && <span className="material-symbols-outlined text-[16px] text-gray-700">check</span>}
                           </button>
                         ))}
                       </div>
                     )}
                   </div>
                </div>
              </div>
            )}
          </div>
          
          <IconButtonWithTooltip 
            icon="logout" 
            label="Exportar conversas" 
          />
        </div>
      </div>

      {/* Filter Popover (Main) */}
      {isFilterOpen && (
        <div 
          ref={filterRef}
          className="absolute top-14 left-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-[500px] max-w-[90vw] animate-[fadeIn_0.1s_ease-out]"
        >
          <div className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Filtrar conversas</h3>
            
            <div className="space-y-3 mb-4">
              {filters.map((filter, index) => (
                <div key={filter.id} className="flex items-center gap-2">
                  {index > 0 && (
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1.5 rounded">E</span>
                  )}
                  
                  {/* Field Select */}
                  <div className="relative">
                     <select
                        value={filter.field}
                        onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}
                        className="appearance-none bg-gray-100 hover:bg-gray-200 border-transparent rounded-md pl-3 pr-8 py-1.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                     >
                        {FILTER_FIELDS.map(f => (
                           <option key={f.id} value={f.id}>{f.label}</option>
                        ))}
                     </select>
                     <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                     </span>
                  </div>

                  <span className="text-blue-600 font-bold">=</span>

                  {/* Operator Select */}
                  <div className="relative">
                     <select
                        value={filter.operator}
                        onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                        className="appearance-none bg-transparent hover:bg-gray-50 rounded-md pl-2 pr-6 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                     >
                        {OPERATORS.map(op => (
                           <option key={op.id} value={op.id}>{op.label}</option>
                        ))}
                     </select>
                     <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                     </span>
                  </div>

                  {/* Value Input/Select */}
                  <div className="flex-1">
                    {FILTER_FIELDS.find(f => f.id === filter.field)?.type === 'select' ? (
                       <div className="relative">
                          <select
                             value={filter.value}
                             onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                             className="w-full appearance-none bg-gray-100 hover:bg-gray-200 border-transparent rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          >
                             {FILTER_FIELDS.find(f => f.id === filter.field)?.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                             ))}
                          </select>
                          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                             <span className="material-symbols-outlined text-[16px]">expand_more</span>
                          </span>
                       </div>
                    ) : (
                       <div className="relative flex items-center">
                          {FILTER_FIELDS.find(f => f.id === filter.field)?.type === 'text' && (
                             <span className="absolute left-2 text-gray-400 font-light">+</span>
                          )}
                          <input 
                             type={FILTER_FIELDS.find(f => f.id === filter.field)?.type === 'date' ? 'date' : 'text'}
                             value={filter.value}
                             onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                             className={`w-full bg-gray-100 hover:bg-gray-200 border-transparent rounded-md py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${FILTER_FIELDS.find(f => f.id === filter.field)?.type === 'text' ? 'pl-6 pr-3' : 'px-3'}`}
                             placeholder={FILTER_FIELDS.find(f => f.id === filter.field)?.type === 'text' ? 'Selecione uma opção...' : ''}
                          />
                       </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-1">
                     <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                     </button>
                     <button 
                        onClick={() => handleRemoveFilter(filter.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 border border-transparent hover:border-red-100"
                        disabled={filters.length === 1}
                     >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                     </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
               onClick={handleAddFilter}
               className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1"
            >
               Adicionar filtro
            </button>

            <div className="flex justify-end gap-3 pt-2">
               <button 
                  onClick={() => setFilters([{ id: Math.random().toString(), field: 'status', operator: 'equal', value: 'Abertas' }])}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
               >
                  Limpar filtros
               </button>
               <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
               >
                  Aplicar filtros
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 border-b border-gray-200 bg-white">
        <div className="flex gap-6">
          <button
            onClick={() => onTabChange(TabType.MINE)}
            className={`relative flex items-center py-3 group transition-colors ${activeTab === TabType.MINE ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <span className="text-[13px] font-medium">Minhas</span>
            <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === TabType.MINE ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>0</span>
            {activeTab === TabType.MINE && <span className="absolute bottom-0 w-full h-[2px] bg-blue-600 rounded-t-sm"></span>}
          </button>
          
          <button
            onClick={() => onTabChange(TabType.UNASSIGNED)}
            className={`relative flex items-center py-3 group transition-colors ${activeTab === TabType.UNASSIGNED ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <span className="text-[13px] font-medium">Não atribuídas</span>
            <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === TabType.UNASSIGNED ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>1</span>
            {activeTab === TabType.UNASSIGNED && <span className="absolute bottom-0 w-full h-[2px] bg-blue-600 rounded-t-sm"></span>}
          </button>

          <button
            onClick={() => onTabChange(TabType.ALL)}
            className={`relative flex items-center py-3 group transition-colors ${activeTab === TabType.ALL ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <span className="text-[13px] font-medium">Todos</span>
            <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === TabType.ALL ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>54</span>
            {activeTab === TabType.ALL && <span className="absolute bottom-0 w-full h-[2px] bg-blue-600 rounded-t-sm"></span>}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors group ${
              activeConversationId === conv.id 
                ? 'bg-blue-50/50 hover:bg-blue-50 border-l-4 border-l-transparent' 
                : 'hover:bg-gray-50'
            }`}
          >
            {/* Avatar */}
            <div className="relative shrink-0 mt-0.5">
              {conv.user.avatarUrl ? (
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-gray-100 shadow-sm"
                  style={{ backgroundImage: `url("${conv.user.avatarUrl}")` }}
                />
              ) : (
                <div className={`rounded-full size-9 flex items-center justify-center text-xs font-bold border border-black/5 shadow-sm ${conv.user.colorClass}`}>
                  {conv.user.initials}
                </div>
              )}
              {conv.unreadCount > 0 && (
                 <span className="absolute -top-1 -right-1 size-3.5 bg-blue-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {conv.unreadCount}
                 </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <div className="flex items-center gap-1.5">
                  {conv.assignee && (
                    <span className="text-[11px] text-gray-400 font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">person</span>
                      {conv.assignee.name.split(' ')[0]}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium tracking-tight ${conv.unreadCount > 0 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                  {conv.updatedAt} • {conv.createdAt}
                </span>
              </div>
              
              <h3 className={`text-gray-900 text-[13px] truncate mb-0.5 flex items-center gap-2 ${conv.unreadCount > 0 ? 'font-black' : 'font-medium'}`}>
                {conv.user.name}
              </h3>

              <div className={`text-[12px] leading-snug line-clamp-1 flex items-center gap-1 ${conv.unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-500 font-normal'}`}>
                {conv.lastMessage.includes('Mensagem de áudio') ? (
                   <>
                    <span className="material-symbols-outlined text-[14px]">reply</span>
                    <span className="material-symbols-outlined text-[14px]">headphones</span>
                   </>
                ) : (
                   <>
                     {conv.hasError && (
                        <>
                           <span className="material-symbols-outlined text-[14px] text-red-400">lock</span>
                           <span className="material-symbols-outlined text-[14px] text-red-400">warning</span>
                        </>
                     )}
                   </>
                )}
                <span className="truncate">{conv.lastMessage}</span>
              </div>

              {conv.tags && conv.tags.length > 0 && (
                 <div className="flex gap-1 mt-1.5">
                    {conv.tags.map(tag => (
                       <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold bg-red-100 text-red-800 uppercase tracking-wide">
                          <span className="size-1.5 bg-red-700 rounded-full mr-1"></span>
                          {tag}
                       </span>
                    ))}
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};