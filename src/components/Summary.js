import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { firstLetterUppercase } from '../helper';

const ContainerSummary = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: #fff;
    margin-top: 1rem;
`;

const Summary = ({ data }) => {

    // extraer datos
    const { brand, year, plan } = data;

    if(brand === '' || year === '' || plan === '') return null;

    return (
        <ContainerSummary>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: { firstLetterUppercase(brand) }</li>
                <li>Plan: { firstLetterUppercase(plan) }</li>
                <li>Año del Auto: {year}</li>
            </ul>
        </ContainerSummary>
    );
}

Summary.propTypes = {
    data: PropTypes.object.isRequired
}

export default Summary;
