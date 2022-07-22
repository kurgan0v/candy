import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Select, Option} from '../Select';
import {ISupply} from '../../App';

interface IOption {
    value: string,
    label: string,
}


export const Table = ({supplies, page}: { supplies: Array<ISupply> | undefined, page: string }) => {
    const [period, setPeriod] = useState<string>('month');
    const d = new Date();
    d.setDate(1);
    const [dateMin, setDateMin] = useState<Date>(d);
    useEffect(() => {
        let date = new Date();
        switch (period) {
            case 'month':
                date.setDate(1)
                break;
            case 'quarter':
                date.setMonth(((date.getMonth() + 1) / 4 | 0) * 4)
                break;
            case 'year':
                date.setDate(1);
                date.setMonth(1);
                break;
        }
        setDateMin(date);
    }, [period]);

    const totalSum = (ss: Array<ISupply>) => {
        let total = 0;
        ss.forEach((e: ISupply) => {
            total += e.total;
        });
        return total;
    }
    return (
        <section className={style.main}>
            {supplies && <>
                <div className={style.info}>
                    <Select value={period} onChange={(e:IOption)=>{setPeriod(e.value)}}>
                        <Option value="month" label="за текущий месяц"/>
                        <Option value="quarter" label="за текущий квартал"/>
                        <Option value="year" label="за текущий год"/>
                    </Select>
                    <p className={style.total}>Итого за
                        период: {totalSum(supplies.filter((e: ISupply) => (new Date(e.date)) >= dateMin))}₽</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Статус</th>
                            <th>{page === "supplies" ? "Поставщик" : "Покупатель"}</th>
                            <th>Продукт</th>
                            <th>Цена за 1 кг</th>
                            <th>Количество</th>
                            <th>Доставка</th>
                            <th>Итого</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.filter((e: ISupply) => (new Date(e.date)) >= dateMin).map((e: ISupply, i:number) => <tr key={i}>
                            <td>{new Date(e.date).toLocaleDateString()}</td>
                            <td>{e.status}</td>
                            <td>{e.provider}</td>
                            <td>{e.product}</td>
                            <td>{e.price}₽</td>
                            <td>{e.amount} кг</td>
                            <td>{e.delivery}₽</td>
                            <td>{e.total}₽</td>
                        </tr>)}
                    </tbody>
                </table>
            </>}
            {!supplies && <p className={style.total}>Не удалось получить данные</p>}
        </section>
    )
}