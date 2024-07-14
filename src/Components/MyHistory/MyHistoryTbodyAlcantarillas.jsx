import React from 'react';

const MyHistoryTbodyAlcantarillas = ({
  currentData,
  startIndex,
  dataUser,
}) => {
  return (
    <tbody>
      {currentData?.map((alcantarilla, index) => (
        <tr key={alcantarilla.id}>
          <td>{startIndex + index + 1}</td>
          <td>{alcantarilla.cod}</td>
          <td>{alcantarilla.entidad}</td>
          <td>{alcantarilla.gestion}</td>
          <td>{alcantarilla.tipo}</td>
          <td>{alcantarilla.elem_id}</td>
          <td>{alcantarilla.id_acciona}</td>
          <td>{alcantarilla.fecha}</td>
          <td>{alcantarilla.estado}</td>
          <td>{alcantarilla.realizado}</td>
          <td>{alcantarilla.impedido}</td>
          <td>{alcantarilla.imp_tecnica}</td>
          <td>{alcantarilla.numero_rej}</td>
          <td>{alcantarilla.longitud_arqueta}</td>
          <td>{alcantarilla.cod_empresa}</td>
          <td>{alcantarilla.x}</td>
          <td>{alcantarilla.y}</td>
          <td>{alcantarilla.longitud}</td>
          <td>{alcantarilla.latitud}</td>
          <td>
            <img
              src={`${import.meta.env.VITE_URL_IMG}/${
                alcantarilla.foto1
              }`}
            />
          </td>
          <td>
            <img
              src={`${import.meta.env.VITE_URL_IMG}/${
                alcantarilla.foto2
              }`}
            />{' '}
          </td>
          <td>{alcantarilla.operario_asignado}</td>
          <td>{dataUser?.user_name}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default MyHistoryTbodyAlcantarillas;
