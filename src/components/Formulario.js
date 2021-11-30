import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { useMoneda } from '../Hooks/useMoneda';
import { useCripto } from '../Hooks/useCripto';
import Swal from 'sweetalert2';

const Boton = styled.input`
margin:auto;
margin-top:20px;
font-weight:bold;
font-size:20px;
padding:10px;
background-color:#66a2fe;
border:none;
width:100%;
border-radius:10px;
color:#fff;
transition:background-color .3s ease;

&:hover{
    background-color:#326AC0;
    cursor:pointer; 
}
`;

const monedas = [
    {codigo: 'ARS', nombre: 'Peso Argentino'},
    {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'EUR', nombre: 'Euro'}
];
export const Formulario = ({guardarDatosCotizacion}) => {

    const [stateListaCripto, setStateListaCripto] = useState([]);
    const [monedaState, SelectMoneda] = useMoneda('Elige la moneda', '' ,monedas);
    const [criptoState, SelectCripto] = useCripto('Elige la criptomoneda', '', stateListaCripto);

    //API de Criptos
    useEffect(()=>{
        const consultarApi = async() => {

            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const request = await fetch(url);
            const response = await request.json();

            //setStateListaCripto(response.data.Data);
            setStateListaCripto(response.Data);
        }

        consultarApi();
    }, []); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if(monedaState === '' || criptoState === ''){
            return  Swal.fire('Error', 'Completa todos los campos', 'error');
        }

        guardarDatosCotizacion(monedaState, criptoState);
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
          <SelectMoneda/>
          <SelectCripto/>
          <Boton type="submit" value="CALCULAR"/>
        </form>
        <br/><br/>
        </>
    )
}
