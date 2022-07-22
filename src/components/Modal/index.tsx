import style from './style.module.scss';
import clsx from "clsx";
interface IProps{
    text: string,
    active: boolean
}
export const Button = ({text, active}:IProps)=>{
    return(
        <button className={clsx(style.button, active && style.active)}>{text}</button>
    )
}