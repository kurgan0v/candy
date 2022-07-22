import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Button} from '../../components/Button';
import clsx from "clsx";
import {Modal} from '../../components/Modal';
import {Input} from '../../components/Input';
import {Option, Select} from "../../components/Select";

import {ISup, IProduct, IComponent, ISupply} from '../../App';
interface IOption {
    value: string,
    label: string,
}
interface IStorage{
    suppliersAll: Array<ISup> | undefined,
    components: Array<IComponent> | undefined,
    products: Array<IProduct> | undefined,
    setSupplies: React.Dispatch<React.SetStateAction<Array<ISupply>| undefined>> ,
    setShipments: React.Dispatch<React.SetStateAction<Array<ISupply>| undefined>>,
    supplies: Array<ISupply> | undefined,
    shipments: Array<ISupply> | undefined,
    setComponents: React.Dispatch<React.SetStateAction<Array<IComponent>| undefined>> ,
    setProducts: React.Dispatch<React.SetStateAction<Array<IProduct>| undefined>>,
}
export const StoragePage = ({suppliersAll, components, products, setSupplies, setShipments, supplies, shipments,
                                setComponents, setProducts}:IStorage) => {
    const costShipping = 1000;
    const [addSupply, setAddSupply] = useState<boolean>(false);
    const [addShipment, setAddShipment] = useState<boolean>(false);
    const [addProduct, setAddProduct] = useState<string>('sugar');
    const [addProduction, setAddProduction] = useState<string>('alabai');
    const [addSupplier, setAddSupplier] = useState<string>('sugar1');
    const [addDealer, setAddDealer] = useState<string>('product1');
    const [addQuantity, setAddQuantity] = useState(100);
    const [addQuantityProducts, setAddQuantityProducts] = useState(100);
    const [addProductName, setAddProductName] = useState<string>('');
    const [addProductionName, setAddProductionName] = useState<string>('Конфеты помадные «Алабай»');
    const [addSupplyName, setAddSupplyName] = useState<string>('');
    const [addDealerName, setAddDealerName] = useState<string>('');
    const [addSupMessage, setAddSupMessage] = useState<string>('');
    const [addShipMessage, setAddShipMessage] = useState<string>('');
    useEffect(()=>{
        if(suppliersAll){
            setAddSupplier(suppliersAll.filter((e:ISup) => e.product === addProduct.split(':')[0])[0].id);
        }
    }, [addProduct]);
    const addNewSupply = () => {
        if(suppliersAll){
            const sup = suppliersAll.filter((e:ISup) => e.id === addSupplier)[0];
            const newProduct = {
                date: (new Date().toISOString()),
                status: "новая",
                amount: addQuantity,
                delivery: sup.delivery,
                price: sup.price,
                product: addProductName,
                provider: addSupplyName.split(' —')[0],
                total: sup.price*addQuantity + sup.delivery
            }
            if(addProductName && addSupplyName){
                const tempSup = supplies?supplies:[];
                const tempComp = components?components:[];
                const indexComp = tempComp.indexOf(tempComp?.filter((e:IComponent) => e.name === addProductName)[0]);
                tempComp[indexComp].amount += addQuantity;
                tempSup.unshift(newProduct);
                setComponents(tempComp);
                setSupplies(tempSup);
                sessionStorage.setItem("components", JSON.stringify(tempComp));
                sessionStorage.setItem("supplies", JSON.stringify(tempSup));
                setAddSupply(false);
            } else {
                setAddSupMessage('Выберите продукт и поставщика');
                setTimeout(()=>{
                    setAddSupMessage('');
                }, 2000);
            }
        }
    };
    const addNewShipment = () => {
        if(products){
            const sup = products.filter((e:IProduct) => e.name === addProductionName)[0];
            const newProduct = {
                date: (new Date().toISOString()),
                status: "новая",
                amount: addQuantityProducts,
                delivery: costShipping,
                price: sup.price,
                product: addProductionName,
                provider: addDealerName,
                total: sup.price*addQuantityProducts + costShipping
            }
            if(addProductionName && addDealerName){
                const tempComp = products?products:[];
                const indexComp = tempComp.indexOf(tempComp?.filter((e:IProduct) => e.name === addProductionName)[0]);
                const newAmount = tempComp[indexComp].amount - addQuantityProducts;
                if(newAmount >= 0){
                    tempComp[indexComp].amount = newAmount;
                    const tempSup = shipments?shipments:[];
                    tempSup.unshift(newProduct);
                    setProducts(tempComp);
                    setShipments(tempSup);
                    sessionStorage.setItem("products", JSON.stringify(tempComp));
                    sessionStorage.setItem("shipments", JSON.stringify(tempSup));
                    setAddShipment(false);
                } else {
                    setAddShipMessage('Недостаточно продукции на складе');
                    setTimeout(()=>{
                        setAddShipMessage('');
                    }, 2000);
                }
            } else {
                setAddShipMessage('Выберите продукцию и покупателя');
                setTimeout(()=>{
                    setAddShipMessage('');
                }, 2000);
            }
        }
    };
    return (
        <section className={style.main}>
            <div className={style.headers}>
                <p className={style.mainHeader}>Продукты</p>
                <Button text="Заказать продукт" active={true} onClick={()=>{setAddSupply(true)}}/>
            </div>
            <p className={style.subHeader}>Основные ингредиенты</p>
            <div className={style.components}>
                {components && components.filter((e:IComponent) => e.type === "main").map((e:IComponent) => <div key={e.name} className={style.component}><p className={style.name}>{e.name}, кг</p><p className={clsx(style.amount, (e.amount < 150) && style.low)}>{e.amount}</p></div>)}
            </div>
            <p className={style.subHeader}>Ароматизаторы</p>
            <div className={style.components}>
                {components && components.filter((e:IComponent) => e.type === "flavoring").map((e:IComponent) => <div key={e.name} className={style.component}><p className={style.name}>{e.name}, кг</p><p className={clsx(style.amount, (e.amount < 3) && style.low)}>{e.amount}</p></div>)}
            </div>
            <div className={style.headers}>
                <p className={style.mainHeader}>Готовая продукция</p>
                <Button text="Создать отправление" active={true} onClick={()=>{setAddShipment(true)}}/>
            </div>
            <div className={style.components}>
                {products && products.map((e:IProduct) => <div className={style.component} key={e.name}><p className={style.name}>{e.name}, кг</p><p className={clsx(style.amount, (e.amount < 50) && style.low)}>{e.amount}</p></div>)}
            </div>
            <Modal active={addSupply} setActive={setAddSupply}>
                <p className={style.headerModal}>Заказ продукта</p>
                <p className={style.warning}>{addSupMessage}</p>
                <div>
                    <p className={style.label}>Продукт</p>
                    <Select value={addProduct} onChange={(e:any)=>{setAddProduct(e.value);setAddProductName(e.label)}}>
                        <Option value="chocolate" label="Шоколадная глазурь"/>
                        <Option value="sugar" label="Сахар-песок" />
                        <Option value="milk" label="Молоко сгущенное" />
                        <Option value="butter" label="Масло сливочное" />
                        <Option value="syrup" label="Патока" />
                        <Option value="flavours:lemon" label="Ароматизатор «Лимон»" />
                        <Option value="flavours:coconut" label="Ароматизатор «Кокос»" />
                        <Option value="flavours:vanilla" label="Ароматизатор «Ваниль»" />
                    </Select>
                    <Input onlyNumbers={true} active={true} value={addQuantity} setValue={setAddQuantity} messageInfo={''} label={"Количество, кг"}/>
                    <p className={style.label}>Поставщик</p>
                    <Select value={addSupplier} onChange={(e:any)=>{setAddSupplier(e.value);setAddSupplyName(e.label)}}>
                        {suppliersAll && suppliersAll.filter((e:ISup) => e.product === addProduct.split(':')[0]).map((e:ISup, i:number) => {
                            return <Option key={e.id} value={e.id} label={e.supplier + " — " + e.price + "₽/кг"}/>;
                        })}
                    </Select>
                    <p className={style.label}>Доставка</p>
                    <p className={style.price}>{suppliersAll && suppliersAll.filter((e:ISup) => e.id === addSupplier)[0].delivery}₽</p>
                    <p className={style.label}>Итого</p>
                    <p className={style.price}>{suppliersAll && +suppliersAll.filter((e:ISup) => e.id === addSupplier)[0].price * addQuantity + +suppliersAll.filter((e:ISup) => e.id === addSupplier)[0].delivery}₽</p>
                    <Button text="Создать заказ" active={true} onClick={()=>{addNewSupply()}}/>
                </div>
            </Modal>
            <Modal active={addShipment} setActive={setAddShipment}>
                <p className={style.headerModal}>Новое отправление</p>
                <p className={style.warning}>{addShipMessage}</p>
                <div>
                    <p className={style.label}>Продукция</p>
                    <Select value={addProduction} onChange={(e:any)=>{setAddProduction(e.value);setAddProductionName(e.label)}}>
                        <Option value="alabai" label="Конфеты помадные «Алабай»"/>
                        <Option value="buddha" label="Конфеты помадные «Будда»" />
                        <Option value="cornflower" label="Конфеты помадные «Василёк»" />
                    </Select>
                    <Input onlyNumbers={true} active={true} value={addQuantityProducts} setValue={setAddQuantityProducts} messageInfo={''} label={"Количество, кг"}/>
                    <p className={style.label}>Покупатель</p>
                    <Select value={addDealer} onChange={(e:any)=>{setAddDealer(e.value);setAddDealerName(e.label)}}>
                        <Option value="product1" label="ООО «Продуктовый магазин»"/>
                        <Option value="product2" label="ОООО «Продуктовый магазин»" />
                        <Option value="product3" label="ООООО «Продуктовый магазин»" />
                    </Select>
                    <p className={style.label}>Доставка</p>
                    <p className={style.price}>{costShipping}₽</p>
                    <p className={style.label}>Итого</p>
                    <p className={style.price}>{products && +products.filter((e:IProduct) => e.name === addProductionName)[0].price * addQuantityProducts + costShipping}₽</p>
                    <Button text="Создать заказ" active={true} onClick={()=>{addNewShipment()}}/>
                </div>
            </Modal>
        </section>
    )
}