import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../utils/getToken';
import TableMyHistory from '../Components/MyHistory/TableMyHistory';

const MyHistory = ({ userData }) => {
  const [viewContain, setViewContain] = useState('ot');
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user/${userData.id}`;

    axios.get(url, config).then((res) => {
      setDataUser(res.data.user);
    });
  }, [userData]);

  console.log(dataUser);

  return (
    <div className="page_container">
      <section className="page_sectionOne">
        <h1>Historial del Usuario {dataUser?.name} </h1>
      </section>

      <section className="page_sectionThree">
        <TableMyHistory
          dataUser={dataUser}
          allAlcantarillas={dataUser?.alcantarillas}
        />
      </section>
    </div>
  );
};

export default MyHistory;
