import React from 'react';

export type ViewType = 'chat' | 'labels';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  initials?: string;
  colorClass?: string;
  email?: string;
}

export interface Label {
  id: string;
  name: string;
  description?: string;
  color: string; // Hex code
  showInSidebar?: boolean;
}

export interface Message {
  id: string;
  senderId: string; // 'me' or other userId
  text: string | React.ReactNode;
  timestamp: string;
  isSystem?: boolean;
  status?: 'sent' | 'read' | 'delivered';
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  updatedAt: string;
  createdAt: string;
  unreadCount: number;
  status: 'open' | 'resolved' | 'snoozed';
  assignee?: User;
  tags?: string[];
  channel: 'whatsapp' | 'email' | 'web';
  hasError?: boolean;
  messages: Message[];
}

export enum TabType {
  MINE = 'mine',
  UNASSIGNED = 'unassigned',
  ALL = 'all',
}