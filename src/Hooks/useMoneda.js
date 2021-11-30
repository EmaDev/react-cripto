import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
font-family: 'Bebas Neue', cursive;
color: #fff;
text-transform:uppercase;
font-weight:bold;
font-size:2.4rem;
magin-top:2rem;
display:block;
`;
const Select = styled.select`
width:100%;
display:block;
padding:1rem;
-webkit-appearance:none;
border-radius:10px;
font-size:1.1rem;
`;

export const useMoneda = (label, initialState={}, opciones) => {

    const [state, actualizarState] = useState(initialState);

    const Seleccionar = () => {
        return (

            <>
            <Label>{label}</Label>
            <Select
            onChange={e => actualizarState(e.target.value)}
            value={state}
            >
                <option value="">-- Seleccione --</option>
                {
                    opciones.map(opcion => (
                        <option
                        key={opcion.codigo}
                        value={opcion.codigo}
                        >{opcion.nombre}</option>
                    ))
                }
            </Select>
            </>
        );
    }

    return [state, Seleccionar];
}
