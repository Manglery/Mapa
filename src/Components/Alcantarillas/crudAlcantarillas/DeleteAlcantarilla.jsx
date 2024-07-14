import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';

const DeleteAlcantarilla = ({ setcrud, selectedAlcantarilla }) => {
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/alcantarilla/${
      selectedAlcantarilla.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('La alcantarilla se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar La alcantarilla');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere eliminar?</h2>

        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud()}>
            Cancelar
          </button>
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
        </section>
      </div>
    </div>
  );
};

export default DeleteAlcantarilla;
