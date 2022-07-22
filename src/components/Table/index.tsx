import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Select, Option} from '../../components/Select';

interface IOption {
    value: string,
    label: string,
}

interface ISupply {
    date: string,
    status: string,
    provider: string,
    product: string,
    price: number,
    amount: number,
    delivery: number,
    total: number
}

export const SuppliesPage = () => {
    const [period, setPeriod] = useState<IOption>({value: 'month', label: 'за текущий месяц'});
    const d = new Date();
    d.setDate(1);
    const [dateMin, setDateMin] = useState<Date>(d);
    useEffect(() => {
        let date = new Date();
            switch (period.value) {
                case 'month':
                    date.setDate(1)
                    break;
                case 'quarter':
                    date.setMonth(((date.getMonth() +1) / 4|0)*4)
                    break;
                case 'year':
                    date.setDate(1);
                    date.setMonth(1);
                    break;
            }
            setDateMin(date);
        },[period]);
    const supplies = [
        {
            date: '2022-07-19',
            status: 'выполнена',
            provider: 'ООО «Сахар»',
            product: 'Сахар-песок',
            price: 12.5,
            amount: 2000,
            delivery: 1000,
            total: 26000
        },
        {
            date: '2022-06-18',
            status: 'выполнена',
            provider: 'ООО «Сахар»',
            product: 'Сахар-песок',
            price: 12.5,
            amount: 2000,
            delivery: 1000,
            total: 26000
        },
        {
            date: '2022-05-21',
            status: 'выполнена',
            provider: 'ООО «Сахар»',
            product: 'Сахар-песок',
            price: 12.5,
            amount: 2000,
            delivery: 1000,
            total: 26000
        },
        {
            date: '2022-04-21',
            status: 'выполнена',
            provider: 'ООО «Сахар»',
            product: 'Сахар-песок',
            price: 12.5,
            amount: 2000,
            delivery: 1000,
            total: 26000
        }
    ];
    const totalSum = (ss: Array<ISupply>) => {
        let total = 0;
        ss.forEach((e: ISupply) => {
            total += e.total;
        });
        return total;
    }
    return (
        <section className={style.main}>
            <div className={style.info}>
                <Select value={period} setValue={setPeriod}>
                    <Option value="month" label="за текущий месяц"/>
                    <Option value="quarter" label="за текущий квартал"/>
                    <Option value="year" label="за текущий год"/>
                </Select>
                <p className={style.total}>Итого {period.label}: {totalSum(supplies.filter((e: ISupply) => (new Date(e.date)) >= dateMin))}₽</p>
            </div>
            <table>
                <tr>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Поставщик</th>
                    <th>Продукт</th>
                    <th>Цена за 1 кг</th>
                    <th>Количество</th>
                    <th>Доставка</th>
                    <th>Итого</th>
                </tr>
                {supplies.filter((e: ISupply) => (new Date(e.date)) >= dateMin).map((e:ISupply) => <tr>
                    <td>{new Date(e.date).toLocaleDateString()}</td>
                    <td>{e.status}</td>
                    <td>{e.provider}</td>
                    <td>{e.product}</td>
                    <td>{e.price}</td>
                    <td>{e.amount}</td>
                    <td>{e.delivery}</td>
                    <td>{e.total}</td>
                </tr>)}
            </table>
        </section>
    )
}