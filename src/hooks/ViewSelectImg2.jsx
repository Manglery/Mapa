import { useState } from 'react';

const ViewSelectImg2 = ({ idElementImg2 }) => {
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedFileImg2, setSelectedFileImg2] = useState(null);

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    setSelectedImage2(URL.createObjectURL(file));
    setSelectedFileImg2(file);
  };

  const handleOnClickImg2 = () => {
    document.getElementById(idElementImg2).click();
  };

  const deleteSelectImgClick2 = () => {
    setSelectedImage2(null);
    setSelectedFileImg2(null);
  };

  return {
    selectedImage2,
    selectedFileImg2,
    handleImageChange2,
    handleOnClickImg2,
    deleteSelectImgClick2,
  };
};

export default ViewSelectImg2;
