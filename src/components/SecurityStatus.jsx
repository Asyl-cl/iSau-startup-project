const SecurityStatus = ({ check }) => {
  const statusColor = check.status ? 'text-green-400' : 'text-red-400';
  const bgColor = check.status ? 'bg-green-500/20' : 'bg-red-500/20';
  const borderColor = check.status ? 'border-green-500/50' : 'border-red-500/50';

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white">{check.name}</h3>
        <div className={`${statusColor} text-xl`}>
          {check.status ? '✓' : '✗'}
        </div>
      </div>
      <p className="text-sm text-gray-300">{check.message}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Ұпай: {check.score}/100</span>
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${check.score >= 90 ? 'bg-green-500' : check.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${check.score}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityStatus;

