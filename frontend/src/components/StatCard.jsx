const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const colorConfigs = {
    blue: {
      iconBg: 'bg-blue-500/20',
      iconText: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    green: {
      iconBg: 'bg-green-500/20',
      iconText: 'text-green-400',
      border: 'border-green-500/30',
    },
    yellow: {
      iconBg: 'bg-yellow-500/20',
      iconText: 'text-yellow-400',
      border: 'border-yellow-500/30',
    },
    red: {
      iconBg: 'bg-red-500/20',
      iconText: 'text-red-400',
      border: 'border-red-500/30',
    },
  };

  const config = colorConfigs[color] || colorConfigs.blue;

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mt-3">
            {value}
          </p>
        </div>
        <div className={`${config.iconBg} ${config.iconText} p-4 rounded-2xl text-2xl shadow-lg border ${config.border}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

