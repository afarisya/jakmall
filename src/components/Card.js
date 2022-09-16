import styled from 'styled-components'

export const Card = styled.div`
    position: relative;
    z-index: 1;
    top: -35px;
    max-width: 1100px;
    min-height: 550px;
    width: 100%;
    margin: 0 auto;
    padding: 65px 5px 20px;

    background: var(--white);
    box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
    border-radius: 4px;
    
    ${prop => prop.styles}
`;

export const CardHeader = styled.div`
    min-height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 36px;
`;

export const CardTitle = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    font-style: normal;
    font-weight: 700;
    max-width: 100%;
    min-width: ${prop => prop.sm ? "unset" : "275px"};
    font-size: ${prop => prop.sm ? "24px" : "36px"};
    line-height: ${prop => prop.sm ? "32px" : "44px"};
    color: var(--orange);

    &::after {
        display: ${prop => prop.sm && "none"}; 
        content: '';
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 5px;
        height: 8px;
        width: calc(100%);
        background-color: var(--grayscale);
    }

    ${prop => prop.styles}
`;

export const CardDesc = styled.div`
    position: relative;
    width: fit-content;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: ${prop => prop.light ? "var(--grey)" : "var(--black)"}; 

    ${prop => prop.styles}
`;