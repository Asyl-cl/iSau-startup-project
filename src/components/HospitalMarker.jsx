import { Popup } from 'react-leaflet';

const HospitalMarker = ({ hospital }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`;

  return (
    <Popup>
      <div className="p-2 min-w-[250px]">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{hospital.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
        <p className="text-sm text-gray-600 mb-3">
          <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">
            📞 {hospital.phone}
          </a>
        </p>
        {hospital.specialties && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Мамандықтар:</p>
            <div className="flex flex-wrap gap-1">
              {hospital.specialties.slice(0, 3).map((spec, idx) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-gradient-medical hover:opacity-90 text-white rounded-lg text-sm font-semibold transition-opacity"
        >
          Маршрут
        </a>
      </div>
    </Popup>
  );
};

export default HospitalMarker;
