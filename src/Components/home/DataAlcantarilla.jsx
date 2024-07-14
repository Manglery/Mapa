import React, { useEffect, useState } from 'react';
import UpdateAlcantarilla from './crud/UpdateAlcantarilla';
import './homeStyle/DataAlcantarilla.css';
import axios from 'axios';
import config from '../../utils/getToken';
import CardAlcantarilla from './CardAlcantarilla';

const DataAlcantarilla = ({
  selectAlcantarilla,
  setViewContainer,
}) => {
  const [alcantarilla, setAlcantarilla] = useState();
  const [viewCard, setViewCard] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/alcantarilla/${
      selectAlcantarilla.id
    }`;

    axios.get(url, config).then((res) => {
      setAlcantarilla(res.data.alcantarilla);
    });
  }, [viewCard]);

  console.log(alcantarilla);
  return (
    <div className="DataAlcantarilla_container">
      <section className="DataAlcantarilla_sectionOne">
        <h1 onClick={() => setViewContainer('map')}>
          <i className="bx bx-arrow-back"></i> VER MAPA
        </h1>
      </section>
      {alcantarilla?.status === 'disable' && viewCard === false && (
        <UpdateAlcantarilla
          alcantarilla={alcantarilla}
          setViewCard={setViewCard}
        />
      )}
      {alcantarilla?.status === 'active' && (
        <CardAlcantarilla alcantarilla={alcantarilla} />
      )}
    </div>
  );
};

export default DataAlcantarilla;
