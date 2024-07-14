import React, { useState } from 'react';
import './pagesStyle/Header.css';
import { Link } from 'react-router-dom';

const Header = ({ userData }) => {
  const [viewHeader, setViewHeader] = useState(false);
  const [viewMain, setviewMain] = useState(false);

  console.log(userData);

  return (
    <header
      className="Header__container"
      onMouseOut={() => setViewHeader(false)}
      onMouseOver={() => setViewHeader(true)}
    >
      <div className="Header__buttons">
        {viewMain ? (
          <i
            className="bx bx-x"
            onClick={() => setviewMain(false)}
          ></i>
        ) : (
          <i
            className="bx bx-menu"
            onClick={() => setviewMain(true)}
          ></i>
        )}
      </div>
      {userData?.role === 'admin' ? (
        <section
          className={`Header__sectionOne  ${
            !viewMain ? 'closeMain' : ''
          }`}
        >
          <div
            className="Header_profile"
            style={viewHeader ? { opacity: '1' } : null}
          >
            <i className="bx bxs-user-circle"></i>
            <p>{userData?.name?.toUpperCase()}</p>
          </div>
          <Link to="/" onClick={() => setviewMain(false)}>
            <i className="bx bx-home"></i> <p>INICIO</p>
          </Link>
          <Link to="/datos" onClick={() => setviewMain(false)}>
            <i className="bx bx-data"></i> <p>DATOS</p>
          </Link>

          <Link to="/users" onClick={() => setviewMain(false)}>
            <i className="bx bxs-user-plus"></i> <p>USUARIOS</p>
          </Link>
          <Link to="/my-history" onClick={() => setviewMain(false)}>
            <i class="bx bx-history"></i> <p>MI HISTORIAL</p>
          </Link>
          <Link
            onClick={() => {
              localStorage.clear();
              // navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i>
            <p>CERRAR SESION</p>
          </Link>
        </section>
      ) : (
        <section
          className={`Header__sectionOne  ${
            !viewMain ? 'closeMain' : ''
          }`}
        >
          <div
            className="Header_profile"
            style={viewHeader ? { opacity: '1' } : null}
          >
            <i className="bx bxs-user-circle"></i>
            <p>{userData?.name?.toUpperCase()}</p>
          </div>
          <Link to="/" onClick={() => setviewMain(false)}>
            <i className="bx bx-home"></i> <p>INICIO</p>
          </Link>
          <Link to="/my-history" onClick={() => setviewMain(false)}>
            <i class="bx bx-history"></i> <p>MI HISTORIAL</p>
          </Link>

          <Link
            onClick={() => {
              localStorage.clear();
              // navigate('/');
              window.location.reload();
            }}
          >
            <i className="bx bxs-door-open"></i>
            <p>CERRAR SESION</p>
          </Link>
        </section>
      )}
    </header>
  );
};

export default Header;
