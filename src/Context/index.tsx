import React, { useState, createContext, ReactNode } from 'react';
import { AppContextInterface, ContextProps, CoinListItem } from '../Router/types';




export const MainContext = createContext<AppContextInterface>({} as AppContextInterface);

export const MainProvider = ({ children }: ContextProps) => {
    const [coinList, setCoinList] = useState<CoinListItem[]>([
        {
            id: 1,
            coinName: "Binance Coin",
            currency: "BNB",
            balance: 19.2371,
            rate: 226.69,
            onTheRise: true,
            percent: 2,
            transaction: [
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Recived",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
            ]
        },
        {
            id: 2,
            coinName: "USD Coin",
            currency: "USDC",
            balance: 92.3,
            rate: 1,
            onTheRise: true,
            percent: 4.3,
            transaction: [
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Recived",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
            ]
        },
        {
            id: 3,
            coinName: "Synthetix",
            currency: "BNB",
            balance: 42.74,
            rate: 20.83,
            onTheRise: false,
            percent: 1.3,
            transaction: [
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Recived",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Recived",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
            ]
        }
    ]);


    const data: AppContextInterface = {
        coinList, setCoinList
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    );
}