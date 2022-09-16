import {css} from 'styled-components'

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CardHeader, CardTitle } from "../Card";
import { Form, FormCheck, FormGroup, FormInputText, FormLabel, FormTextArea } from '../Form';
import { Col, Row } from '../Layout';
import Summary from '../Order/Summary';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextInfo } from '../Text';
import { 
    getPageDataFromSessioStorage, 
    savePageDataToSessioStorage,
    setDataOfPathValid, 
    isPreviousPageDataValid, 
    getPrevPath, 
    getNextPath } from '../../utils';

const detailsStyles = css`
    position: relative;
    margin-bottom: 36px;

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

const dropshipCheckboxStyles = css`
    display: flex;
    margin-left: auto;
    margin-bottom: 0;
`;

function Delivery() {
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
    
    useEffect(() => {
        if ( !isPreviousPageDataValid() ) {
            const prevPath = getPrevPath(path);
            if ( prevPath !== null && prevPath !== undefined ) {
                navigate(prevPath);
                return;
            }
        }

        // update form with saved data
        const defaultValues = getPageDataFromSessioStorage(path);
        if ( defaultValues !== null && defaultValues !== undefined ) {
            reset(defaultValues);
        }
    }, []);
    
    useEffect(() => {
        savePageDataToSessioStorage(path, values);
    }, [values]);

    useEffect(() => {
        if ( values.sendAsDropshipper === null || values.sendAsDropshipper === undefined )
            return;

        if ( !values.sendAsDropshipper ) {
            const defaultValues = getPageDataFromSessioStorage(path);
            if ( defaultValues === null || defaultValues === undefined )
                return;

            defaultValues.dropshipperName = ""
            defaultValues.dropshipperPhoneNumber = ""

            reset(defaultValues);
        }
    }, [values.sendAsDropshipper]);

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
                        <Row>
                            <Col size={7}>
                                <CardHeader>
                                    <CardTitle>Delivery details</CardTitle>
                                </CardHeader>
                                <FormGroup>
                                    <FormInputText 
                                        inputReg={register('email', {
                                            required: {
                                                value: true,
                                                message: "Email must be filled"
                                            },
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Email not valid. Example: john@email.com"
                                            },
                                        })} 
                                        status={ errors.email ? 
                                            ( errors.email.type === "pattern" ? "warning" : "error" )
                                            : null
                                        }
                                    />
                                    <FormLabel>Email</FormLabel>
                                    { errors.email && 
                                        <TextInfo className={
                                            errors.email.type === "pattern" ? "warning" : "error"
                                        }>{errors.email.message}</TextInfo> 
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <FormInputText 
                                        inputReg={register('phoneNumber', { 
                                            required: {
                                                value: true,
                                                message: "Phone number must be filled"
                                            },
                                            pattern: {
                                                value: /^[+\-0-9()]+$/,
                                                message: "Phone number not valid. Only accept +, -, 0-9, (, )"
                                            },
                                            validate: {
                                                minNumLength: v => 
                                                    v.replace(/\+|\-|\(|\)/g, '').length >= 6
                                                    || 'Minimum 6 digits number',
                                                maxNumLength: v => 
                                                    v.replace(/\+|\-|\(|\)/g, '').length <= 20
                                                    || 'Maximum 20 digits number',
                                            }
                                        })}
                                        status={ errors.phoneNumber ?
                                            ( errors.phoneNumber.type === "pattern" ? "warning" : "error" )
                                            : null
                                        }
                                    />
                                    <FormLabel>Phone Number</FormLabel>
                                    { errors.phoneNumber && 
                                        <TextInfo className={
                                            errors.phoneNumber.type === "pattern" ? "warning" : "error"
                                        }>{errors.phoneNumber.message}</TextInfo> 
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <FormTextArea 
                                        inputReg={register('address', { 
                                            required: {
                                                value: true,
                                                message: "Delivery address must be filled"
                                            },
                                            maxLength: {
                                                value: 120,
                                                message: "Maximum 120 characters"
                                            },
                                        })} 
                                        status={ errors.address ? 
                                            ( errors.address.type === "required" ? "error" : "warning" )
                                            : null
                                        }
                                    />
                                    <FormLabel>Delivery Address *</FormLabel>
                                    { errors.address && 
                                        <TextInfo className={
                                            errors.address.type === "required" ? "error" : "warning"
                                        }>{errors.address.message}</TextInfo> 
                                    }
                                </FormGroup>
                            </Col>
                            <Col size={5}>
                                <CardHeader>
                                    <FormGroup styles={dropshipCheckboxStyles}>
                                        <FormCheck inputReg={register('sendAsDropshipper')} id={"dropship"} />  
                                        <FormLabel htmlFor={"dropship"}>Send as dropshipper</FormLabel>
                                    </FormGroup>
                                </CardHeader>
                                <FormGroup>
                                    <FormInputText 
                                        inputReg={register('dropshipperName', {
                                            required: {
                                                value: values.sendAsDropshipper,
                                                message: "Dropshipper must be filled"
                                            }
                                        })} 
                                        status={ errors.dropshipperName ? "error" : null}
                                        disabled={!values.sendAsDropshipper}
                                    />
                                    <FormLabel>Dropshipper</FormLabel>
                                    { errors.dropshipperName && 
                                        <TextInfo className={
                                            errors.dropshipperName.type === "required" ? "error" : "warning"
                                        }>{errors.dropshipperName.message}</TextInfo> 
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <FormInputText 
                                        inputReg={register('dropshipperPhoneNumber', { 
                                            required: {
                                                value: values.sendAsDropshipper,
                                                message: "Dropshipper phone number must be filled"
                                            },
                                            pattern: {
                                                value: /^[+\-0-9()]+$/, 
                                                message: "Dropshipper phone number not valid. Only accept +, -, 0-9, (, )"
                                            }
                                        })}  
                                        status={errors.dropshipperPhoneNumber ? 
                                            ( errors.dropshipperPhoneNumber.type === "required" ? "error" : "warning" )
                                            : null
                                        }
                                        disabled={!values.sendAsDropshipper}
                                    />
                                    <FormLabel>Dropshipper Phone Number</FormLabel>
                                    { errors.dropshipperPhoneNumber && 
                                        <TextInfo className={
                                            errors.dropshipperPhoneNumber.type === "required" ? "error" : "warning"
                                        }>{errors.dropshipperPhoneNumber.message}</TextInfo> 
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col size={3}>
                        <Summary data={values} showButton={true} /> 
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Delivery;