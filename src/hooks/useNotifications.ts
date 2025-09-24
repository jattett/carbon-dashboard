import { useState } from 'react';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'info';
  time: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '에이크미 코퍼레이션의 배출량이 목표를 초과했습니다', type: 'warning', time: '2분 전', read: false },
    { id: 2, message: '새로운 지속가능성 보고서가 업로드되었습니다', type: 'info', time: '15분 전', read: false },
    { id: 3, message: '글로벡스 인더스트리가 탄소 중립 목표를 달성했습니다', type: 'success', time: '1시간 전', read: true },
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newId = Math.max(...notifications.map(n => n.id)) + 1;
    setNotifications(prev => [{ ...notification, id: newId }, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    addNotification,
    removeNotification,
    setNotifications
  };
}
