import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import { Formulario } from './components/Formulario';
import { Cotizacion } from './components/Cotizacion';
import { Spinner } from './components/Spinner';

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media(min-width:992px){
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap:2rem;
}
`;
const Imagen = styled.img`
max-width:100%;
margin-top:3rem;
max-heigth:70%
`;

const Heading = styled.h1`
font-family: 'Bebas Neue', cursive;
color: #fff;
text-align:left;
font-weigth:700;
font-size:50px;
margin-bottom:50px;
margin-top:40px;

&::after{
    content: '';
    width:100px;
    height:6px;
    background-color:#66A2FE;
    display:block;
}
`;
export const CriptoApp = () => {
    
    const [stateResutadoCotizacion, setstateResutadoCotizacion] = useState({});
    const [stateDatosACotizar, setStateDatosACotizar] = useState({moneda: '', cripto: ''});
    const { moneda, cripto } = stateDatosACotizar;

    const guardarDatosCotizacion = (moneda, cripto) => {
        setStateDatosACotizar({
            moneda,
            cripto
        });
    }

    const [loading, setloading] = useState(false);

    //Api cotizacion
    const consultaCotizacionApi = async() => {
        
        setloading(true);

        const urlApi = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`; 
    
        const request = await fetch(urlApi);
        const response = await request.json();
        setstateResutadoCotizacion(response.DISPLAY[cripto][moneda]);

        setTimeout(() => {
            setloading(false);
        }, 3000);
        
    
    } 
    
    useEffect(()=> {

        if(moneda === '' || cripto=== '') return;
        consultaCotizacionApi();

    
    }, [moneda, cripto]);

    return (
        <Contenedor>
            <div>
                <Imagen src={imagen} alt="imagen cripto"/>
            </div>
            <div>
                <Heading>Cotizador de criptomonedas</Heading>
                <Formulario guardarDatosCotizacion={guardarDatosCotizacion}/>
                {
                    (!loading) ? <Cotizacion cotizacion={stateResutadoCotizacion}/>

                    : <Spinner/>
                }
                
            </div>
        </Contenedor>
    )
}
