import React, { useState } from 'react';
import './hooksStyle/SelectOption.css';

const SelectOption = ({
  span,
  options,
  opntionPlusData,
  selectOption,
  setSelectOption,
}) => {
  const [viewOptions, setViewOptions] = useState(false);

  console.log(selectOption);
  return (
    <>
      {opntionPlusData ? (
        <article className="SelectOption__container">
          <div
            className="SelectOption__select"
            style={{ height: '55px' }}
            onClick={() => {
              setViewOptions(!viewOptions);
            }}
          >
            {!selectOption ? (
              <span>{span}</span>
            ) : (
              <p className="SelectOption__textOption">
                {selectOption?.typeRoom}{' '}
                <sub>
                  {`Cama doble grande:${selectOption?.largeDoubleBed},  Cama doble${selectOption?.doubleBed}, Cama individual${selectOption?.individualBed}, personas:${selectOption.numberPeoples}`}
                </sub>
              </p>
            )}
            <img src="./icons/arrowBottom.svg" alt="" />
          </div>
          {viewOptions ? (
            <ul>
              {opntionPlusData?.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectOption(option);
                    setViewOptions(false);
                  }}
                  className="SelectOption__textOption"
                >
                  {option?.typeRoom}{' '}
                  <sub>{`Cama doble grande:${option?.largeDoubleBed},  Cama doble${option?.doubleBed}, Cama individual${option?.individualBed}, personas:${option.numberPeoples}`}</sub>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ) : (
        <article className="SelectOption__container">
          <div
            className="SelectOption__select"
            onClick={() => {
              setViewOptions(!viewOptions);
            }}
          >
            {!selectOption ? (
              <span>{span}</span>
            ) : (
              <p>{selectOption}</p>
            )}
            <img src="./icons/arrowBottom.svg" alt="" />
          </div>
          {viewOptions ? (
            <ul>
              {options?.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectOption(option);
                    setViewOptions(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      )}
    </>
  );
};

export default SelectOption;
