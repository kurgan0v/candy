import React, {useEffect, useState} from 'react';
import {
    Routes,
    Route, useLocation, useNavigate
} from "react-router-dom";
import {FactoryPage} from './pages/FactoryPage';
import {StoragePage} from './pages/StoragePage';
import {SuppliesPage} from './pages/SuppliesPage';
import {ShipmentsPage} from './pages/ShipmentsPage';
import {Login} from './pages/Login';
import {Header} from './components/Header';
import './App.css';
import {Button} from "./components/Button";

export interface ISupply {
    date: string,
    status: string,
    provider: string,
    product: string,
    price: number,
    amount: number,
    delivery: number,
    total: number
}

export interface IComponent {
    name: string,
    type: string,
    amount: number
}

export interface IProduct {
    name: string,
    amount: number,
    price: number
}

export interface ISup {
    supplier: string,
    product: string,
    id: string,
    price: number,
    delivery: number
}
declare global {
    interface Window {
        gapi:any;
    }
}
function App() {
    const history = useNavigate();
    const emails = ['kurganov.daniil.11@gmail.com'];
    const [activePage, setActivePage] = useState<string>('');
    const pages = ['Производство', 'Склад', 'Поставки', 'Отгрузки'];
    const links = ['factory', 'storage', 'supplies', 'shipments'];
    const [suppliersAll, setSuppliersAll] = useState<Array<ISup>>();
    const [components, setComponents] = useState<Array<IComponent>>();
    const [products, setProducts] = useState<Array<IProduct>>();
    const [supplies, setSupplies] = useState<Array<ISupply>>();
    const [shipments, setShipments] = useState<Array<ISupply>>();
    const [email, setEmail] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');
    const [name, setName] = useState<string>('');
    const signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn().then((googleUser:any) => {
            const profile = googleUser.getBasicProfile();
            setEmail(profile.getEmail());
            setPhoto(profile.getImageUrl());
            setName(profile.getName());
            history('app/factory');
        })
    }
    useEffect(() => {
        const _onInit = (auth2:any) => {
            console.log('init OK')
        }
        const _onError = (err:any) => {
            console.log('error', err)
        }
        setTimeout(()=>{
            window.gapi.load('auth2', function() {
                window.gapi.auth2
                    .init({
                        client_id:
                        process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        plugin_name: "candy"
                    })
                    .then(_onInit, _onError)
            });
        }, 1000);
        const sups = sessionStorage.getItem('suppliersAll');
        const comp = sessionStorage.getItem('components');
        const prod = sessionStorage.getItem('products');
        const supplies = sessionStorage.getItem('supplies');
        const ships = sessionStorage.getItem('dealers');
        if (typeof sups === "string") {
            setSuppliersAll(JSON.parse(sups));
        }
        if (typeof comp === "string") {
            setComponents(JSON.parse(comp));
        }
        if (typeof prod === "string") {
            setProducts(JSON.parse(prod));
        }
        if (typeof supplies === "string") {
            setSupplies(JSON.parse(supplies));
        }
        if (typeof ships === "string") {
            setShipments(JSON.parse(ships));
        }
    }, []);
    const checkEmail = ()=>{
        return emails.indexOf(email) + 1;
    }
    const signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
            setEmail("");
            setName("");
            setPhoto("");
            history('/');
        })
    }
    return (
        <>
            {email && !!checkEmail() && <Header activePage={activePage} setActivePage={setActivePage} pages={pages} links={links} name={name} photo={photo} signOut={signOut}/>}
            {email && !checkEmail() && <div id="accessDeniedWrap">
                <p id="accessDenied">Доступ запрещён</p>
                <Button text={"Выйти"} active={true} onClick={signOut} />
            </div>}
            <Routes>
                {email && !!checkEmail() && <Route path="app">
                    <Route path="factory" element={<FactoryPage components={components}/>}/>
                    <Route path="storage"
                           element={<StoragePage suppliersAll={suppliersAll} components={components} products={products}
                                                 setSupplies={setSupplies} setShipments={setShipments} supplies={supplies} shipments={shipments} setComponents={setComponents} setProducts={setProducts}/>}/>
                    <Route path="supplies" element={<SuppliesPage supplies={supplies}/>}/>
                    <Route path="shipments" element={<ShipmentsPage shipments={shipments}/>}/>
                </Route>}
                {!email && <Route path="/" element={<Login signIn={signIn}/>}/>}
            </Routes>
        </>
    );
}

export default App;


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
sessionStorage.setItem("supplies", JSON.stringify(supplies));

const dealers = [
    {
        date: '2022-07-02',
        status: 'выполнена',
        provider: 'ОАО «Продуктовый магазин»',
        product: 'Конфеты помадные «Алабай»',
        price: 140,
        amount: 200,
        delivery: 1000,
        total: 29000
    },
    {
        date: '2022-06-19',
        status: 'выполнена',
        provider: 'ОАО «Продуктовый магазин»',
        product: 'Конфеты помадные «Василёк»',
        price: 150,
        amount: 200,
        delivery: 1000,
        total: 33000
    },
    {
        date: '2022-05-21',
        status: 'выполнена',
        provider: 'ОАО «Продуктовый магазин»',
        product: 'Конфеты помадные «Василёк»',
        price: 150,
        amount: 200,
        delivery: 1000,
        total: 33000
    },
    {
        date: '2022-04-05',
        status: 'выполнена',
        provider: 'ОАО «Продуктовый магазин»',
        product: 'Конфеты помадные «Алабай»',
        price: 140,
        amount: 200,
        delivery: 1000,
        total: 29000
    },
];
sessionStorage.setItem("dealers", JSON.stringify(dealers));

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
sessionStorage.setItem("components", JSON.stringify(components));

const products = [
    {
        name: "Конфеты помадные «Алабай»",
        amount: 410,
        price: 140
    },
    {
        name: "Конфеты помадные «Будда»",
        amount: 280,
        price: 150
    },
    {
        name: "Конфеты помадные «Василёк»",
        amount: 45,
        price: 160
    }
];
sessionStorage.setItem("products", JSON.stringify(products));
const suppliersAll = [
    {
        supplier: "ООО «Сахар»",
        product: "sugar",
        id: "sugar1",
        price: 12.5,
        delivery: 1200
    },
    {
        supplier: "ОАО «Сахар»",
        product: "sugar",
        id: "sugar2",
        price: 12.9,
        delivery: 1000
    },
    {
        supplier: "ЗАО «Сахар»",
        product: "sugar",
        id: "sugar3",
        price: 15,
        delivery: 0
    },
    {
        supplier: "ООО «Шоколад»",
        product: "chocolate",
        id: "chocolate1",
        price: 37,
        delivery: 2000
    },
    {
        supplier: "ОАО «Молоко»",
        product: "milk",
        id: "milk1",
        price: 22,
        delivery: 500
    },
    {
        supplier: "ЗАО «Масло»",
        product: "butter",
        id: "butter1",
        price: 50,
        delivery: 0
    },
    {
        supplier: "ОАО «Патока»",
        product: "syrup",
        id: "syrup1",
        price: 50,
        delivery: 0
    },
    {
        supplier: "ЗАО «Арома»",
        product: "flavours",
        id: "flavours1",
        price: 400,
        delivery: 0
    }
];
sessionStorage.setItem("suppliersAll", JSON.stringify(suppliersAll));