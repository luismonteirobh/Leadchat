import React from 'react';
import { Conversation, User, Label } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Cibelly',
  avatarUrl: 'https://i.pravatar.cc/150?u=cibelly',
  email: 'cibelly@cmparques.com'
};

export const LABELS: Label[] = [
  { id: '1', name: 'aguardandopagamento', description: '', color: '#D86ADE', showInSidebar: true },
  { id: '2', name: 'analisando', description: 'Etiqueta para ser enviado após envio dos valores', color: '#A41111', showInSidebar: true },
  { id: '3', name: 'contratopronto', description: '', color: '#151E68', showInSidebar: true },
  { id: '4', name: 'novocliente', description: 'Etiqueta para quando cliente chegar', color: '#0EE004', showInSidebar: true },
  { id: '5', name: 'pago', description: 'aguardando contrato', color: '#F4BD43', showInSidebar: true },
  { id: '6', name: 'r1', description: 'para remarketing envio de promoções', color: '#A8B7D0', showInSidebar: true },
  { id: '7', name: 'r2', description: 'para remarketing envio de promoções', color: '#E4F9E5', showInSidebar: false },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Juh💕',
      initials: 'J',
      colorClass: 'bg-blue-100 text-blue-600'
    },
    lastMessage: 'The message could not be sent. Please check your connection.',
    updatedAt: '13d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    hasError: true,
    assignee: { id: 'leonardo', name: 'Leonardo', initials: 'L' },
    messages: []
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Deivid Gomes Martins',
      initials: 'DG',
      colorClass: 'bg-teal-100 text-teal-700'
    },
    lastMessage: 'The message could not be sent. Please check your connection.',
    updatedAt: '13d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    hasError: true,
    assignee: CURRENT_USER,
    messages: [
      {
        id: 'sys1',
        senderId: 'system',
        text: 'Atribuído a consultores vale das águas por Sistema de Automação',
        timestamp: 'System',
        isSystem: true
      },
      {
        id: 'sys2',
        senderId: 'system',
        text: 'Cibelly atribuiu a si mesmo essa conversa',
        timestamp: 'System',
        isSystem: true
      },
      {
        id: 'm1',
        senderId: 'me',
        text: (
          <>
            <p className="font-bold mb-1">Olá! Sou <span className="italic">Cibelly Borges</span> 🤩</p>
            <p className="mb-2">Consultora credenciado(a) do <strong>Passaporte Anual do Vale das Águas Thermas Park!</strong></p>
            <p>Estou aqui pra te ajudar a garantir a melhor experiência pelo melhor valor possível! 🌊✨</p>
          </>
        ),
        timestamp: 'Dec 2, 9:12 AM',
        status: 'read'
      },
      {
        id: 'm2',
        senderId: 'me',
        text: 'Vocês já conheciam o Vale das Águas Thermas Park ou será a primeira vez por aqui? 😉',
        timestamp: 'Dec 2, 9:12 AM',
        status: 'read'
      },
      {
        id: 'm3',
        senderId: 'me',
        text: (
          <>
            <p className="mb-2">Você conseguiu atendimento ou posso seguir te passando os valores?</p>
            <p>Ainda tem interesse em se tornar Membro do Passaporte Vale das Águas (acesso ao parque o ano inteiro)?</p>
          </>
        ),
        timestamp: 'Dec 2, 10:45 AM',
        status: 'read'
      }
    ]
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Eduardo Cloqui',
      avatarUrl: 'https://i.pravatar.cc/150?u=eduardo',
    },
    lastMessage: 'The message could not be sent. Please contact support.',
    updatedAt: '13d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    hasError: true,
    messages: []
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Karyn Ludmila 🥰',
      avatarUrl: 'https://i.pravatar.cc/150?u=karyn',
    },
    lastMessage: 'Mensagem de áudio',
    updatedAt: '14d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    tags: ['analisando'],
    assignee: CURRENT_USER,
    messages: []
  },
  {
    id: '5',
    user: {
      id: 'u5',
      name: 'Igor Carmo',
      initials: 'IC',
      colorClass: 'bg-indigo-100 text-indigo-700'
    },
    lastMessage: 'The message could not be sent. Please check.',
    updatedAt: '14d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    hasError: true,
    assignee: CURRENT_USER,
    messages: []
  },
  {
    id: '6',
    user: {
      id: 'u6',
      name: 'Mariana',
      initials: 'M',
      colorClass: 'bg-orange-100 text-orange-700'
    },
    lastMessage: 'The message could not be sent.',
    updatedAt: '13d',
    createdAt: '13d',
    unreadCount: 0,
    status: 'open',
    channel: 'whatsapp',
    hasError: true,
    assignee: CURRENT_USER,
    messages: []
  },
];