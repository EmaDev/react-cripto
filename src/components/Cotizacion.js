import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
color:#fff;
font-family: sans-serif;
text-align:center;
font-family: Arial, Helvetica, sans-serif;
p{
    margin:5px;
}
`;
const Parrafo = styled.p`
font-size:18px;
`;
const Precio = styled.p`
font-size:20px;
margin-bottom:10px;

span{
    font-size:30px;
    font-weight:bold;
}

`;

const VarNeg = styled.p`
color:#a70c2d;
font-size:25px;
font-weight:bold;

`;
const VarPos = styled.p`
color:#0da931;
font-size:25px;
font-weight:bold;
`;

export const Cotizacion = ({cotizacion}) => {
    
    if(Object.keys(cotizacion).length === 0) { return null;}
    
    return (
        <ResultadoDiv>
            {
                (parseFloat(cotizacion.CHANGEPCT24HOUR) < 0 ) ?
                <VarNeg>VARIACION {cotizacion.CHANGEPCT24HOUR}</VarNeg>
                :
                <VarPos>VARIACION {cotizacion.CHANGEPCT24HOUR}</VarPos>
            }
            

            <Precio>El precio es: <span>{cotizacion.PRICE}</span></Precio>
            <Parrafo>Precio mas alto del día: {cotizacion.HIGHDAY}</Parrafo>
            <Parrafo>Precio mas bajo del día: {cotizacion.LOWDAY}</Parrafo>
            
            <br/><br/>
        </ResultadoDiv>
    )
}
