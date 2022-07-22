import React from 'react';
import style from './style.module.scss';
import {Button} from '../../components/Button';
import clsx from "clsx";

interface IComponent {
    name:string,
    type: string,
    amount: number
}
interface IProduct {
    name:string,
    amount: number
}
export const StoragePage = () => {
    const components = [
        {
            name: "Шоколадная глазурь",
            type: "main",
            amount: 1240
        },
        {
            name: "Сахар-песок",
            type: "main",
            amount: 3430
        },
        {
            name: "Молоко сгущенное",
            type: "main",
            amount: 890
        },
        {
            name: "Масло сливочное",
            type: "main",
            amount: 80
        },
        {
            name: "Патока",
            type: "main",
            amount: 429
        },
        {
            name: "Ароматизатор «Лимон»",
            type: "flavoring",
            amount: 4
        },
        {
            name: "Ароматизатор «Кокос»",
            type: "flavoring",
            amount: 5
        },
        {
            name: "Ароматизатор «Ваниль»",
            type: "flavoring",
            amount: 2
        }
    ];
    const products = [
        {
            name: "Конфеты помадные «Алабай»",
            amount: 410
        },
        {
            name: "Конфеты помадные «Будда»",
            amount: 280
        },
        {
            name: "Конфеты помадные «Василёк»",
            amount: 45
        }
    ]
    return (
        <section className={style.main}>
            <div className={style.headers}>
                <p className={style.mainHeader}>Продукты</p>
                <Button text="Заказать продукт" active={true}/>
            </div>
            <p className={style.subHeader}>Основные ингредиенты</p>
            <div className={style.components}>
                {components.filter((e:IComponent) => e.type === "main").map((e:IComponent) => <div className={style.component}><p className={style.name}>{e.name}, кг</p><p className={clsx(style.amount, (e.amount < 150) && style.low)}>{e.amount}</p></div>)}
            </div>
            <p className={style.subHeader}>Ароматизаторы</p>
            <div className={style.components}>
                {components.filter((e:IComponent) => e.type === "flavoring").map((e:IComponent) => <div className={style.component}><p className={style.name}>{e.name}, кг</p><p className={style.amount}>{e.amount}</p></div>)}
            </div>
            <div className={style.headers}>
                <p className={style.mainHeader}>Готовая продукция</p>
                <Button text="Создать отправление" active={true}/>
            </div>
            <div className={style.components}>
                {products.map((e:IProduct) => <div className={style.component}><p className={style.name}>{e.name}, кг</p><p className={style.amount}>{e.amount}</p></div>)}
            </div>
        </section>
    )
}