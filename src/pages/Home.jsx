import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../utils/getToken';
import DataAlcantarilla from '../Components/home/DataAlcantarilla';
import './pagesStyle/home.css';
import CreateAlcantarilla from '../Components/home/crud/CreateAlcantarilla';

const Home = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectAlcantarilla, setSelectAlcantarilla] = useState(null);
  const [allAlcantarillas, setAllAlcantarillas] = useState([]);
  const [viewContainer, setViewContainer] = useState('map');
  const [newLatitude, setNewLatitude] = useState(null);
  const [newLongitude, setNewLongitude] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/alcantarilla`;

    axios.get(url, config).then((res) => {
      setAllAlcantarillas(res.data.alcantarillas);
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  async function initMap() {
    const { AdvancedMarkerElement, PinElement } =
      await google.maps.importLibrary('marker');
    const { Map, InfoWindow } = await google.maps.importLibrary(
      'maps'
    );

    const map = new Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: latitude, lng: longitude },
      mapId: '4504f8b37365c3d0',
    });

    const infoWindow = new InfoWindow();

    const pinBackground = new PinElement({
      background: '#0c84c9',
      borderColor: '#0c84c9',
      glyph: `U`,
    });

    const markerViewBackground = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      content: pinBackground.element,
      title: 'Mi ubicación',
      gmpClickable: true,
    });

    markerViewBackground.addListener(
      'click',
      ({ domEvent, latLng }) => {
        infoWindow.close();
        infoWindow.setContent(markerViewBackground.title);
        infoWindow.open(
          markerViewBackground.map,
          markerViewBackground
        );
      }
    );

    const loadVisibleAlcantarillas = () => {
      const bounds = map.getBounds();
      const zoomLevel = map.getZoom();

      if (!bounds || zoomLevel < 3) {
        return;
      }

      const visibleAlcantarillas = allAlcantarillas.filter(
        (alcantarilla) => {
          const lat = Number(alcantarilla.latitud);
          const lng = Number(alcantarilla.longitud);
          const alcLatLng = new google.maps.LatLng(lat, lng);
          return bounds.contains(alcLatLng);
        }
      );

      map.data.forEach((feature) => {
        map.data.remove(feature);
      });

      visibleAlcantarillas.forEach((alcantarilla) => {
        const activeAlcantarrilla = new PinElement({
          glyph: `A`,
          background: '#0c84c9',
          borderColor: '#0c84c9',
        });
        const lat = Number(alcantarilla.latitud);
        const lng = Number(alcantarilla.longitud);
        const marker = new AdvancedMarkerElement({
          position: { lat, lng },
          map,
          title: alcantarilla.elem_id,
          content:
            alcantarilla.status === 'active'
              ? activeAlcantarrilla.element
              : null,
        });

        marker.addListener('click', () => {
          setSelectAlcantarilla(alcantarilla);
          setViewContainer('update');
        });
      });
    };

    map.addListener('idle', loadVisibleAlcantarillas);

    const addButton = (text, onClick) => {
      const button = document.createElement('button');
      const icon = document.createElement('i');

      icon.classList.add(
        'bx',
        'bx-current-location',
        'bx-rotate-270'
      ); // Añadir clases de Boxicons

      button.appendChild(icon); // Agregar el icono como hijo del botón
      button.appendChild(document.createTextNode(text)); // Agregar el texto como nodo de texto del botón
      button.classList.add('custom-map-control-button'); // Asegúrate de que el nombre de la clase sea correcto

      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        button
      );
      button.addEventListener('click', onClick);
    };

    addButton('', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            map.setCenter({ lat: userLatitude, lng: userLongitude });
            map.setZoom(15);
          },
          (error) => {
            console.error(
              'Error al obtener la geolocalización:',
              error
            );
          }
        );
      } else {
        console.error(
          'Geolocalización no soportada por el navegador.'
        );
      }
    });

    // Variables para el manejo de la presión larga
    let pressTimer;
    let isLongPress = false;
    let marker; // Variable para almacenar el marcador

    // Función para agregar un marcador
    const addMarker = (latLng) => {
      if (marker) {
        marker.setMap(null); // Eliminar el marcador existente
      }
      marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Nuevo marcador',
      });
      setNewLatitude(latLng.lat());
      setNewLongitude(latLng.lng());
    };

    // Eventos de mousedown y mouseup
    map.addListener('mousedown', (e) => {
      isLongPress = false;
      pressTimer = setTimeout(() => {
        isLongPress = true;
        addMarker(e.latLng);
      }, 500);
    });

    map.addListener('mouseup', () => {
      clearTimeout(pressTimer);
    });

    return () => {
      google.maps.event.clearListeners(map, 'idle');
      google.maps.event.clearListeners(map, 'mousedown');
      google.maps.event.clearListeners(map, 'mouseup');
    };
  }

  useEffect(() => {
    if (
      latitude &&
      longitude &&
      allAlcantarillas &&
      viewContainer === 'map'
    ) {
      initMap();
    }
  }, [latitude, longitude, allAlcantarillas, viewContainer]);

  return (
    <div className="home_container">
      {viewContainer === 'map' && (
        <section className="page_sectionOne">
          <h1>INICO</h1>
          <button onClick={() => setViewContainer('create')}>
            Agregar Alcantarilla
          </button>
        </section>
      )}
      {viewContainer === 'map' && (
        <section className="home_sectionOne">
          <div id="map" className="Home_map_container"></div>
        </section>
      )}
      {viewContainer === 'update' && (
        <DataAlcantarilla
          selectAlcantarilla={selectAlcantarilla}
          setViewContainer={setViewContainer}
        />
      )}
      {viewContainer === 'create' && (
        <CreateAlcantarilla
          setViewContainer={setViewContainer}
          newLongitude={newLongitude}
          newLatitude={newLatitude}
        />
      )}
    </div>
  );
};

export default Home;
