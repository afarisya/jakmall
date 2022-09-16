import styled from 'styled-components'

export const Row = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    
    @media(max-width: 767px) {
        flex-direction: column;
    }
    ${prop => prop.styles}
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    width: ${prop => !prop.size ? "100%" : "calc("+prop.size+" / 12 * 100%)"} ;
    padding: 0 15px;

    @media(max-width: 767px) {
        width: 100%;
    }

    ${prop => prop.styles}
`;