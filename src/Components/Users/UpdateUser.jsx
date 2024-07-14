import React from 'react';
import config from '../../utils/getToken';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateUser = ({ setcrud, selectUser }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/${
      selectUser.id
    }`;
    axios
      .patch(url, data, config)
      .then((res) => {
        setcrud('');
        toast.success('El usuario se edito exitosamente');
        reset();
      })
      .catch((err) => {
        toast.error(
          'Hubo un error al editar al usuario,  verifique bien los datos'
        );
      });
  };

  return (
    <div className="crudPop__container">
      <form
        onSubmit={handleSubmit(submit)}
        className="crudPop__formContainer"
      >
        <h2>EDITAR USUARIO</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">Nombre *</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              required
              defaultValue={selectUser?.name}
            />
          </div>{' '}
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="last_name">Apellidos *</label>
            <input
              {...register('last_name')}
              id="last_name"
              type="text"
              required
              defaultValue={selectUser.last_name}
            />
          </div>
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="role">Rol *</label>
            <select
              {...register('role')}
              id="role"
              defaultValue={selectUser.role}
            >
              <option value="">Elija un Rol</option>
              <option value="admin"> Administrador</option>
              <option value="user">Usuario</option>{' '}
              <option value="operario">Operario</option>
            </select>
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button
            type="button"
            onClick={() => {
              setcrud(''), reset();
            }}
          >
            CANCELAR
          </button>{' '}
          <button type="submit">EDITAR</button>
        </section>
      </form>
    </div>
  );
};

export default UpdateUser;
