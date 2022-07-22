import React, {useState} from "react";
import style from './style.module.scss';
import clsx from "clsx";

interface IInput {
    onlyNumbers:boolean,
    active: boolean,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    messageInfo: string,
    label: string
}
export const Input = ({onlyNumbers, active, value, setValue, messageInfo, label}:IInput) => {
    const [message, setMessage] = useState('');
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        if(Number.isInteger(+e.target.value)){
            setValue(+e.target.value);
        } else {
            setMessage("Введите целое число!");
            setTimeout(()=>{
                setMessage("");
            }, 2000);
        }
    }
    return (
        <div>
            <p className={style.label}>{label}</p>
            <input type="text" placeholder="100" onChange={onChange} value={value} className={clsx(style.input, !active && style.inactive)}/>
            <p className={style.messageInfo}>{messageInfo}</p>
            <p className={style.message}>{message}</p>
        </div>
    )
}
