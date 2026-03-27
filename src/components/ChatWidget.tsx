import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { getChatResponse, type ChatMessage } from '../utils/chatResponses';
import type { CreditMemoData } from '../utils/memoGenerator';

interface Props {
  memo: CreditMemoData;
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  const lines = msg.content.split('\n');

  const renderContent = (text: string) => {
    // Basic markdown rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/✅/g, '<span class="text-emerald-400">✅</span>')
      .replace(/⚠️/g, '<span class="text-amber-400">⚠️</span>')
      .replace(/❌/g, '<span class="text-red-400">❌</span>')
      .replace(/✓/g, '<span class="text-emerald-400">✓</span>');
  };

  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
        isUser ? 'bg-nepal-blue' : 'bg-gradient-to-br from-blue-600 to-purple-600'
      }`}>
        {isUser ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
        isUser
          ? 'bg-nepal-blue text-white rounded-tr-sm'
          : 'bg-white/8 text-white/80 rounded-tl-sm'
      }`}>
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-2" />;
          return (
            <div
              key={i}
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderContent(line) }}
            />
          );
        })}
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200/60' : 'text-white/30'}`}>
          {msg.timestamp.toLocaleTimeString('en-NP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

const QUICK_PROMPTS = [
  'What is the DSCR?',
  'Is the LTV acceptable?',
  'Check eligibility',
  'Document checklist',
  'Risk assessment',
  'NRB guidelines',
];

export default function ChatWidget({ memo }: Props) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Hello! I'm your CAMS Credit Assistant. I can help you analyze this application for **${memo.application.borrowerName}**.\n\nAsk me about DSCR, LTV, risk assessment, NRB guidelines, or any document-related queries!`,
      timestamp: new Date(),
    }
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimized]);

  const loanInfo = {
    borrowerName: memo.application.borrowerName,
    loanProduct: memo.application.loanProduct,
    loanAmount: memo.application.loanAmount,
    creditScore: memo.application.creditScore,
    dscr: memo.financials.dscr,
    ltvRatio: memo.financials.ltvRatio,
    monthlyIncome: memo.application.monthlyIncome,
    emi: memo.financials.emi,
  };

  const sendMessage = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;
    setInput('');
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msgText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const response = getChatResponse(msgText, loanInfo);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const unreadCount = messages.filter(m => m.role === 'assistant').length - 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Open Chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="relative w-14 h-14 bg-gradient-to-br from-nepal-blue to-blue-700 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {Math.min(unreadCount, 9)}
            </div>
          )}
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className={`flex flex-col bg-[#0D2137] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
          minimized ? 'h-14 w-80' : 'w-96 h-[550px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Credit Assistant</div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimized(!minimized)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
                {typing && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/8 rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <div className="flex gap-1 items-center h-5">
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-xs bg-white/5 hover:bg-white/10 border border-white/15 rounded-full px-2.5 py-1 text-white/60 hover:text-white transition-all"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/10 flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about this application..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-400 transition-all"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-nepal-blue hover:bg-blue-600 disabled:opacity-30 rounded-xl flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
