import React from 'react';
import { Conversation, TabType } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onMenuClick: () => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  activeTab,
  onTabChange,
  onMenuClick
}) => {
  return (
    <section className="w-full md:w-[360px] flex flex-col bg-white border-r border-gray-200 h-full z-10 shrink-0">
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
          <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-1.5 py-0.5 rounded border border-gray-200">Abertas</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>

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
                <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                  {conv.updatedAt} • {conv.createdAt}
                </span>
              </div>
              
              <h3 className="text-gray-900 text-[13px] font-bold truncate mb-0.5 flex items-center gap-2">
                {conv.user.name}
              </h3>

              <div className="text-gray-500 text-[12px] leading-snug line-clamp-1 flex items-center gap-1">
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