import React, { useState } from 'react';
import config from '../../utils/getToken';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../hooks/Loading';

const UploadExel = ({ setcrud }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('exel', data.exel[0]);

    const url = `${import.meta.env.VITE_URL_API}/alcantarilla/exel`;
    axios
      .post(url, formData, config)
      .then((res) => {
        setcrud('');
        toast.success('El archivo se subió exitosamente');
        reset();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(
          'Hubo un error al subir el archivo, verifique bien los datos'
        );
      });
  };

  return (
    <div className="crudPop__container">
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit(submit)}
        className="crudPop__formContainer"
      >
        <h2>SUBIR ARCHIVO EXCEL</h2>
        <section className="crudPopForm__sectionOne">
          <div className="crudPopForm__sectionOne__div">
            <label htmlFor="exel">Seleccione un archivo *</label>
            <input
              {...register('exel')}
              id="exel"
              type="file"
              accept=".xlsx, .xls"
              required
            />
          </div>
        </section>
        <section className="crudPopForm__sectionButtons">
          <button type="button" onClick={() => setcrud('')}>
            CANCELAR
          </button>
          <button type="submit">SUBIR</button>
        </section>
      </form>
    </div>
  );
};

export default UploadExel;
