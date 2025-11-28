import { useState } from 'react';
import { performSecurityCheck } from '../utils/securityCheck';
import SecurityStatus from '../components/SecurityStatus';

const SecurityCheck = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => {
      const securityResults = performSecurityCheck();
      setResults(securityResults);
      setLoading(false);
    }, 1000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLevelColor = (level) => {
    if (level === 'Жақсы') return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (level === 'Орташа') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Қауіпсіздікті тексеру
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Сайттың қауіпсіздік деңгейін бағалау
        </p>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-6">
          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full py-4 bg-gradient-medical hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-bold text-lg transition-opacity"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Тексерілуде...
              </span>
            ) : (
              '🔒 Қауіпсіздікті тексеру'
            )}
          </button>
        </div>

        {results && (
          <div className="space-y-6">
            {/* Общий результат */}
            <div className={`bg-gray-800 rounded-xl p-6 border ${getLevelColor(results.securityLevel)}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Жалпы нәтиже</h2>
                <div className="text-4xl font-bold">{results.totalScore}/100</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Қауіпсіздік деңгейі:</p>
                  <p className="text-xl font-semibold">{results.securityLevel}</p>
                </div>
                <div className="text-sm text-gray-400">
                  {results.timestamp}
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    results.totalScore >= 90 ? 'bg-green-500' :
                    results.totalScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${results.totalScore}%` }}
                />
              </div>
            </div>

            {/* Детальные проверки */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Тексеру нәтижелері</h3>
              {results.checks.map((check, idx) => (
                <SecurityStatus key={idx} check={check} />
              ))}
            </div>

            {/* Рекомендации */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Ұсыныстар</h3>
              <ul className="space-y-2 text-gray-300">
                {results.totalScore < 100 && (
                  <>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Сайтты HTTPS протоколымен жұмыс істеуге ауыстырыңыз</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Регулярлы түрде қауіпсіздікті тексеріп отырыңыз</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Барлық пайдаланушы деректерін қорғаңыз</span>
                    </li>
                  </>
                )}
                {results.totalScore === 100 && (
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Сайттың қауіпсіздік деңгейі өте жоғары! Барлық стандарттар сақталады.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {!results && !loading && (
          <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-gray-400">
              Қауіпсіздікті тексеру үшін жоғарыдағы батырманы басыңыз
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityCheck;

