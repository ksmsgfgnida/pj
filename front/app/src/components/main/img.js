import React from 'react';
import Image from 'react-bootstrap/Image';
import main from '../../assets/main.png'

function ImageMain() {
  return (
    <div>
      <Image style={{ width: '100%', height: '100%' }} src={main} ></Image>
    </div>
)
}

export default ImageMain;