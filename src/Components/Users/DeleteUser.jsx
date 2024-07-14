import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import config from '../../utils/getToken';
import { useNavigate } from 'react-router-dom';

const DeleteUser = ({ setcrud, selectUser }) => {
  console.log(selectUser);
  const navigate = useNavigate();
  const handleDelete = () => {
    const url = `${import.meta.env.VITE_URL_API}/user/${
      selectUser.id
    }`;

    axios
      .delete(url, config)
      .then((res) => {
        setcrud('');
        toast.success('El usuario se eliminó correctamente');
      })
      .catch((err) => {
        setcrud('');
        toast.error('Hubo un error al eliminar el usuario');
      });
  };

  return (
    <div className="crudPop__container">
      <div className="crudPop__formContainer">
        <h2>¿Está seguro que quiere al usuario {selectUser.name}?</h2>

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

export default DeleteUser;
