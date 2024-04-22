// VerVuelos.tsx
import React, { useEffect, useState } from 'react';
import VerPrecios from './VerPrecios'; // Importa el componente VerPrecios
import { GET } from '../utils/api'; // Importa la función GET 
import type { City } from '../utils/types'; // URL temporal

const VerVuelos: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [originCity, setOriginCity] = useState(''); // Estado para almacenar la ciudad de origen
    const [destinationCity, setDestinationCity] = useState(''); // Estado para almacenar la ciudad de destino
    const [filteredCities, setFilteredCities] = useState<City[]>([]); // Estado para almacenar las ciudades filtradas
    const [showMainButtons, setShowMainButtons] = useState(true); // Estado para mostrar los botones principales
    const [originCityFilled, setOriginCityFilled] = useState(false); // Estado para indicar si el campo de origen está lleno
    const [destinationCityFilled, setDestinationCityFilled] = useState(false); // Estado para indicar si el campo de destino está lleno
    const [showModifySearch, setShowModifySearch] = useState(false); // Estado para controlar la visibilidad del botón "Modificar Búsqueda"

    useEffect(() => {
        // Obtener la lista de ciudades disponibles al montarse el componente
        const fetchCities = async () => {
            try {
                const data = await GET('http://localhost:8080/api/cities'); // URL temporal
                setCities(data);
                setFilteredCities(data); // Inicialmente, muestra todas las ciudades disponibles
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        // Filtra las ciudades disponibles para el destino
        const filteredDestinationCities = cities.filter(
            (city) => city.city.toLowerCase() !== originCity.toLowerCase()
        );
        setFilteredCities(filteredDestinationCities);
    }, [originCity, cities]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (originCityFilled && destinationCityFilled) {
            setShowMainButtons(false);
            setShowModifySearch(true); // Mostrar el botón "Modificar Búsqueda" cuando se hace clic en Buscar
        } else {
            alert('Por favor, complete ambos campos de ciudad antes de buscar.');
        }
    };

    const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOriginCity(value);
        setOriginCityFilled(value !== '');
        // Verificar si la ciudad seleccionada como origen ya está seleccionada como destino
        if (value === destinationCity) {
            // Si la ciudad de origen es igual a la ciudad de destino, limpiar el campo de destino
            setDestinationCity('');
            setDestinationCityFilled(false); // Actualizar el estado del campo de destino
        }
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDestinationCity(value);
        setDestinationCityFilled(value !== '');
    };

    const handleLogoClick = () => {
        setShowMainButtons(true);
        setShowModifySearch(false);
    };

    return (
        <div>
            <div className="header-container">
                <div className="top-panel">
                    <div className="logo-container" onClick={handleLogoClick}>
                        <span className="logo">Singapur Airlines</span>
                    </div>
                    <div className="buttons-container">
                        {showMainButtons ? (
                            <>
                                <button style={{ fontWeight: 'bold' }} className="header-button">
                                    Reserva tu vuelo
                                </button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">
                                    Ofertas y destinos
                                </button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">
                                    Tu reserva
                                </button>
                                <button style={{ fontWeight: 'bold' }} className="header-button">
                                    Información y ayuda
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    style={{ fontWeight: 'bold' }}
                                    className={`header-button ${tripType === 'roundTrip' ? 'selected' : ''}`}
                                >
                                    <span className="material-symbols-outlined header-button-icon-numbers">
                                        looks_one
                                    </span>
                                    Selección de Vuelos
                                </button>

                                <button
                                    style={{ fontWeight: 'bold' }}
                                    className={`header-button ${tripType === 'oneWay' ? 'selected' : ''}`}
                                >
                                    <span className="material-symbols-outlined header-button-icon-numbers">
                                        looks_two
                                    </span>
                                    Personaliza tu viaje
                                </button>

                                <button
                                    style={{ fontWeight: 'bold' }}
                                    className={`header-button ${tripType === 'payments' ? 'selected' : ''}`}
                                >
                                    <span className="material-symbols-outlined header-button-icon-numbers">
                                        looks_3
                                    </span>
                                    Pagos
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="container">
                <form className="form-container" id="flightForm" onSubmit={handleSearch}>
                    <div className="input-container">
                        <label htmlFor="origin">Desde</label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={originCity}
                            onChange={handleOriginChange}
                            autoComplete="off"
                            list="cityList"
                        />
                        <datalist id="cityList">
                            {filteredCities.map((city) => (
                                <option key={city.id} value={city.city} />
                            ))}
                        </datalist>
                    </div>

                    <div className="input-container">
                        <label htmlFor="destination">Hasta</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={destinationCity}
                            onChange={handleDestinationChange}
                            autoComplete="off"
                            list="cityListDestination"
                        />
                        <datalist id="cityListDestination">
                            {filteredCities.map((city) => (
                                <option key={city.id} value={city.city} />
                            ))}
                        </datalist>
                    </div>

                    <button type="submit">Buscar</button>
                    {/* Botón "Modificar Búsqueda" */}
                    <button
                        type="button"
                        className="modify-search-button"
                        style={{ display: showModifySearch ? 'inline-block' : 'none' }}
                    >
                        Modificar
                    </button>
                </form>
            </div>

            {/* Espacio adicional para separar los componentes */}
            <div style={{ height: '50px' }} />

            {/* Renderiza el componente VerPrecios */}
            <VerPrecios />
        </div>
    );
};

export default VerVuelos;
