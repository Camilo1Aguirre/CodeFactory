// VerPrecios.tsx
import React, { useEffect, useState } from 'react';
import { GET } from '../utils/api'; // Url temporal

interface Flight {
    id: number;
    hora_ida: string;
    hora_vuelta: string;
    precio: number;
}

const VerPrecios: React.FC = () => {
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await GET('http://localhost:8080/api/flights'); // Url temporal
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional" />
            {/* Renderización de vuelos */}
            <div className="container">
                {flights.map((flight, index) => (
                    <div key={index} className="flight-option" style={{ marginBottom: '20px' }}>
                        <div className="best-price">MEJOR PRECIO</div>
                        <div>
                            <div className="departure-time">{flight.hora_ida}</div>
                            <div className="airport-codes">BOG</div>
                        </div>
                        <div className="flight-separator">
                            <div className="flight-separator.left"></div>
                        </div>
                        <div className="separator-div">
                            <span className="material-symbols-outlined">flight_takeoff</span>
                        </div>
                        <div className="flight-separator">
                            <div className="flight-separator.left"></div>
                        </div>
                        <div>
                            <div className="arrival-time">{flight.hora_vuelta}</div>
                            <div className="airport-codes">MDE</div>
                        </div>
                        <div>
                            <div className="price">
                                <div className="left-border"></div>
                                {flight.precio} COP
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Espacio adicional para separar los componentes */}
            <div style={{ height: '50px' }} />
        </div>
    );
};

export default VerPrecios;
