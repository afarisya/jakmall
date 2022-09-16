import styled from 'styled-components'

export const Menu = styled.div`
    position: relative;
    z-index: 2;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 100%;
    width: fit-content;
    min-height: 70px;
    padding: 10px 35px;
    background-color: var(--milder-orange);
    border-radius: 35px;
    
    ${prop => prop.styles}
`;

export const MenuItem = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    padding: 10px 0;
    padding-left: 40px;
    color: var(--orange);
    font-weight: 500;

    &::before {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        content: '${prop => prop.index}';
        height: 30px;
        width: 30px;
        background-color: ${prop => prop.active ? "var(--orange)" : "#FFE4B8"};
        color: ${prop => prop.active ? "var(--white)" : "var(--orange)"};
        border-radius: 50%;
    }
    
    ${prop => prop.styles}
`;

export const MenuSeparator = styled.div`
    border-right: 2px solid var(--orange); 
    border-bottom: 2px solid var(--orange);
    height: 7px;
    width: 7px;
    transform: rotate(-45deg);
    margin-top: 2px;
    margin-left: 25px;
    margin-right: 25px;
    
    ${prop => prop.styles}
`;