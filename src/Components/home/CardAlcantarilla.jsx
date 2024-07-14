import React from 'react';
import './homeStyle/CardAlcantarilla.css';

const CardAlcantarilla = ({ alcantarilla }) => {
  return (
    <div className="CardAlcantarilla_container">
      <section className="CardAlcantarilla_sectionOne">
        <h2>Datos de la alcantarilla</h2>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>COD:</p>
          <span>{alcantarilla?.cod}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>ENTIDAD:</p>
          <span>{alcantarilla?.entidad}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>GESTION:</p>
          <span>{alcantarilla?.gestion}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>TIPO:</p>
          <span>{alcantarilla?.tipo}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>ELEM_ID:</p>
          <span>{alcantarilla?.elem_id}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>ID_ACCIONA:</p>
          <span>{alcantarilla?.id_acciona}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>FECHA:</p>
          <span>{alcantarilla?.fecha}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>ESTADO:</p>
          <span>{alcantarilla?.estado}</span>
        </div>
        {alcantarilla?.estado === 'Realizado' && (
          <div className="CardAlcantarilla_sectionOne_div">
            <p>REALIZADO:</p>
            <span>{alcantarilla?.realizado}</span>
          </div>
        )}
        {alcantarilla?.estado === 'Impedido' && (
          <div className="CardAlcantarilla_sectionOne_div">
            <p>IMPEDIDO:</p>
            <span>{alcantarilla?.impedido}</span>
          </div>
        )}
        {alcantarilla?.estado === 'Imposibilidad Tca' && (
          <div className="CardAlcantarilla_sectionOne_div">
            <p>IMP. TÉCNICA :</p>
            <span>{alcantarilla?.imp_tecnica}</span>
          </div>
        )}
        <div className="CardAlcantarilla_sectionOne_div">
          <p>NUM_REJ:</p>
          <span>{alcantarilla?.numero_rej}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>LONGITUD ARQUETA:</p>
          <span>{alcantarilla?.longitud_arqueta}</span>
        </div>{' '}
        <div className="CardAlcantarilla_sectionOne_div">
          <p>Cod. Empresa:</p>
          <span>{alcantarilla?.cod_empresa}</span>
        </div>{' '}
        <div className="CardAlcantarilla_sectionOne_div">
          <p>X:</p>
          <span>{alcantarilla?.x}</span>
        </div>{' '}
        <div className="CardAlcantarilla_sectionOne_div">
          <p>Y:</p>
          <span>{alcantarilla?.y}</span>
        </div>{' '}
        <div className="CardAlcantarilla_sectionOne_div">
          <p>longitud:</p>
          <span>{alcantarilla?.longitud}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>latitud:</p>
          <span>{alcantarilla?.latitud}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>foto1:</p>
          <img
            src={`${import.meta.env.VITE_URL_IMG}/${
              alcantarilla.foto1
            }`}
            alt=""
          />{' '}
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>foto2:</p>
          <img
            src={`${import.meta.env.VITE_URL_IMG}/${
              alcantarilla.foto2
            }`}
            alt=""
          />{' '}
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>Operario Asigando:</p>
          <span>{alcantarilla?.operario_asignado}</span>
        </div>
        <div className="CardAlcantarilla_sectionOne_div">
          <p>Usuario:</p>
          <span>{alcantarilla?.user.user_name}</span>
        </div>
      </section>
    </div>
  );
};

export default CardAlcantarilla;
