import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../utils/getToken';
import { useForm } from 'react-hook-form';
import '../homeStyle/updateAlcantarilla.css';
import soloNumeros from '../../../hooks/SoloNumeros';
import ViewSelectImg2 from '../../../hooks/ViewSelectImg2';
import ViewSelectImg from '../../../hooks/ViewSelectImg';
import { toast } from 'react-toastify';
import Loading from '../../../hooks/Loading';

const UpdateAlcantarilla = ({ alcantarilla, setViewCard }) => {
  const userDataJSON = localStorage.getItem('userData'); // Obtener la cadena JSON de localStorage
  const userData = JSON.parse(userDataJSON);
  const {
    selectedImage,
    selectedFileImg,
    handleImageChange,
    handleOnClickImg,
    deleteSelectImgClick,
  } = ViewSelectImg({ idElementImg: 'foto1' });

  const {
    selectedImage2,
    selectedFileImg2,
    handleImageChange2,
    handleOnClickImg2,
    deleteSelectImgClick2,
  } = ViewSelectImg2({ idElementImg2: 'foto2' });

  const { register, handleSubmit, reset } = useForm();
  const [selectCod, setSelectCod] = useState(null);
  const [allUsers, setallUsers] = useState();
  const [estado, setEstado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user?role=${
      selectCod === 'Acciona' ? 'user' : 'operario'
    }`;

    axios.get(url, config).then((res) => {
      setallUsers(res.data.users);
    });
  }, [selectCod]);

  const submit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('cod_empresa', data.selectCod);
    formData.append('operario_asignado', data.operario_asignado);
    formData.append('fecha', data.fecha);
    formData.append('estado', data.estado);
    formData.append('realizado', data.realizado);
    formData.append('impedido', data.impedido);
    formData.append('imp_tecnica', data.imp_tecnica);
    formData.append('numero_rej', data.numero_rej);
    formData.append('longitud_arqueta', data.longitud_arqueta);
    formData.append('usuario_id', userData?.id);

    if (selectedFileImg) {
      formData.append('foto1', selectedFileImg);
    }
    if (selectedFileImg2) {
      formData.append('foto2', selectedFileImg2);
    }

    const url = `${import.meta.env.VITE_URL_API}/alcantarilla/${
      alcantarilla?.id
    }`;
    axios
      .patch(url, formData, config)
      .then((res) => {
        toast.success('La alcantarilla se actualizo correctamente ');
        deleteSelectImgClick();
        deleteSelectImgClick2();
        setViewCard(true);
        reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          'Hubo un error al actualizar la alcantarilla,  verifique bien los datos'
        );
        setLoading(false);
      });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="UpdateAlcantarilla_container">
      {loading && <Loading />}
      <section className="UpdateAlcantarilla_sectionOne">
        <h2>Datos de la alcantarilla</h2>
        <form
          onSubmit={handleSubmit(submit)}
          className="UpdateAlcantarilla_formContainer"
        >
          <div className="UpdateAlcantarilla_formCodNombContianer">
            <div className="UpdateAlcantarilla_formCodNomb">
              <p>Cod /Nomb:</p>
              <div className="UpdateAlcantarilla_formCodNomb_buttons">
                <button
                  type="button"
                  onClick={() => setSelectCod('Acciona')}
                  style={
                    selectCod === 'Acciona'
                      ? {
                          backgroundColor: 'green',
                        }
                      : null
                  }
                >
                  Acciona
                </button>
                <button
                  type="button"
                  onClick={() => setSelectCod('Contrata1')}
                  style={
                    selectCod === 'Contrata1'
                      ? {
                          backgroundColor: 'green',
                        }
                      : null
                  }
                >
                  Contrata1
                </button>
                <button
                  type="button"
                  onClick={() => setSelectCod('Contrata2')}
                  style={
                    selectCod === 'Contrata2'
                      ? {
                          backgroundColor: 'green',
                        }
                      : null
                  }
                >
                  Contrata2
                </button>
              </div>
            </div>
            <select
              name="operario_asignado"
              id="operario_asignado"
              className="UpdateAlcantarilla_formCodNomb_select"
              {...register('operario_asignado')}
              required
            >
              <option value="0">
                seleccione al{' '}
                {selectCod === 'Acciona' ? 'Usuario' : 'Operario'}
              </option>
              {allUsers?.map((user) => (
                <option
                  key={user.id}
                  value={`${user.name} ${user.last_name}`}
                >
                  {user.name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>COD:</p>
            <span>{alcantarilla?.cod}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>ENTIDAD:</p>
            <span>{alcantarilla?.entidad}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>GESTION:</p>
            <span>{alcantarilla?.gestion}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>TIPO:</p>
            <span>{alcantarilla?.tipo}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>ELEM_ID:</p>
            <span>{alcantarilla?.elem_id}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <p>ID_ACCIONA:</p>
            <span>{alcantarilla?.id_acciona}</span>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="fecha">FECHA:</label>
            <input
              {...register('fecha')}
              id="fecha"
              type="date"
              required
              defaultValue={today}
            />
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="estado">ESTADO</label>
            <select
              {...register('estado')}
              name="estado"
              id="estado"
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="0">Seleccione el estado</option>
              <option value="Realizado">Realizado</option>
              <option value="Impedido">Impedido</option>{' '}
              <option value="Imposibilidad Tca">
                Imposibilidad Tca
              </option>
            </select>
          </div>
          {estado === 'Realizado' && (
            <div className="UpdateAlcantarilla_formDiv">
              <label htmlFor="realizado">REALIZADO</label>
              <select
                {...register('realizado')}
                name="realizado"
                id="realizado"
              >
                <option value="0">Seleccione una opcion</option>
                <option value="Sin anomalía">Sin anomalía</option>
                <option value="Rejilla Partida">
                  Rejilla Partida
                </option>
                <option value="Cerco Suelto">Cerco Suelto</option>
                <option value="Arqueta Deteriorada">
                  Arqueta Deteriorada
                </option>
                <option value="Falta Imbornal">Falta Imbornal</option>
                <option value="Falta Rejilla">Falta Rejilla</option>
                <option value="Condenado parcialmente">
                  Condenado parcialmente
                </option>
              </select>
            </div>
          )}
          {estado === 'Impedido' && (
            <div className="UpdateAlcantarilla_formDiv">
              <label htmlFor="impedido">IMPEDIDO</label>
              <select
                {...register('impedido')}
                name="impedido"
                id="impedido"
                required
              >
                <option value="0">Seleccione una opcion</option>
                <option value="Objeto encima">Objeto encima</option>
                <option value="Sellado">Sellado</option>
                <option value="Soldado">Soldado</option>
                <option value="Asfaltado">Asfaltado</option>
                <option value="Hormigonado">Hormigonado</option>
                <option value="Zona en obras">Zona en obras</option>
                <option value="Inaccesible Terreno">
                  Inaccesible Terreno
                </option>
              </select>
            </div>
          )}

          {estado === 'Imposibilidad Tca' && (
            <div className="UpdateAlcantarilla_formDiv">
              <label htmlFor="imp_tecnica">IMPOSIBILIDAD TCA</label>
              <select
                {...register('imp_tecnica')}
                name="imp_tecnica"
                id="imp_tecnica"
                required
              >
                <option value="0">Seleccione una opcion</option>
                <option value="No localizado">No localizado</option>
                <option value="Recinto Privado">
                  Recinto Privado
                </option>
              </select>
            </div>
          )}

          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="numero_rej">NUM_REJ </label>
            <input
              {...register('numero_rej')}
              id="numero_rej"
              type="number"
              required
              defaultValue={1}
            />
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="longitud_arqueta">
              LONGITUD ARQUETA *
            </label>
            <input
              {...register('longitud_arqueta')}
              id="longitud_arqueta"
              type="text"
              onKeyPress={soloNumeros}
              required
            />
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="question_image">
              Foto 1<b>*</b>
            </label>
            <div className="custom-file-input">
              <input
                id="foto1"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
              {!selectedImage ? (
                <div
                  onClick={handleOnClickImg}
                  className="custom_selecctImg"
                >
                  <i className="bx bxs-camera"></i>{' '}
                  <p>Selecciona una Imagen</p>
                </div>
              ) : (
                <div className="image__preview">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    onClick={handleOnClickImg}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="UpdateAlcantarilla_formDiv">
            <label htmlFor="question_image">
              Foto 2<b>*</b>
            </label>
            <div className="custom-file-input">
              <input
                id="foto2"
                type="file"
                accept="image/*"
                onChange={handleImageChange2}
                required
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
              {!selectedImage2 ? (
                <div
                  onClick={handleOnClickImg2}
                  className="custom_selecctImg"
                >
                  <i className="bx bxs-camera"></i>{' '}
                  <p>Selecciona una Imagen</p>
                </div>
              ) : (
                <div className="image__preview">
                  <img
                    src={selectedImage2}
                    alt="Preview"
                    onClick={handleOnClickImg2}
                  />
                </div>
              )}
            </div>
          </div>
          <section className="UpdateAlcantarilla_form_buttonsContainer">
            <button
              type="button"
              onClick={() => setcrud('')}
              className="UpdateAlcantarilla_formButton"
            >
              CANCELAR
            </button>{' '}
            <button
              type="submit"
              className="UpdateAlcantarilla_formButton"
            >
              REGISTRAR
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};
export default UpdateAlcantarilla;
