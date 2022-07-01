import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';
import { FabricContext } from '../../context/FabricContext';

const supportedImageTypes = [
  'image/png',
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/x-icon',
  'image/jpeg'
];

const FabricImage = () => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = event => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const { canvas } = useContext(FabricContext);

  const onImageUpload = e => {
    const formData = new FormData();
    formData.append('asset', selectedFile);
    formData.append('userId', 'userexampol');
    formData.append('title', 'taitelexampol');
    formData.append('category', 'categoriexampol');

    fetch('http://localhost:9000/api/assets/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <button onClick={onImageUpload}>Add Custom Asset</button>
      <input
        type='file'
        name='asset'
        id='fabric-image-upload'
        accept='image/*'
        onChange={changeHandler}
        //style={{ display: 'none' }}
      />
    </>
  );
};

export default FabricImage;
