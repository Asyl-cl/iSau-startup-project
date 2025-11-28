import { useState } from 'react';

const Telemedicine = () => {
  const [symptoms, setSymptoms] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'Сәлеметсіз бе! Мен сіздің көмекшіңізбін. Қандай симптомдар сізді алаңдатады?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: Date.now(),
      text: symptoms,
      sender: 'user',
      timestamp: new Date()
    };
    setChatMessages([...chatMessages, userMessage]);
    setSymptoms('');
    setLoading(true);

    // Имитация ответа AI
    setTimeout(() => {
      const aiResponses = [
        'Мен түсіндім. Бұл симптомдарға негізделген, мен сізге келесі ұсыныстар бере аламын:\n\n1. Денсаулық жағдайыңызды бақылап отырыңыз\n2. Егер симптомдар нашарласа, дәрігерге көріну қажет\n3. Әдетте денені тыныштықта ұстау керек',
        'Жоғарыда сипатталған симптомдарға сүйене отырып, сізге келесі ұсыныстарды бере аламын:\n\n• Денсаулық жағдайыңызды бақылап отырыңыз\n• Керекті болса, термометрмен дене температурасын өлшеңіз\n• Егер күйіңіз нашарласа, дәрігерге жүгініңіз',
        'Бұл симптомдар жалпы медициналық кеңес болуы мүмкін. Алайда, нақты диагностика үшін дәрігерге көріну қажет.\n\nМен сізге жергілікті дәрігерге жазылуға көмектесе аламын. Жазылу кестесін көргіңіз келе ме?'
      ];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }))]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Телемедицина
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Жасанды интеллектпен жұмыс істейтін консультация
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Симптомдар формасы */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Симптомдарды сипаттаңыз</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Мысалы: Бас ауруы, ыстық сезім, мұрын тұқыр..."
                    className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Файлдар жүктеу (фото, анализ)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="text-xs text-gray-400 bg-gray-700 p-2 rounded">
                          📎 {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!symptoms.trim() || loading}
                  className="w-full py-3 bg-gradient-medical hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-opacity"
                >
                  {loading ? 'Жіберілуде...' : 'Жіберу'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href="tel:103"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  🚑 Скорая помощь: 103
                </a>
              </div>
            </div>
          </div>

          {/* Чат */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700 flex flex-col" style={{ height: '600px' }}>
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  ЖИ Консультант
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-gradient-medical text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;

