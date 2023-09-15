import React from 'react';
import {BiSolidPhoneCall} from "react-icons/bi"

const NotificacaoChamada = (props) => {
    if(!props.chamada){
        return null
    }
    return (
        <div className='fixed inline-flex bottom-3 right-3 bg-slate-800 text-white p-3 rounded-md shadow-sm'>
            <h3>Chamada em progresso... {Math.floor(props.tempo / 60)}:{(props.tempo % 60).toFixed(0).padStart(2, '0')}</h3>
            <BiSolidPhoneCall className='mt-1'></BiSolidPhoneCall>
            
        </div>
    );
};

export default NotificacaoChamada;