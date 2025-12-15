import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Conversation } from '../types';
import { CURRENT_USER, MOCK_CANNED_RESPONSES } from '../constants';
import { EmojiPicker } from './EmojiPicker';

interface ChatWindowProps {
  conversation: Conversation | undefined;
  onBack: () => void;
  onToggleContactInfo: () => void;
  isContactInfoOpen: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  conversation, 
  onBack, 
  onToggleContactInfo, 
  isContactInfoOpen 
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCannedMenu, setShowCannedMenu] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  // Handle slash command detection
  useEffect(() => {
    if (inputText.startsWith('/')) {
      setShowCannedMenu(true);
    } else {
      setShowCannedMenu(false);
    }
  }, [inputText]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = (send: boolean) => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
    
    if (send) {
      // Here you would typically process the audio blob
      console.log(`Audio message sent (${recordingTime}s)`);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`Arquivo selecionado: ${file.name}`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    // Optionally close picker or keep open for multiple selections
    // setShowEmojiPicker(false); 
  };

  const handleCannedResponseSelect = (content: string) => {
    setInputText(content);
    setShowCannedMenu(false);
  };

  const filteredCannedResponses = useMemo(() => {
    const searchTerm = inputText.slice(1).toLowerCase();
    return MOCK_CANNED_RESPONSES.filter(
      r => r.shortcut.toLowerCase().includes(searchTerm) || r.content.toLowerCase().includes(searchTerm)
    );
  }, [inputText]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!conversation) {
    return (
      <main className="flex-1 h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
        <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">forum</span>
        <p className="text-sm font-medium">Select a conversation to start chatting</p>
      </main>
    );
  }

  return (
    <main className="flex-1 h-full flex flex-col bg-white overflow-hidden relative shadow-xl z-0 w-full">
      {/* Top Header */}
      <div className="h-14 min-h-[56px] px-4 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 overflow-hidden">
          <button 
            onClick={onBack}
            className="md:hidden -ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          
          <div className="flex items-center gap-3 min-w-0">
            {conversation.user.avatarUrl ? (
              <div 
                className="shrink-0 bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 border border-gray-100 shadow-sm"
                style={{ backgroundImage: `url("${conversation.user.avatarUrl}")` }}
              />
            ) : (
               <div className={`shrink-0 rounded-full size-8 flex items-center justify-center text-xs font-bold ${conversation.user.colorClass}`}>
                  {conversation.user.initials}
               </div>
            )}
            <div className="flex flex-col min-w-0">
              <h2 className="text-[15px] font-bold text-gray-900 leading-none truncate">{conversation.user.name}</h2>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-[13px] text-gray-700 hover:bg-gray-50 font-medium transition-colors">
            <span>Resolver</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
          <button className="sm:hidden p-1.5 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">
            <span className="material-symbols-outlined text-[20px]">check</span>
          </button>
          
          {!isContactInfoOpen && (
             <button 
               onClick={onToggleContactInfo}
               className="p-1.5 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100 transition-colors hidden md:block"
               title="Show Contact Info"
             >
              <span className="material-symbols-outlined text-[20px]">dock_to_left</span>
            </button>
          )}

          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gray-50 relative overflow-y-auto p-4 md:p-6 flex flex-col gap-6 scrollbar-thin">
        {conversation.messages.length === 0 && (
           <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
             No messages to display.
           </div>
        )}
        
        {conversation.messages.map((msg) => {
          if (msg.isSystem) {
             return (
              <div key={msg.id} className="flex justify-center -my-2">
                <div className="bg-gray-200/70 rounded-full px-4 py-1 text-xs text-center text-gray-500 font-medium border border-gray-200 shadow-sm">
                  {msg.text}
                </div>
              </div>
             );
          }

          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[90%] md:max-w-[85%]`}>
                <div 
                  className={`p-3 md:p-4 rounded-xl text-[14px] leading-relaxed shadow-sm break-words
                    ${isMe 
                      ? 'bg-blue-100 text-gray-800 rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                >
                  {typeof msg.text === 'string' ? <p>{msg.text}</p> : msg.text}
                </div>
                <div className={`flex items-center gap-1 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
                  <span className="text-[10px] text-gray-400 font-medium">{msg.timestamp}</span>
                  {isMe && msg.status && (
                    <>
                       <span className="material-symbols-outlined text-[14px] text-blue-500">done_all</span>
                       {/* Simulate the 'C' orange circle from the screenshot */}
                       <div className="bg-orange-200 text-orange-800 rounded-full size-4 flex items-center justify-center text-[8px] font-bold border border-white ml-0.5">
                         {conversation.user.name.charAt(0)}
                       </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 md:p-4 bg-white z-20 relative">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
        {!isRecording ? (
          <>
            {/* Canned Responses Menu */}
            {showCannedMenu && (
               <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 animate-[fadeIn_0.1s_ease-out] max-h-[300px] flex flex-col">
                 <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                   Respostas Prontas
                 </div>
                 <div className="overflow-y-auto scrollbar-thin">
                   {filteredCannedResponses.length > 0 ? (
                     filteredCannedResponses.map((response) => (
                       <button
                         key={response.id}
                         onClick={() => handleCannedResponseSelect(response.content)}
                         className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors group"
                       >
                         <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-gray-800 text-sm">{response.shortcut}</span>
                            <span className="text-xs text-gray-500 line-clamp-1">{response.content}</span>
                         </div>
                       </button>
                     ))
                   ) : (
                     <div className="px-4 py-3 text-sm text-gray-400 italic">
                        Nenhuma resposta encontrada para "{inputText.slice(1)}"
                     </div>
                   )}
                 </div>
               </div>
            )}

            {/* Emoji Picker Popover */}
            {showEmojiPicker && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowEmojiPicker(false)} />
                <div className="absolute bottom-full left-4 mb-2 z-50 animate-[fadeIn_0.1s_ease-out]">
                   <EmojiPicker onSelect={handleEmojiSelect} />
                </div>
              </>
            )}

            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-thin">
              <button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors shadow-sm whitespace-nowrap">Responder</button>
              <button className="bg-transparent hover:bg-gray-50 border border-transparent text-gray-500 px-3 py-1 rounded text-sm font-medium transition-colors whitespace-nowrap">Mensagem Privada</button>
            </div>
            
            <div className="relative">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full border-none focus:ring-0 p-0 text-sm text-gray-800 resize-none h-12 placeholder-gray-400 outline-none"
                placeholder={showCannedMenu ? "Filtrar respostas prontas..." : "Shift + enter para nova linha. Digite '/' para selecionar uma Resposta Pronta."}
              />
              {/* Slash Command Hint (optional visual cue if needed, currently placeholder handles it) */}
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 gap-2">
              <div className="flex items-center gap-1 md:gap-2">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-1.5 rounded transition-colors ${showEmojiPicker ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                  title="Emojis"
                >
                  <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                </button>
                <button 
                  onClick={handleAttachClick}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
                  title="Anexar arquivos"
                >
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>
                <button 
                  onClick={startRecording}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors hidden sm:block"
                  title="Gravar áudio"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                
                {/* AI Button - Shortened for mobile */}
                <button className="ml-1 md:ml-2 flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md text-xs font-semibold hover:bg-purple-100 transition-colors border border-purple-100">
                   <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                   <span className="hidden sm:inline">Inteligência Artificial</span>
                   <span className="sm:hidden">IA</span>
                </button>
              </div>
              
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm shadow-blue-200">
                <span className="hidden sm:inline">Enviar (⌘ + ↵)</span>
                <span className="sm:hidden material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </>
        ) : (
          <div className="h-[120px] flex items-center px-2">
             <div className="flex-1 bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200 shadow-inner">
               
               <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center size-10">
                     <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20 animate-ping"></span>
                     <div className="bg-red-500 text-white rounded-full size-8 flex items-center justify-center z-10">
                        <span className="material-symbols-outlined text-[20px]">mic</span>
                     </div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-gray-900 font-mono font-bold text-lg leading-none mb-1">
                        {formatTime(recordingTime)}
                     </span>
                     <span className="text-xs text-gray-500 font-medium">Gravando...</span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <button 
                    onClick={() => stopRecording(false)}
                    className="flex items-center justify-center size-10 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
                    title="Cancelar"
                  >
                     <span className="material-symbols-outlined text-[22px]">delete</span>
                  </button>
                  <button 
                    onClick={() => stopRecording(true)}
                    className="flex items-center justify-center size-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all hover:scale-105"
                    title="Enviar áudio"
                  >
                     <span className="material-symbols-outlined text-[22px]">send</span>
                  </button>
               </div>
             </div>
          </div>
        )}
      </div>
    </main>
  );
};