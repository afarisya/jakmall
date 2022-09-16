import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled, {css} from 'styled-components'

import { Button } from '../Button';
import { CardDesc, CardTitle } from "../Card";
import { Row } from '../Layout';
import { TextInfo } from '../Text';

import { getPrevPath, isPreviousPageDataValid, numberWithCommas } from '../../utils';

const totalTitleStyles = css`
    margin-right: 5px;
    margin-bottom: 24px;
`

const TextDarker = styled.span`
    filter: brightness(0.8);
`;

const Separator = styled.div`
    height: 1px;
    width: 80px;
    max-width: 100%;
    background-color: #D8D8D8;
    margin: 20px 0;
`;

const ContainerPrices = styled.div`
    margin-top: 80px;
`;

function Summary(props) {
    const { 
        data={},
        showPayment=true, 
        showButton=false 
    } = props;
    const { 
        sendAsDropshipper=null, 
        shipment=null,
        payment=null 
    } = data;

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if ( !isPreviousPageDataValid() ) {
            const prevPath = getPrevPath(path);
            if ( prevPath !== null && prevPath !== undefined ) {
                navigate(prevPath);
                return;
            }
        }
    }, []);


    let shipment_parsed = {};
    let shipment_fee = 0;
    if ( shipment !== null ) {
        shipment_parsed = JSON.parse(shipment);
        shipment_fee = shipment_parsed.price;
    }

    const price = 500000;
    const dropship_fee = 5900;
    const total = price + (sendAsDropshipper ? dropship_fee : 0) + (shipment !== null ? shipment_fee : 0);

    return (
        <>
            <CardTitle sm className="mb-5">Summary</CardTitle>
            <CardDesc sm light className="mr-5">10 items purchased</CardDesc>
            <div className={shipment === null ? "hidden" : ""}>
                <Separator />
                <CardDesc sm dark className="mb-5">Delivery estimation</CardDesc>
                <CardDesc sm light><TextInfo className="success">{shipment_parsed.est} by {shipment_parsed.name}</TextInfo></CardDesc>
            </div>
            <div className={!showPayment || shipment === null ? "hidden" : ""}>
                <Separator />
                <CardDesc sm dark className="mb-5">Payment method</CardDesc>
                <CardDesc sm light><TextInfo className="success">{payment}</TextInfo></CardDesc>
            </div>
            <ContainerPrices>
                <Row className="mb-10">
                    <CardDesc sm light className="mr-5">Cost of Goods</CardDesc>
                    <CardDesc sm dark className="ml-auto">{numberWithCommas(price)}</CardDesc>
                </Row>
                { sendAsDropshipper &&
                    <Row className="mb-10">
                        <CardDesc sm light className="mr-5">Dropshipping Fee</CardDesc>
                        <CardDesc sm dark className="ml-auto">{numberWithCommas(dropship_fee)}</CardDesc>
                    </Row>
                }
                { shipment !== null &&
                    <Row className="mb-10">
                        <CardDesc sm light className="mr-5"><TextDarker>{shipment_parsed.name}</TextDarker> shipment</CardDesc>
                        <CardDesc sm dark className="ml-auto">{numberWithCommas(shipment_parsed.price)}</CardDesc>
                    </Row>
                }
                <Row className="mt-20">
                    <CardTitle sm styles={totalTitleStyles}>Total</CardTitle>
                    <CardTitle sm className="ml-auto">{numberWithCommas(total)}</CardTitle>
                </Row>
                { showButton && 
                    <Button type="submit">
                        { payment === null ?
                            "Continue to Payment"
                            :
                            "Pay with "+payment
                        }
                    </Button> 
                }
            </ContainerPrices>
        </>
    )
}

export default Summary;