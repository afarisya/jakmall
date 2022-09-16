import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {css} from 'styled-components'
import { useForm } from 'react-hook-form';

import Summary from '../Order/Summary';
import { Col, Row } from '../Layout';
import { CardHeader, CardTitle } from "../Card";
import { Form, FormGroupRadio, FormRadio, FormLabel } from '../Form';
import { TextInfo } from '../Text';

import { 
    getAllPrevPathsData, 
    getNextPath, 
    getPageDataFromSessioStorage, 
    getPrevPath, 
    isPreviousPageDataValid, 
    savePageDataToSessioStorage, 
    setDataOfPathValid } from '../../utils';

const detailsStyles = css`
    position: relative;
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

const paddingLeftRight15 = css`
    padding-left: 15px;
    padding-right: 15px;
`

const rowStyles = css`
    margin-bottom: 30px;
`

const errorStyles = css`
    position: absolute;
    bottom: -20px;
    padding-left: 15px;
    padding-right: 15px;
`

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const values = watch();
    
    const [prevStepsData, setPrevStepsData] = useState({});

    const [shipmentList, setShipmentList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);

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

        // update form with saved data
        let defaultValues = getPageDataFromSessioStorage(path);
        reset(defaultValues);

        const dummyShipmentList = [
            { name: "GO-SEND", price: 15000, est: "today" },
            { name: "JNE", price: 9000, est: "2 days"},
            { name: "Personal Courier", price: 29000, est: "1 day" }
        ];
        setShipmentList(dummyShipmentList);
        const dummyPaymentList = [
            { name: "e-Wallet", balance: 1500000 },
            { name: "Bank Transfer", balance: null},
            { name: "Virtual Account", balance: null }
        ];
        setPaymentList(dummyPaymentList);
    }, []);
    
    useEffect(() => {
        const new_values = values;
        savePageDataToSessioStorage(path, new_values);
    }, [values]);

    const onSubmit = (data) => {
        setDataOfPathValid(path);

        // move to next step
        const nextPath = getNextPath(path);
        if ( nextPath === null || nextPath === undefined )
            return;
        
        navigate(nextPath);
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col size={9} styles={detailsStyles}>
                        <Row styles={paddingLeftRight15}>
                            <CardHeader><CardTitle>Shipment</CardTitle></CardHeader>
                        </Row>
                        <Row styles={rowStyles}>
                            { shipmentList.map((shipment) => {
                                const { name, price } = shipment;
                                return (
                                    <Col key={"shipment-"+name} size={(12/shipmentList.length)}>
                                        <FormGroupRadio key={name} checked={values.shipment===JSON.stringify(shipment)}>
                                            <FormRadio 
                                                inputReg={register('shipment', {required: true})} 
                                                name="shipment"
                                                id={"shipment-"+name}
                                                value={JSON.stringify(shipment)}
                                            />
                                            <FormLabel htmlFor={"shipment-"+name}>
                                                <div className="title">{name}</div>
                                                <div className="desc">{price}</div>
                                            </FormLabel>
                                        </FormGroupRadio>
                                    </Col>
                                )
                            }) }
                            { errors.shipment && errors.shipment.type === "required" && 
                                <TextInfo className="error" styles={errorStyles}>Please select shipment</TextInfo>
                            }
                        </Row>
                        
                        <Row styles={paddingLeftRight15}>
                            <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
                        </Row>
                        <Row styles={rowStyles}>
                            { paymentList.map(({name, balance}) => {
                                return (
                                    <Col key={"payment-"+name} size={(12/shipmentList.length)}>
                                        <FormGroupRadio key={name} checked={values.payment===name}>
                                            <FormRadio 
                                                inputReg={register('payment', {required: true})} 
                                                name="payment"
                                                id={"payment-"+name}
                                                value={name}
                                            />
                                            <FormLabel htmlFor={"payment-"+name}>
                                                { balance !== null ?
                                                    <>
                                                        <div className="title">{name}</div>
                                                        <div className="desc">{balance}</div> 
                                                    </>
                                                    :
                                                    <div className="desc">{name}</div>
                                                }
                                            </FormLabel>
                                        </FormGroupRadio>
                                    </Col>
                                )
                            }) }
                            { errors.payment && errors.payment.type === "required" && 
                                <TextInfo className="error" styles={errorStyles}>Please select payment method</TextInfo>
                            }
                        </Row>
                    </Col>
                    <Col size={3}>
                        <Summary data={{...prevStepsData, ...values}} showPayment={false} showButton={true} /> 
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Payment;