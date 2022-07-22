import React, {useState} from "react";
import style from './style.module.scss';
import arrowDown from '../../assets/img/icons/arrow_down.svg';
import clsx from "clsx";

interface ISelect {
    value: IOption,
    setValue: React.Dispatch<React.SetStateAction<IOption>>
    children: React.ReactNode[],
}
interface IOption {
    value: string,
    label: string,
}

export const Select = ({value, setValue, children}: ISelect) => {
    const [opened, setOpened] = useState<boolean>(false);
    return (
        <div className={style.select} onClick={()=>{setOpened(!opened)}}>
            <div className={style.selected}>
                <p className={style.selectedLabel}>{value.label}</p>
                <img className={clsx(style.selectedIcon, opened && style.selectedIconActive)} src={arrowDown} alt="стрелка вниз"/>
            </div>
            <div onClick={()=>{setOpened(false)}} className={clsx(style.options, opened && style.optionsActive)}>
                {children.map((e:React.ReactNode, i) => {
                    if(React.isValidElement(e)){
                        return <p className={clsx(style.option, e.props.value === value.value && style.optionSelected)} key={i} onClick={()=>{setValue({value: e.props.value, label: e.props.label})}}>{e.props.label}</p>;
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
