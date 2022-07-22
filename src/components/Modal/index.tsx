import React from "react";
import style from './style.module.scss';
import clsx from "clsx";

interface IModal {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode[],
}
export const Modal = ({active, setActive, children}:IModal)=>{
    return(
        <div className={clsx(style.modalWrap, active && style.modalWrapActive)}>
            <div className={clsx(style.modal, active && style.modalActive)}>
                <button type="button" className={style.close} onClick={()=>{setActive(false)}}>×</button>
                {children}
            </div>
        </div>
    )
}