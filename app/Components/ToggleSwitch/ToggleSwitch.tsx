"use client";
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react'
import styled from 'styled-components';

interface Props {
    value?: string;
    onChange?: (e: any) => void;
}

function ToggleSwitch({
    value,
    onChange,
}: Props) {


    const { theme } = useGlobalState();

    return (
        <ToggleSwitchStyled theme={theme}>
            <label className="switch">
                <input type="checkbox" value={value} onChange={onChange} />
                <span className="slider"></span>
            </label>
        </ToggleSwitchStyled>
    )
}

const ToggleSwitchStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    z-index: 5;
    cursor: pointer;


    /* From Uiverse.io by gharsh11032000 */ 
    /* The switch - the box around the slider */
    .switch {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background:  ${props => props.theme.colorGrey3};
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .slider:before {
    position: absolute;
    content: "";
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2em;
    width: 2em;
    inset: 0;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .switch input:checked + .slider {
    background: ${props => props.theme.colorGreenDark};
    }

    .switch input:focus + .slider {
    box-shadow: 0 0 1px ${props => props.theme.colorGreenDark};
    }

    .switch input:checked + .slider:before {
    transform: translateX(1.6em);
    }
`

export default ToggleSwitch
