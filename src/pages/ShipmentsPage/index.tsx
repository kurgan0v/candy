import React, {useEffect, useState} from 'react';
import style from './style.module.scss';
import {Table} from "../../components/Table";
import {ISupply} from "../../App";

interface IShipments{
    shipments: Array<ISupply> | undefined
}
export const ShipmentsPage = ({shipments}:IShipments) => {
    return(
        <Table supplies={shipments} page="shipments"/>
    );
}