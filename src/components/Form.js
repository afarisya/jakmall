import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components'

export const disabledStyles = css`
    opacity: 0.6;
    background-color: var(--grayscale);
`;

export const Form = styled.form`
    input[type="text"],
    input[type="number"],
    input[type="email"], 
    textarea, 
    button {
        width: 100%;
    }
    
    input[type="text"],
    input[type="number"],
    input[type="email"],
    textarea {
        & + label {
            display: block;
            position: absolute;
            z-index: -1;
            top: 16px;
            left: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: calc(100% - 24px);
            color: rgba(0, 0, 0, 0.5);
            transform-origin: left top;
            user-select: none;
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1), top 500ms;
        }
        

        &:focus + label,
        &.is-valid + label,
        &:not(:placeholder-shown) + label {
            transform: translateY(-8px) scale(0.75);
        }
    }

    input[type="checkbox"]{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14px !important;
        height: 14px !important;
        margin: 5px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none;
        outline: 2px solid var(--green);
        box-shadow: none;
        font-size: 0.8em;
        text-align: center;
        line-height: 1em;
        background: var(--white);
        cursor: pointer;

        &:checked:after {
            content: '✔';
            color: var(--green);
        }

        & + label {
            display: flex;
            align-items: center;
            margin-left: 5px;
            font-weight: 15px;
            font-size: 13px;
            cursor: pointer;
        }
    }

    ${prop => prop.styles}
`;

export const FormGroup = styled.div`
    position: relative;
    margin-bottom: 10px;
    
    ${prop => prop.styles}
`;

export const FormError = styled.div`
    font-size: 12px;
    color: var(--red);
    
    ${prop => prop.styles}
`;

export const FormLabel = styled.label`
    font-weight: 500;

    ${prop => prop.styles}
`;

export const InputRadio = styled.input`
    ${prop => prop.styles}
`;

export const InputCheck = styled.input`
    height: 18px;
    width: 18px;
    vertical-align: middle;
    ${prop => prop.styles}
`;

export const InputEmail = styled.input`
    font-family: inherit;
    font-weight: 500;
    height: 55px;
    padding: 15px 15px 0px;
    border: 1px solid #CCCCCC;
    background-color: transparent;
    transition: border 500ms;
    outline: none;
    box-shadow: none;

    &.success {
        border-color: var(--green);
    }
    &.warning {
        border-color: var(--orange);
    }
    &.error {
        border-color: var(--red);
    }
    
    ${prop => prop.styles}
`;

export const InputText = styled.input`
    font-family: inherit;
    font-weight: 500;
    height: 55px;
    padding: 15px 15px 0px;
    border: 1px solid #CCCCCC;
    background-color: transparent;
    transition: border 500ms;
    outline: none;
    box-shadow: none;

    &.success {
        border-color: var(--green);
    }
    &.warning {
        border-color: var(--orange);
    }
    &.error {
        border-color: var(--red);
    }
    
    ${prop => prop.styles}
`;

export const TextArea = styled.textarea`
    font-family: inherit;
    font-weight: 500;
    height: 120px;
    padding: 26px 15px 0;
    border: 1px solid #CCCCCC;
    background-color: transparent;
    resize: none;
    transition: border 500ms;
    outline: none;
    box-shadow: none;

    &.success {
        border-color: var(--green);
    }
    &.warning {
        border-color: var(--orange);
    }
    &.error {
        border-color: var(--red);
    }
    
    ${prop => prop.styles}
`;

export const FormGroupRadio = styled.div`
    font-family: inherit;
    font-weight: 500;
    height: 100%;
    border: ${prop => prop.checked ? "2px solid var(--green)" : "2px solid #CCCCCC"};
    background-color: ${prop => prop.checked ? "var(--greenscale)" : "transparent"};
    transition: border 500ms;
    outline: none;
    box-shadow: none;

    &.selected {
        border-color: var(--green);
    }

    input[type=radio] {
        display: none;
    }
    label {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
        font-weight: 600;
        cursor: pointer;
        color: ${prop => prop.checked ? "var(--black)" : "var(--grey)"};

        & .title {
            font-size: 12px;
        }
        & .desc {

        }
    }

    ${prop => prop.styles}
`;

export function FormRadio(props) {
    const { inputReg=null, ...restProps } = props;  
    
    return (
        <InputRadio {...restProps} {...inputReg} type="radio" {...props} />
    )
}

export function FormCheck(props) {
    const { inputReg=null, ...restProps } = props;  
    
    return (
        <InputCheck {...restProps} {...inputReg} type="checkbox" {...props} />
    )
}

export function FormInputEmail(props) {
    const { inputReg=null, disabled, status, ...restProps } = props;  
    
    return (
        <InputEmail 
            {...restProps} 
            {...inputReg} 
            className={status}
            styles={disabled&&disabledStyles} 
            disabled={disabled} 
            type="email" 
            placeholder=" " 
        />
    )
}

export function FormInputText(props) {
    const { inputReg=null, disabled, status, ...restProps } = props;  
    
    return (
        <InputText 
            {...restProps} 
            {...inputReg} 
            className={status}
            styles={disabled&&disabledStyles} 
            disabled={disabled} 
            type="text" 
            placeholder=" " 
        />
    )
}

export function FormTextArea(props) {
    const { inputReg=null, status, ...restProps } = props;  
    
    return (
        <>
            <TextArea {...restProps} {...inputReg} className={status} placeholder=" " />
            {/* { props.error && <FormError>Alamat harus diisi.</FormError> } */}
        </>
    )
}