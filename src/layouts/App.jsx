import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactQueryProvider from '../providers/ReactQueryProvider';
import { socket } from '../infrastructure/socket/socket';
import { useToastContext } from '@/components/ui/ToastProvider';
import { router } from '../routes/router';
import { api } from '../infrastructure/api/api';

const VAPID_PUBLIC_KEY = 'BEzlRyVvCevuOj9FNZsfMEs-Ext4cp32GS3QK2smYTizw9jDDqM3XPvfKX8mXvwKr3vMwrKJkFGkF1kUwDk9_kA'; // Replace with your real VAPID public key

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const App = () => {
  const { toast } = useToastContext();

  useEffect(() => {
    // Register service worker and subscribe to push notifications
    async function registerPush() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const reg = await navigator.serviceWorker.register('/notification-sw.js');
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const subscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
            // Send subscription to backend using api helper
            await api.post('/notifications/web-push-subscribe', { subscription });
          }
        } catch (err) {
          console.error('Web push registration failed:', err);
        }
      }
    }
    registerPush();
  }, []);

  useEffect(() => {
    // Notification event listeners
    const handleDirectMessage = (data) => {
      // Support both notification and message object
      const title = data.title || `New message from ${data.sender_id?.name || data.sender?.name || 'Someone'}`;
      const description = data.body || data.message_content || data.message || '';
      toast({
        title,
        description,
        variant: 'default',
      });
    };
    const handleGroupMessage = (data) => {
      const title = data.title || `New group message from ${data.sender_id?.name || data.sender?.name || 'Someone'}`;
      const description = data.body || data.message_content || data.message || '';
      toast({
        title,
        description,
        variant: 'default',
      });
    };
    const handleStudyGroupMessage = (data) => {
      const title = data.title || `New study group message from ${data.sender_id?.name || data.sender?.name || 'Someone'}`;
      const description = data.body || data.message_content || data.message || '';
      toast({
        title,
        description,
        variant: 'default',
      });
    };
    const handleCallIncoming = (data) => {
      toast({
        title: data.title || 'Incoming Call',
        description: data.body || '',
        variant: 'warning',
      });
    };
    const handleCallAccepted = (data) => {
      toast({
        title: data.title || 'Call Accepted',
        description: data.body || '',
        variant: 'success',
      });
    };
    const handleCallRejected = (data) => {
      toast({
        title: data.title || 'Call Rejected',
        description: data.body || '',
        variant: 'destructive',
      });
    };
    const handleCallEnded = (data) => {
      toast({
        title: data.title || 'Call Ended',
        description: data.body || '',
        variant: 'default',
      });
    };
    const handleCallMissed = (data) => {
      toast({
        title: data.title || 'Missed Call',
        description: data.body || '',
        variant: 'warning',
      });
    };

    socket.on('newDirectMessage', handleDirectMessage);
    socket.on('newGroupMessage', handleGroupMessage);
    socket.on('newMessage', handleStudyGroupMessage);
    socket.on('callIncoming', handleCallIncoming);
    socket.on('callAccepted', handleCallAccepted);
    socket.on('callRejected', handleCallRejected);
    socket.on('callEnded', handleCallEnded);
    socket.on('callMissed', handleCallMissed);

    return () => {
      socket.off('newDirectMessage', handleDirectMessage);
      socket.off('newGroupMessage', handleGroupMessage);
      socket.off('newMessage', handleStudyGroupMessage);
      socket.off('callIncoming', handleCallIncoming);
      socket.off('callAccepted', handleCallAccepted);
      socket.off('callRejected', handleCallRejected);
      socket.off('callEnded', handleCallEnded);
      socket.off('callMissed', handleCallMissed);
    };
  }, [toast]);

  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  );
};

export default App;
