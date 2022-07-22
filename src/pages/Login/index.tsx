import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Button} from "../../components/Button";

interface ILogin{
    signIn: () => void
}
export const Login = ({signIn}:ILogin) => {
    return(
        <section className={style.main}>
            <div className={style.login}>
                <p className={style.loginHeader}>Войти с помощью Google</p>
                <Button text={"Войти"} active={true} onClick={signIn}/>
            </div>
        </section>
    );
}