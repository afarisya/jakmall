import styled, {css} from 'styled-components'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardHeader, CardTitle } from "../Card";
import { Form } from '../Form';
import { Col, Row } from '../Layout';
import Summary from '../Order/Summary';
import { useLocation, useNavigate } from 'react-router';
import { Text, TextGrey } from '../Text';
import { 
    getAllPrevPathsData, 
    getPageDataFromSessioStorage, 
    getPrevPath, 
    isPreviousPageDataValid, 
    removeAllPageDataFromSessioStorage, 
    savePageDataToSessioStorage } from '../../utils';

const detailsStyles = css`
    position: relative;
    padding-top: 121px;
    padding-bottom: 121px;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 1px;
        background-color: var(--orange);
        opacity: 0.2;
    }
`

const Container = styled.div`
    width: fit-content;
    margin: auto;

    & > * {
        width: fit-content;
    }
`;

const LinkHomepage = styled.div`
    margin-top: 50px;
    cursor: pointer;

    .icon {
        font-size: 20px;
        margin-right: 10px;
    }
`;

function Finish() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [orderId, setOrderId] = useState("");

    const {
        reset,
        watch
    } = useForm();

    const values = watch();
    
    const [prevStepsData, setPrevStepsData] = useState({});

    useEffect(() => {
        if ( !isPreviousPageDataValid(path) ) {
            const prevPath = getPrevPath(path);
            if ( prevPath !== null && prevPath !== undefined ) {
                navigate(prevPath);
                return;
            }
        }

        // get previous steps data
        setPrevStepsData(getAllPrevPathsData(path));

        const defaultValues = getPageDataFromSessioStorage(path);
        reset(defaultValues);

        setOrderId(random5AlphanumString());
    }, []);
    
    useEffect(() => {
        savePageDataToSessioStorage(path, values);
    }, [values]);

    const random5AlphanumString = () => {
        const length = 5;
        var accepted_chars = "23456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
        var result = '';
        for (var i = length; i > 0; --i) result += accepted_chars[Math.floor(Math.random() * accepted_chars.length)];
        return result;
    }

    const handleBackToHomepageClick = () => {
        removeAllPageDataFromSessioStorage();
        navigate("/");
    }

    const { 
        shipment=null
    } = prevStepsData;
    
    let shipment_parsed = {};
    if ( shipment !== null ) {
        shipment_parsed = JSON.parse(shipment);
    }

    return (
        <>
            <Form>
                <Row>
                    <Col size={9} styles={detailsStyles}>
                        <Container>
                            <CardHeader>
                                <CardTitle>Thank you</CardTitle>
                            </CardHeader>
                            <Text className="mb-5">Order ID : {orderId}</Text>
                            <TextGrey>Your order will be delivered {shipment_parsed.est} with {shipment_parsed.name}</TextGrey>
                            <LinkHomepage onClick={handleBackToHomepageClick}><span className="icon">&#8592;</span>Go to homepage</LinkHomepage>
                        </Container>
                    </Col>
                    <Col size={3}>
                        <Summary data={prevStepsData} showButton={false} /> 
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Finish;