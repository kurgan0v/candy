import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Table} from "../../components/Table";
import {ISupply} from "../../App";

interface ISupplies{
    supplies: Array<ISupply> | undefined
}

export const SuppliesPage = ({supplies}:ISupplies) => {
    return(
        <>
            <Table supplies={supplies} page="supplies"/>
        </>
    );
}