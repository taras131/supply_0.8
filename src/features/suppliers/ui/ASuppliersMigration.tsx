import React from "react";
import {Button} from "@mui/material";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {emptySupplier, INewSupplier} from "../../../models/iSuppliers";
import {useAppDispatch} from "../../../hooks/redux";
import {fetchAddSupplier, fetchCompanyDataByInn} from "../model/actions";
import {setSupplierDate} from "../utils/services";

const ASuppliersMigration = () => {
    const dispatch = useAppDispatch();
    const clickHandler = () => {
        const q = query(collection(db, "suppliers"));
        const arr: INewSupplier[] = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc: any) => {
                const data = doc.data();
                const supplier = {
                    ...emptySupplier,
                    name: data.name,
                    INN: data.INN,
                };
                arr.push(supplier);
            });
            const dispatchWithDelay = async (items: INewSupplier[], index = 0) => {
                console.log(items[index]);
                if (index >= items.length) return;
                const res = await fetchCompanyDataByInn(+items[index].INN);
                if (res && res[0]) {
                    dispatch(fetchAddSupplier({
                        ...setSupplierDate(res[0]),
                        INN: items[index].INN,
                        firebase_id: items[index].id,
                    }));

                }
                setTimeout(() => {
                    dispatchWithDelay(items, index + 1);
                }, 1000);
            };
            dispatchWithDelay(arr);
        });
    };
    return (
        <Button onClick={clickHandler}>Стащить</Button>
    );
};

export default ASuppliersMigration;