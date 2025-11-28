import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      id: 1,
      title: 'Регистрация / Авторизация',
      description: 'Жүйеге кіру немесе тіркелу',
      icon: '👤',
      link: '/register',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Телемедицина',
      description: 'Үйден шықпай-ақ дәрігер кеңесі',
      icon: '💻',
      link: '/telemedicine',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Поиск больниц',
      description: 'Ауруханаларды картадан табыңыз',
      icon: '🏥',
      link: '/hospitals',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Вызов скорой помощи',
      description: 'Жаңа ғана шақыру',
      icon: '🚑',
      link: 'tel:103',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 5,
      title: 'Заказ медикаментов',
      description: 'Дәрі-дәрмектерді онлайн тапсырыс беру',
      icon: '💊',
      link: '/pharmacy',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      title: 'Личный кабинет',
      description: 'Жеке профиль және деректер',
      icon: '📋',
      link: '/profile',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 7,
      title: 'Проверка безопасности',
      description: 'Сайттың қауіпсіздігін тексеру',
      icon: '🔒',
      link: '/security',
      gradient: 'from-gray-600 to-gray-800'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Дәрігерлер' },
    { number: '500+', label: 'Медициналық мекемелер' },
    { number: '50,000+', label: 'Пациенттер' },
    { number: '24/7', label: 'Қолдау қызметі' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Медициналық қызметтер
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              бір жерде
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
            iSau — барлық медициналық қызметтерді бір платформада ұсынады. 
            Аурухана табу, дәрігерге жазылу, кеңес алу және деректерді қауіпсіз сақтау.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="px-6 py-3 bg-gradient-medical hover:opacity-90 rounded-xl text-white font-semibold transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Дәрігерге жазылу
          </Link>
          <Link
            to="/telemedicine"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            ЖИ консультация
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
              <div className="text-3xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Біздің қызметтер</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="group bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
              <div className="mt-4 flex items-center text-purple-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                Толығырақ
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="container mx-auto px-4 py-8 mb-16">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">🚑</div>
          <h2 className="text-3xl font-bold text-white mb-4">Жедел жәрдем керек пе?</h2>
          <a
            href="tel:103"
            className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-red-600 rounded-xl font-bold text-xl transition-colors"
          >
            Скорая помощь: 103
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

