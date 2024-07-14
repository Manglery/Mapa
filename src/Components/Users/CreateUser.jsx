import React from 'react';
import config from '../../utils/getToken';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateUser = ({ setcrud }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/signup`;
    axios
      .post(url, data, config)
      .then((res) => {
        setcrud('');
        toast.success('El usuario se creo exitosamente');
        reset();
      })
      .catch((err) => {
        toast.error(
          'Hubo un error al crear al usuario,  verifique bien los datos'
        );
      });
  };

  return (
    <div className="crudPop__container">
      <form
        onSubmit={handleSubmit(submit)}
        className="crudPop__formContainer"
      >
        <h2>CREAR USUARIO</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="name">Nombre *</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              required
              placeholder="Ingrese su nombre"
            />
          </div>{' '}
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="last_name">Apellidos *</label>
            <input
              {...register('last_name')}
              id="last_name"
              type="text"
              required
              placeholder="Ingrese sus apellidos"
            />
          </div>
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="dni">Dni *</label>
            <input
              {...register('dni')}
              id="dni"
              type="text"
              required
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="user_name">Usuario *</label>
            <input
              {...register('user_name')}
              id="user_name"
              type="text"
              required
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="role">Rol *</label>
            <select {...register('role')} id="role">
              <option value="">Elija un Rol</option>
              <option value="admin"> Administrador</option>
              <option value="user">Usuario</option>
              <option value="operario">Operario</option>
            </select>
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud('')}>
            CANCELAR
          </button>{' '}
          <button type="submit">REGISTRAR</button>
        </section>
      </form>
    </div>
  );
};

export default CreateUser;
