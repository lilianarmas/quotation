import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getDiffYear, getPlan, calculateBrand } from '../helper';

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const Radio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26c6da;
        cursor: pointer;
    }
`;

const Error = styled.div`
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
`;

const Form = ({ setSummary, setLoading }) => {

    const [ data, setData ] = useState({
        brand: '',
        year: '',
        plan: ''
    });
    const [ error, setError ] = useState(false);

    // extraer los valores del state
    const { brand, year, plan } = data;

    // leer datos del formulario y colocarlos en el state
    const getInformation  = e => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    // Generar cotizacion
    const calculateQuoteAmount = e => {
        e.preventDefault();

        //Validar formulario
        if(brand.trim() === '' || year.trim() === '' || plan.trim() === '') {
            setError(true);
            return;
        }

        setError(false);

        // Una base de 2000
        let result = 2000;

        // obtener la diferencia de años
        const diff = getDiffYear(year);

        // por cada año hay que restar el 3%
        result -= (( diff * 3 ) * result) / 100;

        // Americano 15
        // Asiatico 5%
        // Europeo 30%
        result *= calculateBrand(brand);

        // Basíco aumenta 20%
        // Completo 50%
        const incPlan = getPlan(plan);
        result = parseFloat(incPlan * result).toFixed(2);

        // Activa el Sppiner
        setLoading(true);

        setTimeout(() => {

            // Desactiva el Spinner
            setLoading(false);

            // Pasa el resultado al cmmponente principal
            setSummary({
                quotation: Number(result),
                data
            });
        }, 2000);
    }

    return (
        <form
            onSubmit={calculateQuoteAmount}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null }
            <Field>
                <Label>Marca</Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getInformation}
                >
                    <option value="">--Seleccione--</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Field>

            <Field>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getInformation}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>

            <Field>
                <Label>Plan</Label>
                <Radio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={getInformation}
                /> Básico

                <Radio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={getInformation}
                /> Completo
            </Field>

            <Button type="submit">Cotizar</Button>
        </form>
    );
}

Form.propTypes = {
    setSummary: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired
}

export default Form;
