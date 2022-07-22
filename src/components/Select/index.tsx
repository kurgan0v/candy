import React, {useEffect, useState} from "react";
import style from './style.module.scss';
import arrowDown from '../../assets/img/icons/arrow_down.svg';
import clsx from "clsx";

interface ISelect {
    value: string,
    children: React.ReactNode[] | React.ReactNode,
    onChange: (e:IOption) => void
}
interface IOption {
    value: string,
    label: string,
}

export const Select = ({value, children, onChange}: ISelect) => {
    const [opened, setOpened] = useState<boolean>(false);
    useEffect(()=>{
        if(Array.isArray(children)){
            children.forEach((e:React.ReactNode, i) => {
                if(React.isValidElement(e)){
                    if(e.props.value === value){
                        setLabel(e.props.label);
                    }
                }
            });
        }
    }, [children]);

    const [label, setLabel] = useState<string>(value?value:'не выбрано');
    return (
        <div className={style.select} onClick={()=>{setOpened(!opened)}}>
            <div className={style.selected}>
                <p className={style.selectedLabel}>{label}</p>
                <img className={clsx(style.selectedIcon, opened && style.selectedIconActive)} src={arrowDown} alt="стрелка вниз"/>
            </div>
            <div onClick={()=>{setOpened(false)}} className={clsx(style.options, opened && style.optionsActive)}>
                {Array.isArray(children) && children.map((e:React.ReactNode, i:number) => {
                    if(React.isValidElement(e)){
                        return <p className={clsx(style.option, e.props.value === value && style.optionSelected)} key={i}  onClick={()=>{onChange(e.props)}}>{e.props.label}</p>;
                    }
                })}
            </div>
        </div>
    )
}
export const Option = ({value, label}:IOption) => {
    return(
        <></>
    )
}
