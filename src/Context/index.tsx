import React, { useState, createContext, ReactNode } from 'react';
import { AppContextInterface, ContextProps, CoinListItem, Accounts, Recent } from '../Router/types';
import User1 from "../../assets/images/User-1.svg";
import User2 from "../../assets/images/User-2.svg";
import User3 from "../../assets/images/User-3.svg";


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
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Received",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Received",
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
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Received",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Received",
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
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Sent",
                    amount: 2.35,
                    date: "Mar 4 at 11:04am"
                },
                {
                    type: "Received",
                    amount: 1.876,
                    date: "Mar 3 at 10:04am"
                },
                {
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am"
                },
            ]
        }
    ]);

    const [accounts, setAccounts] = useState<Accounts[]>([
        {
            id: 1,
            name: "Account 1",
            avatar: <User1 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,
            balance: 9.2362,
            adress:"0x4Dc6...DxR9"
        },
        {
            id: 2,
            name: "Account 2",
            avatar: <User2 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,
            balance: 2.43,
            adress:"0x3Dc6...DxE9"

        },
        {
            id: 3,
            name: "Account 3",
            avatar: <User3 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,
            balance: 1.27,
            adress:"0x2Dc6...DcT9"

        }
    ]);

    const [recent,setRecent]= useState<Recent[]>([
        {
            id:1,
            name:"Beexay",
            adress:"0x3Dc6...DxE9",
            avatar: <User1 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
        {
            id:1,
            name:"Dasun Bussi",
            adress:"0x2Dc6...DcT9",
            avatar: <User2 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
        {
            id:1,
            name:"Smart Gevan",
            adress:"0x3R2E...DxR9",
            avatar: <User3 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
    ])
    const data: AppContextInterface = {
        coinList, setCoinList, accounts, setAccounts,recent,setRecent
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    );
}