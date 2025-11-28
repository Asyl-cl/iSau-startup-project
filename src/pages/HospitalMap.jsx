import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import hospitalsData from '../data/hospitals.json';
import HospitalMarker from '../components/HospitalMarker';

const HospitalMap = () => {
  // Центр карты - Алматы
  const center = [43.238949, 76.889709];

  // Кастомная иконка для маркеров
  const hospitalIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Ауруханалар картасы
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Алматы қаласындағы медициналық мекемелер
        </p>

        {/* Список больниц */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Ауруханалар ({hospitalsData.length})
              </h2>
              <div className="space-y-2">
                {hospitalsData.map((hospital) => (
                  <a
                    key={hospital.id}
                    href={`#hospital-${hospital.id}`}
                    className="block bg-gray-700/50 hover:bg-gray-700 rounded-lg p-3 border border-gray-600 hover:border-purple-500 transition-colors"
                  >
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                      {hospital.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-1">
                      {hospital.address}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Карта */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden" style={{ height: '600px' }}>
              <MapContainer
                center={center}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hospitalsData.map((hospital) => (
                  <Marker
                    key={hospital.id}
                    position={[hospital.lat, hospital.lon]}
                    icon={hospitalIcon}
                  >
                    <HospitalMarker hospital={hospital} />
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Детальная информация о больницах */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalsData.map((hospital) => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`;
            
            return (
              <div
                key={hospital.id}
                id={`hospital-${hospital.id}`}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{hospital.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{hospital.address}</p>
                <div className="space-y-2 mb-4">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="block text-purple-400 hover:text-purple-300 text-sm"
                  >
                    📞 {hospital.phone}
                  </a>
                  {hospital.specialties && (
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-gradient-medical hover:opacity-90 text-white rounded-lg text-sm font-semibold transition-opacity"
                >
                  Маршрут
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HospitalMap;

