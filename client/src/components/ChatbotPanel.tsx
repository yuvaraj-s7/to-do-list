import { useState } from 'react';
import { http } from '../api/http';

export function ChatbotPanel() {
  const [message, setMessage] = useState('plan my day');
  const [reply, setReply] = useState('Ask me to plan your day.');

  const send = async () => {
    const res = await http.post('/chat', { message });
    setReply(res.data.reply);
  };

  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-2 font-semibold">Chatbot Assistant</h3>
      <div className="mb-3 rounded bg-slate-100 p-3 text-sm dark:bg-slate-800">{reply}</div>
      <div className="flex gap-2">
        <input value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded border p-2" />
        <button onClick={send} className="rounded bg-indigo-600 px-3 py-2 text-white">Send</button>
      </div>
    </div>
  );
}
