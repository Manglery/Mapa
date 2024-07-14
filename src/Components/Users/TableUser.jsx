import React from 'react';
import { Link } from 'react-router-dom';

const TableUser = ({ allUsers, setselectUser, setcrud }) => {
  return (
    <table className="table__container">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>APELLIDOS</th>
          <th>USUARIO</th>
          <th>DNI</th>
          <th>ROL</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.last_name}</td>
            <td>{user.user_name}</td>
            <td>{user.dni}</td>
            <td>{user.role}</td>

            <td className="tablle__tdButton">
              <div>
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => {
                    setcrud('update'), setselectUser(user);
                  }}
                ></i>

                <i
                  className="bx bxs-trash-alt"
                  onClick={() => {
                    setcrud('delete'), setselectUser(user);
                  }}
                ></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUser;
