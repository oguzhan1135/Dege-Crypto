import React, { useState, createContext, ReactNode } from 'react';
import { AppContextInterface, ContextProps, CoinListItem, Accounts, Recent, SentCoin } from '../Router/types';
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
            rate: 226.69,
            onTheRise: true,
            percent: 2,

        },
        {
            id: 2,
            coinName: "USD Coin",
            currency: "USDC",
            rate: 1,
            onTheRise: true,
            percent: 4.3,

        },
        {
            id: 3,
            coinName: "Synthetix",
            currency: "SNX",
            rate: 20.83,
            onTheRise: false,
            percent: 1.3,
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
            balance: [
                {
                    coinName: "BNB",
                    balance: 19.2371
                },
                {
                    coinName: "USDC",
                    balance: 92.3
                },
                {
                    coinName: "SNX",
                    balance: 42.74
                },
                {
                    coinName: "ETH",
                    balance: 9.2362
                }
            ],
            adress: "0x4Dc6...DxR9",
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
            name: "Account 2",
            avatar: <User2 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,

            balance: [
                {
                    coinName: "BNB",
                    balance: 14.15
                },
                {
                    coinName: "USDC",
                    balance: 104
                },
                {
                    coinName: "SNX",
                    balance: 35.18
                },
                {
                    coinName: "ETH",
                    balance: 2.43
                }
            ],
            adress: "0x3Dc6...DxE9",
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
            name: "Account 3",
            avatar: <User3 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />,
            balance: [
                {
                    coinName: "BNB",
                    balance: 9.2371
                },
                {
                    coinName: "USDC",
                    balance: 69
                },
                {
                    coinName: "SNX",
                    balance: 210
                },
                {
                    coinName: "ETH",
                    balance: 41.14
                }
            ],
            adress: "0x2Dc6...DcT9",
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
    const [sentCoin, setSentCoin] = useState<SentCoin>()
    const [sentAccount, setSentAccount] = useState<Accounts>();
    const [receiverAccount, setReceiverAccount] = useState<Recent>();
    const [recent, setRecent] = useState<Recent[]>([
        {
            id: 1,
            name: "Beexay",
            adress: "0x3Dc6...DxE9",
            avatar: <User1 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
        {
            id: 1,
            name: "Dasun Bussi",
            adress: "0x2Dc6...DcT9",
            avatar: <User2 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
        {
            id: 1,
            name: "Smart Gevan",
            adress: "0x3R2E...DxR9",
            avatar: <User3 style={{
                width: 32,
                height: 32,
                transform: [{ scale: 1.5 }]
            }} />
        },
    ])
    const data: AppContextInterface = {
        coinList, setCoinList, accounts, setAccounts, recent, setRecent, sentAccount, setSentAccount, receiverAccount, setReceiverAccount, sentCoin, setSentCoin
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    );
}