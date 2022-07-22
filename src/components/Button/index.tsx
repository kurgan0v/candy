import style from './style.module.scss';
import clsx from "clsx";
interface IProps{
    text: string,
    active: boolean,
    onClick: () => void
}
export const Button = ({text, active, onClick}:IProps)=>{
    return(
        <button onClick={()=>{onClick()}} className={clsx(style.button, active && style.active)}>{text}</button>
    )
}