import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Form from './components/Form';
import Summary from './components/Summary';
import Result from './components/Result';
import Spinner from './components/Spinner';

const Container = styled.header`
    max-width: 600px;
    margin: 0 auto;
`;

const FormContainer = styled.div`
    background-color: #fff;
    padding: 3rem;
`;

const App = () => {

    const [ summary, setSummary ] = useState({
        quotation: 0,
        data: {
            brand: '',
            year: '',
            plan: ''
        }
    });

    const [ loading, setLoading ] = useState(false);

    const { quotation, data } = summary;

    return (
        <Container>
            <Header
                title='Cotizador de Seguros'
            />

            <FormContainer>
                <Form
                    setSummary={setSummary}
                    setLoading={setLoading}
                />

                { loading ? <Spinner /> : null }

                <Summary
                    data={data}
                />

                { !loading ?
                    <Result
                        quotation={quotation}
                    />
                :
                    null
                }
            </FormContainer>
        </Container>
    );
}

export default App;
