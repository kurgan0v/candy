import React, {FC, useEffect, useState} from 'react';
import style from './style.module.scss';
import clsx from "clsx";
import {Link, useLocation} from "react-router-dom";

interface IProps{
    activePage:string,
    setActivePage: React.Dispatch<React.SetStateAction<string>>,
    pages: Array<string>,
    links: Array<string>,
    name: string,
    photo: string
    signOut: () => void
}
export const Header = ({activePage, setActivePage, pages, links, name, photo, signOut}: IProps) => {
    const location = useLocation();
    useEffect(() => {
        let path = location.pathname.split('/')[2];
        if (path) {
            let i = links.indexOf(path);
            if(i != -1){
                setActivePage(pages[i]);
            }
        }
    }, []);
    return (
        <section>
            <header>
                <div className={style.nav}>
                    <div className={style.wrapNav}>
                        <img src={photo} alt="" className={style.avatar}/>
                        <div className={style.userInfo}>
                            <p className={style.userName}>{name}</p>
                            <p className={style.userPosition}>человек, которого допустили к управлению цехом помадных конфет</p>
                        </div>
                    </div>
                    <button className={style.logout} onClick={signOut}>Выйти</button>
                </div>
            </header>
            <div className={style.navigate}>
                <h1 className={style.h1}>Система управления цехом по производству помадных конфет</h1>
                <div className={style.pages}>
                    {pages.map((e:string, i:number) => {
                        return <Link key={i} className={style.link} to={"app/" + links[i]}><div onClick={()=>{setActivePage(e)}} className={clsx(style.page, (activePage === e) && style.pageActive)}>{e}</div></Link>
                    })}
                </div>
            </div>
        </section>

    )
}