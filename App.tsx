import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConversationList } from './components/ConversationList';
import { ChatWindow } from './components/ChatWindow';
import { ContactSidebar } from './components/ContactSidebar';
import { LabelsPage } from './components/LabelsPage';
import { MOCK_CONVERSATIONS } from './constants';
import { TabType, ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('chat');
  const [activeConversationId, setActiveConversationId] = useState<string | null>('2');
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ALL);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(true);

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  // Filter logic (simple simulation)
  const filteredConversations = MOCK_CONVERSATIONS; 

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleBackToMenu = () => {
    setActiveConversationId(null);
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden relative">
      <Sidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeView={currentView}
        onNavigate={handleNavigate}
      />
      
      {currentView === 'chat' ? (
        <>
          {/* Conversation List Column */}
          <div className={`
            flex-col h-full z-10 w-full md:w-auto
            ${activeConversationId ? 'hidden md:flex' : 'flex'}
          `}>
            <ConversationList 
              conversations={filteredConversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onMenuClick={() => setIsMobileMenuOpen(true)}
            />
          </div>

          {/* Chat Window Column */}
          <div className={`
            flex-col h-full bg-white min-w-0 w-full md:flex-1
            ${activeConversationId ? 'flex' : 'hidden md:flex'}
          `}>
            <ChatWindow 
              conversation={activeConversation} 
              onBack={handleBackToMenu}
              onToggleContactInfo={() => setIsContactInfoOpen(!isContactInfoOpen)}
              isContactInfoOpen={isContactInfoOpen}
            />
          </div>

          {/* Contact Sidebar (Desktop Only) */}
          {activeConversationId && (
            <ContactSidebar 
               conversation={activeConversation}
               isOpen={isContactInfoOpen}
               onClose={() => setIsContactInfoOpen(false)}
            />
          )}
        </>
      ) : (
        /* Settings / Labels View */
        <div className="flex-1 h-full w-full overflow-hidden">
           {/* Hamburger for mobile in settings view */}
           <div className="md:hidden h-14 flex items-center px-4 border-b border-gray-200">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 -ml-2 text-gray-500"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="ml-2 font-semibold text-gray-700">Configurações</span>
           </div>
           
           {currentView === 'labels' && <LabelsPage />}
        </div>
      )}
    </div>
  );
}

export default App;