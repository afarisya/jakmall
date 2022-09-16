import styled from 'styled-components'

export const Button = styled.button`
    min-height: 50px;
    padding: 12px 15px;
    background-color: var(--orange);
    color: var(--white);
    font-size: 16px;
    outline: none;
    box-shadow: none;
    border: none;
    cursor: pointer;
    transition: filter 0.3s;

    &:hover {
        /* Darken on click by 15% (down to 85%) */
        filter: brightness(0.95);
    }
    
    ${prop => prop.styles}
`;