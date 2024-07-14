import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../utils/getToken';
import CreateUser from '../Components/Users/CreateUser';
import UpdateUser from '../Components/Users/UpdateUser';
import DeleteUser from '../Components/Users/DeleteUser';
import TableUser from '../Components/Users/TableUser';

const Users = () => {
  const [crud, setcrud] = useState();
  const [allUsers, setallUsers] = useState();
  const [selectUser, setselectUser] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/user`;

    axios.get(url, config).then((res) => {
      setallUsers(res.data.users);
    });
  }, [crud]);

  return (
    <div className="page_container">
      <section className="page_sectionOne">
        <h1>Usuarios</h1>
      </section>
      <section className="page_sectionTwo">
        <p></p>
        <button onClick={() => setcrud('create')}>
          Registrar Usuario
        </button>
      </section>
      <section className="page_sectionThree ">
        <TableUser
          allUsers={allUsers}
          setselectUser={setselectUser}
          setcrud={setcrud}
        />
      </section>
      {crud === 'create' && <CreateUser setcrud={setcrud} />}

      {crud === 'update' && (
        <UpdateUser setcrud={setcrud} selectUser={selectUser} />
      )}

      {crud === 'delete' && (
        <DeleteUser setcrud={setcrud} selectUser={selectUser} />
      )}
    </div>
  );
};

export default Users;
