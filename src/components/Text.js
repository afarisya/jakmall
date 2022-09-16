import styled from "styled-components";

export const Text = styled.div`
    color: var(--black);

    ${prop => prop.styles}
`; 
export const TextGrey = styled.div`
    color: var(--grey);
    
    ${prop => prop.styles}
`; 

export const TextInfo = styled.div`
    font-size: 12px;
    color: var(--black);
    
    &.success {
        color: var(--green);
    }
    &.warning {
        color: var(--orange);
    }
    &.error {
        color: var(--red);
    }

    ${prop => prop.styles}
`; 