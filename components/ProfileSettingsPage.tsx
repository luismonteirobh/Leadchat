import React, { useState } from 'react';
import { CURRENT_USER } from '../constants';

export const ProfileSettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Luis Monteiro',
    displayName: '',
    email: 'luismonteirobh@gmail.com',
    fontSize: 'Padrão',
    language: 'Usar padrão da conta',
    signature: '',
    sendShortcut: 'enter', // 'enter' or 'cmd_enter'
    audioAlert: 'Ding',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    newConversation: { email: false, push: false },
    assignedConversation: { email: true, push: true },
    mention: { email: false, push: false },
    newMessage: { email: false, push: false },
    newMessageparticipating: { email: false, push: false },
  });

  const [audioEvents, setAudioEvents] = useState({
    assignedToMe: false,
    unassigned: false,
    assignedToOthers: false,
  });

  const [audioConditions, setAudioConditions] = useState({
    backgroundOnly: true,
    every30sec: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notificationPrefs, type: 'email' | 'push') => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: { ...prev[key], [type]: !prev[key][type] }
    }));
  };

  return (
    <div className="flex-1 h-full bg-white overflow-y-auto">
      <div className="p-8 max-w-4xl mx-auto space-y-12 pb-20">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Perfil</h1>
           
           <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto do perfil</label>
                <div className="flex items-center gap-4">
                   <div className="bg-amber-200 text-amber-800 flex items-center justify-center rounded-md size-12 text-lg font-bold">
                      LM
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome para exibição</label>
                <input 
                  type="text" 
                  value={formData.displayName}
                  onChange={e => handleChange('displayName', e.target.value)}
                  placeholder="Por favor, insira um nome de exibição para ser exibido em conversas"
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu e-mail</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                 Atualizar o Perfil
              </button>
           </div>
        </div>

        <hr className="border-gray-100" />

        {/* Interface */}
        <div className="space-y-6">
           <h2 className="text-lg font-medium text-gray-900">Interface</h2>
           <p className="text-sm text-gray-600">Personalize a aparência do seu painel do Chatwoot.</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                 <label className="block text-sm font-medium text-gray-900 mb-1">Tamanho da fonte</label>
                 <p className="text-xs text-gray-500 mb-2">Ajuste o tamanho do texto do painel com base na sua preferência.</p>
              </div>
              <select 
                value={formData.fontSize}
                onChange={e => handleChange('fontSize', e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                 <option>Padrão</option>
                 <option>Pequeno</option>
                 <option>Grande</option>
              </select>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                 <label className="block text-sm font-medium text-gray-900 mb-1">Idioma preferido</label>
                 <p className="text-xs text-gray-500 mb-2">Escolha o idioma que deseja usar.</p>
              </div>
              <select 
                value={formData.language}
                onChange={e => handleChange('language', e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                 <option>Usar padrão da conta</option>
                 <option>Português (Brasil)</option>
                 <option>English</option>
              </select>
           </div>
        </div>

        <hr className="border-gray-100" />

        {/* Signature */}
        <div className="space-y-4">
           <h2 className="text-lg font-medium text-gray-900">Assinatura de mensagens pessoais</h2>
           <p className="text-sm text-gray-600 leading-relaxed">
             Crie uma assinatura de mensagem única para aparecer no final de cada mensagem que você enviar de qualquer caixa de entrada. Você também pode incluir uma imagem anexada, suportada em live-chat, e-mail e caixas de entrada de API.
           </p>

           <div className="border border-gray-200 rounded-md bg-gray-50">
              <div className="flex gap-2 p-2 border-b border-gray-200">
                 <button className="p-1 hover:bg-gray-200 rounded text-gray-500 font-bold text-xs">B</button>
                 <button className="p-1 hover:bg-gray-200 rounded text-gray-500 italic text-xs">I</button>
                 <button className="p-1 hover:bg-gray-200 rounded text-gray-500 text-xs line-through">S</button>
                 <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>
                 <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <span className="material-symbols-outlined text-[14px]">link</span>
                 </button>
                 <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <span className="material-symbols-outlined text-[14px]">image</span>
                 </button>
              </div>
              <textarea 
                 value={formData.signature}
                 onChange={e => handleChange('signature', e.target.value)}
                 className="w-full bg-transparent p-3 text-sm focus:outline-none min-h-[100px] resize-y"
                 placeholder="Insira aqui a assinatura de sua mensagem pessoal."
              />
           </div>
           
           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
               Salvar assinatura da mensagem
           </button>
        </div>

        <hr className="border-gray-100" />

        {/* Shortcuts */}
        <div className="space-y-4">
           <h2 className="text-lg font-medium text-gray-900">Tecla de atalho para enviar mensagens</h2>
           <p className="text-sm text-gray-600">
             Você pode selecionar uma tecla de atalho (Enter ou Cmd/Ctrl+Enter) com base na sua preferência de escrita.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                 className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.sendShortcut === 'enter' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                 onClick={() => handleChange('sendShortcut', 'enter')}
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900 text-sm">Enter (↵)</span>
                    <div className={`size-4 rounded-full border flex items-center justify-center ${formData.sendShortcut === 'enter' ? 'border-blue-600' : 'border-gray-300'}`}>
                       {formData.sendShortcut === 'enter' && <div className="size-2 bg-blue-600 rounded-full"></div>}
                    </div>
                 </div>
                 <p className="text-xs text-gray-600 mb-4">Enviar mensagens pressionando a tecla Enter em vez de clicar no botão de enviar.</p>
                 <div className="bg-white/50 p-3 rounded border border-gray-200/50">
                    <div className="h-2 w-1/3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-end">
                       <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded">Send (↵)</div>
                    </div>
                 </div>
              </label>

              <label 
                 className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.sendShortcut === 'cmd_enter' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                 onClick={() => handleChange('sendShortcut', 'cmd_enter')}
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900 text-sm">Cmd/Ctrl + Enter (⌘ + ↵)</span>
                    <div className={`size-4 rounded-full border flex items-center justify-center ${formData.sendShortcut === 'cmd_enter' ? 'border-blue-600' : 'border-gray-300'}`}>
                       {formData.sendShortcut === 'cmd_enter' && <div className="size-2 bg-blue-600 rounded-full"></div>}
                    </div>
                 </div>
                 <p className="text-xs text-gray-600 mb-4">Pressione a tecla Cmd/Ctrl + Enter ao invés de clicar no botão enviar.</p>
                 <div className="bg-white/50 p-3 rounded border border-gray-200/50">
                    <div className="h-2 w-1/3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-end">
                       <div className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded">Send (⌘ + ↵)</div>
                    </div>
                 </div>
              </label>
           </div>
        </div>

        <hr className="border-gray-100" />

        {/* Password */}
        <div className="space-y-6">
           <h2 className="text-lg font-medium text-gray-900">Senha</h2>
           
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
              <input 
                 type="password"
                 value={formData.currentPassword}
                 onChange={e => handleChange('currentPassword', e.target.value)} 
                 placeholder="Por favor, digite a senha atual"
                 className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
              <input 
                 type="password"
                 value={formData.newPassword}
                 onChange={e => handleChange('newPassword', e.target.value)} 
                 placeholder="Por favor, digite uma nova senha"
                 className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirme a nova senha</label>
              <input 
                 type="password"
                 value={formData.confirmPassword}
                 onChange={e => handleChange('confirmPassword', e.target.value)} 
                 placeholder="Por favor, digite sua nova senha"
                 className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
           </div>

           <button className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
               Mudar Senha
           </button>
        </div>

        <hr className="border-gray-100" />

        {/* Audio Alerts */}
        <div className="space-y-6">
           <h2 className="text-lg font-medium text-gray-900">Alertas de áudio</h2>
           <p className="text-sm text-gray-600">Habilitar notificações de áudio no painel para novas mensagens e conversas.</p>

           <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-900 mb-1">Título:</label>
              <div className="flex gap-2">
                 <select 
                   value={formData.audioAlert}
                   onChange={e => handleChange('audioAlert', e.target.value)}
                   className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                 >
                    <option>Ding</option>
                 </select>
                 <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600">
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                 </button>
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Eventos de alerta para conversas</h3>
              
              <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="assignedToMe"
                    checked={audioEvents.assignedToMe}
                    onChange={() => setAudioEvents(prev => ({ ...prev, assignedToMe: !prev.assignedToMe }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="assignedToMe" className="text-sm text-gray-700">Conversas atribuídas a mim</label>
              </div>

              <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="unassigned"
                    checked={audioEvents.unassigned}
                    onChange={() => setAudioEvents(prev => ({ ...prev, unassigned: !prev.unassigned }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="unassigned" className="text-sm text-gray-700">Conversas não atribuídas</label>
              </div>

              <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="assignedToOthers"
                    checked={audioEvents.assignedToOthers}
                    onChange={() => setAudioEvents(prev => ({ ...prev, assignedToOthers: !prev.assignedToOthers }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="assignedToOthers" className="text-sm text-gray-700">Conversas abertas atribuídas a outras pessoas</label>
              </div>
              
              <p className="text-xs text-gray-500 pt-1">Você não selecionou nenhuma opção, você não receberá nenhum alerta de áudio.</p>
           </div>

           <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Condições:</h3>
              <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="backgroundOnly"
                    checked={audioConditions.backgroundOnly}
                    onChange={() => setAudioConditions(prev => ({ ...prev, backgroundOnly: !prev.backgroundOnly }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="backgroundOnly" className="text-sm text-gray-700">Enviar alertas de áudio apenas se a janela do navegador não estiver ativa</label>
              </div>
              
              <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="every30sec"
                    checked={audioConditions.every30sec}
                    onChange={() => setAudioConditions(prev => ({ ...prev, every30sec: !prev.every30sec }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="every30sec" className="text-sm text-gray-700">Enviar alertas a cada 30 segundos até que todas as conversas atribuídas sejam lidas</label>
              </div>
           </div>
        </div>

        <hr className="border-gray-100" />

        {/* Notification Preferences */}
        <div className="space-y-6">
           <h2 className="text-lg font-medium text-gray-900">Preferências de notificação</h2>
           
           <div className="w-full">
              <div className="grid grid-cols-[1fr_100px_100px] gap-4 mb-4">
                 <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de notificação</div>
                 <div className="text-center text-xs font-medium text-gray-900">e-mail</div>
                 <div className="text-center text-xs font-medium text-gray-900">Notificação</div>
              </div>

              <div className="space-y-6">
                 <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                    <div className="text-sm text-gray-700">Uma nova conversa foi criada</div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newConversation.email}
                          onChange={() => handleNotificationChange('newConversation', 'email')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newConversation.push}
                          onChange={() => handleNotificationChange('newConversation', 'push')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                    <div className="text-sm text-gray-700">Uma conversa foi atribuída a você</div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.assignedConversation.email}
                          onChange={() => handleNotificationChange('assignedConversation', 'email')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.assignedConversation.push}
                          onChange={() => handleNotificationChange('assignedConversation', 'push')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                    <div className="text-sm text-gray-700">Você foi mencionado em uma conversa</div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.mention.email}
                          onChange={() => handleNotificationChange('mention', 'email')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.mention.push}
                          onChange={() => handleNotificationChange('mention', 'push')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                    <div className="text-sm text-gray-700">Uma nova mensagem foi criada e atribuída</div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newMessage.email}
                          onChange={() => handleNotificationChange('newMessage', 'email')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newMessage.push}
                          onChange={() => handleNotificationChange('newMessage', 'push')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-[1fr_100px_100px] gap-4 items-center">
                    <div className="text-sm text-gray-700">Uma nova mensagem foi criada em uma conversa que você participa</div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newMessageparticipating.email}
                          onChange={() => handleNotificationChange('newMessageparticipating', 'email')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                    <div className="flex justify-center">
                       <input 
                          type="checkbox" 
                          checked={notificationPrefs.newMessageparticipating.push}
                          onChange={() => handleNotificationChange('newMessageparticipating', 'push')}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 size-4"
                       />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <span className="material-symbols-outlined text-gray-500">notifications</span>
                 <span className="text-sm text-gray-700 font-medium">Ative notificações push em seu navegador para poder recebê-las</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 cursor-pointer">
                 <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
              </div>
           </div>
        </div>

        <hr className="border-gray-100" />

        {/* Token */}
        <div className="space-y-4">
           <h2 className="text-lg font-medium text-gray-900">Token de acesso</h2>
           <p className="text-sm text-gray-600">Esse token pode ser usado se você estiver criando uma integração baseada em API</p>
           
           <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm font-mono flex items-center justify-between">
                 <span className="text-gray-900 tracking-widest">•••••••••••••••••••••</span>
                 <button className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined text-[16px]">visibility_off</span>
                 </button>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                 <span className="material-symbols-outlined text-[18px]">content_copy</span>
                 Copiar
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                 <span className="material-symbols-outlined text-[18px]">refresh</span>
                 Reiniciar
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};