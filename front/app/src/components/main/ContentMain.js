import React from 'react';

import Image from 'react-bootstrap/Image';

import rightIcon from "../../assets/Значсправа.svg";
import leftIcon from "../../assets/Значслева.svg";
import { NavLink } from 'react-router-dom';
import { CATALOG_ROUTE } from '../../utils/consts';

const ContentMain = () => {
    
    return (
    <>
        <div className='contentMain'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Ароматы</h1>
                <h1>Ручной работы</h1>
                <hr style={{marginLeft: 'auto', marginRight: 'auto', borderWidth: '0.2vw', color: '#fff', borderColor:'#fff'}}></hr>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <Image width={'10%'} height={'10%'} src={leftIcon} style={{marginRight: '3%'}} />
                <NavLink style={{margin: '0', color:'#2FF5FF'}} to={CATALOG_ROUTE}>Выбрать аромат</NavLink>
                <Image width={'10%'} height={'10%'} src={rightIcon} style={{marginLeft: '3%'}} />
            </div>
        </div>
    </>
)
};

export default ContentMain;