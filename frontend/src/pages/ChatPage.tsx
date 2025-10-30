import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { messageService } from '../services/api';
import type { Message } from '../types';

export function ChatPage() {
  //Usando lista
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>();
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Busca msg API
  const loadMessages = async () => {
    try {
      const data = await messageService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  // Envia msg para o back
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim() || isSending) return;

    const userMessage = inputText;
    setInputText(''); 
    setIsSending(true);

    try {
      const result = await messageService.sendMessage(userMessage, currentChatId);
      
      if (!currentChatId) {
        setCurrentChatId(result.chatId);
      }

       // Adiciona as duas mensagens (usuário + IA) na lista
      // Usando spread operator pra não mutar o array original
      setMessages((prevMessages) => [
        ...prevMessages,
        result.userMessage,
        result.aiMessage,
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      setInputText(userMessage);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const startNewChat = () => {
    setCurrentChatId(undefined);
    setMessages([]);
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
               IAgiliza Chat
            </h1>
            <button
              onClick={startNewChat}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              + Novo Chat
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              👤 {user?.name}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-y-auto">
        
        {/* Tela vazia */}
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-6xl mb-4">💬</p>
            <p className="text-xl">Start a conversation!</p>
            <p className="text-sm mt-2">Type a message below</p>
          </div>
        ) : (
          // Renderiza a lista, se tiver msg
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 shadow'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            {}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Barra de input */}
      <footer className="bg-white border-t p-4">
        <form
          onSubmit={sendMessage}
          className="max-w-4xl mx-auto flex gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSending || !inputText.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? '⏳' : '📤'}
          </button>
        </form>
      </footer>
    </div>
  );
}
