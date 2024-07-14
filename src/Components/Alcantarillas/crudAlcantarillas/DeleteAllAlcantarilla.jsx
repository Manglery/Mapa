import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import config from '../../../utils/getToken';
import Loading from '../../../hooks/Loading';

const DeleteAllAlcantarilla = ({ setcrud }) => {
  const [loading, setloading] = useState();
  const handleDelete = () => {
    setloading(true);
    const url = `${import.meta.env.VITE_URL_API}/alcantarilla/delete`;

    axios
      .delete(url, config)
      .then((res) => {
        setloading(false);
        setcrud('');
        toast.success('Las alcantarillas se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar Las alcantarillas');
      });
  };

  return (
    <div className="crudPop__container">
      {loading && <Loading />}

      <div className="crudPop__formContainer">
        <h2>
          ¿Está seguro que quiere eliminar todas las alcantarillas?
        </h2>

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

export default DeleteAllAlcantarilla;
