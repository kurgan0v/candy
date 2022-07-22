import React, {useEffect, useRef, useState} from 'react';
import style from './style.module.scss';
import {FirstStep} from "../../components/Animations/FirstStep";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";

import {IComponent} from "../../App";
interface IFactory{
    components: Array<IComponent> | undefined
}
export const FactoryPage = ({components}:IFactory) => {
    const [runSyrup, setRunSyrup] = useState<boolean>(false);
    const [massSyrup, setMassSyrup] = useState<number>(0);
    const [timerSyrup, setTimerSyrup] = useState<number>();
    const [sugar, setSugar] = useState<number>(0);
    const [syrup, setSyrup] = useState<number>(0);
    const [water, setWater] = useState<number>(0);
    const [addProduct, setAddProduct] = useState<number>(0);
    const [messageSyrup, setMessageSyrup] = useState<string>("");
    const [solidsContent, setSolidsContent] = useState<number>(0);
    useEffect(()=>{
        if(components && sugar > components!.filter((e:IComponent) => e.name === "Сахар-песок")[0].amount){
            setMessageSyrup("Недостаточно сахара на складе");
        } else {
            setMessageSyrup("");
        }
    }, [sugar]);
    useEffect(()=>{
        if( components && syrup > components!.filter((e:IComponent) => e.name === "Патока")[0].amount){
            setMessageSyrup("Недостаточно патоки на складе");
        } else {
            setMessageSyrup("");
        }
    }, [syrup]);
    const addingProduct = (component: number, idProduct: number, setProduct: React.Dispatch<React.SetStateAction<number>>)=>{
        if(massSyrup + component <= 5000){
            let addPercents = 0;
            if(idProduct === 1){
                addPercents += ~~((solidsContent/100*massSyrup + component)*100/(massSyrup + component))
            }
            if(idProduct === 2){
                addPercents += ~~((solidsContent/100*massSyrup + component/2)*100/(massSyrup + component))
            }
            if(idProduct === 3){
                addPercents += ~~((solidsContent/100*massSyrup)*100/(massSyrup + component))
            }
            setMassSyrup(massSyrup + component);
            setAddProduct(idProduct);
            setSolidsContent(addPercents);
            setProduct(0);
        } else {
            setMessageSyrup('Будет превышена максимально допустимая загрузка');
            setTimeout(()=>{
                setMessageSyrup("");
            }, 2000);
        }
    };
    let timer:number | undefined;
    useEffect(()=>{
        if(massSyrup && runSyrup){
            let newContent = solidsContent;
            timer = window.setInterval(()=>{
                if(newContent < 100){
                    newContent += 1;
                    setSolidsContent(newContent);
                } else {
                    clearInterval(timer);
                    setRunSyrup(false);
                }
            }, 100);
            setTimerSyrup(timer);
        } else {
            clearInterval(timerSyrup);
        }
    }, [runSyrup]);
    return(
        <section className={style.main}>
            <div className={style.headerStep}>
                <p className={style.numberStep}>1</p>
                <p className={style.nameStep}>Приготовление сахарного сиропа</p>
            </div>
            <div className={style.step}>
                <div className={style.stepAnimation}>
                    <FirstStep run={runSyrup} addProduct={addProduct} setAddProduct={setAddProduct} mass={massSyrup}/>
                    <p className={style.status}>Текущая масса: {massSyrup} кг</p>
                    <p className={style.tip}>Максимальная загрузка диссутора — 5000 кг</p>
                </div>
                <div className={style.stepAction}>


                    <p className={style.message}>{messageSyrup}</p>
                    <div className={style.addComponent}>
                        <Input onlyNumbers={true} active={true} value={sugar} setValue={setSugar} messageInfo={""} label={"Сахар, кг"}/>
                        <div className={style.wrapButton}>
                            <Button text={"Добавить"} active={!!sugar && sugar <= components!.filter((e:IComponent) => e.name === "Сахар-песок")[0].amount} onClick={()=>{addingProduct(sugar, 1, setSugar)}}/>
                        </div>
                    </div>
                    <div className={style.addComponent}>
                        <Input onlyNumbers={true} active={true} value={syrup} setValue={setSyrup} messageInfo={"Рекомендуемое количество патоки — 10-15% от массы сахара"} label={"Патока, кг"}/>
                        <div className={style.wrapButton}>
                            <Button text={"Добавить"} active={!!syrup && syrup <= components!.filter((e:IComponent) => e.name === "Патока")[0].amount} onClick={()=>{addingProduct(syrup, 2, setSyrup)}}/>
                        </div>
                    </div>
                    <div className={style.addComponent}>
                        <Input onlyNumbers={true} active={true} value={water} setValue={setWater} messageInfo={"Рекомендуемое количество воды — 20-25% от массы сахара"} label={"Вода, кг"}/>
                        <div className={style.wrapButton}>
                            <Button text={"Добавить"} active={!!water} onClick={()=>{addingProduct(water, 3, setWater)}}/>
                        </div>
                    </div>
                    <div className={style.actionsSyrup}>
                        <div className={style.solidWrap}>
                            <p className={style.solidsContent}>{solidsContent}%</p>
                            <div className={style.solidTexts}>
                                <p className={style.solidHeader}>Содержание сухих веществ</p>
                                <p className={style.messageInfo}>Рекомендуемое содержание — 78-82%</p>
                            </div>
                        </div>
                        <div className={style.btns}>
                            <Button text={"Запустить"} active={!!(massSyrup > 0) && !runSyrup} onClick={()=>{setRunSyrup(true)}}/>
                            <Button text={"Остановить"} active={runSyrup} onClick={()=>{setRunSyrup(false)}}/>
                            <Button text={"Отфильтровать"} active={solidsContent > 70 && solidsContent < 90} onClick={()=>{setMassSyrup(0); setSolidsContent(0)}}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}