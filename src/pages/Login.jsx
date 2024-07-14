import React, { useState } from 'react';
import './pagesStyle/Login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, seterror] = useState();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}/user/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        const userDataJSON = JSON.stringify(res.data.user);
        localStorage.setItem('userData', userDataJSON);

        navigate('/');
        window.location.reload();
      })

      .catch((err) => {
        seterror(err.response.data.message);
      });

    reset();
  };
  return (
    <div className="Login_container">
      <section className="Login_sectionOne">
        <img src="./logo.png" alt="" />

        <h1>INICIAR SESION</h1>
        <form
          className="Login_sectionOne_form"
          onSubmit={handleSubmit(submit)}
        >
          <div className="Login_sectionOne_form_div">
            <label htmlFor="user_name">Usuario:</label>
            <input
              {...register('user_name')}
              id="user_name"
              type="text"
              required
              placeholder="Ingrese su usuario"
            />
          </div>
          {error && (
            <span className="Login_sectionOne_form_error">
              {' '}
              {error}
            </span>
          )}
          <div className="Login_sectionOne_form_div">
            <label htmlFor="password">Contraseña:</label>
            <input
              {...register('password')}
              id="password"
              type="password"
              required
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button className="Login_sectionOne_form_button">
            Iniciar sesión
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
