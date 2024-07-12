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
        },
        {
            id: 4,
            coinName: "Etherium",
            currency: "ETH",
            rate: 1825,
            onTheRise: true,
            percent: 0.7,
        },
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
                    id: 1,
                    type: "Received",
                    amount: 0.04,
                    date: "Mar 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 2,
                    type: "Received",
                    amount: 1.88,
                    date: "Aug 14 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 3,
                    type: "Sent",
                    amount: 2.35,
                    date: "Sep 4 at 11:04am",
                    networkFee: 0.08,
                    paymenToAdress: "0x3Dc6...DxE12",
                    currency: "BNB",
                    status: "Cancelled"
                },
                {
                    id: 4,
                    type: "Received",
                    amount: 1.876,
                    date: "Aug 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 5,
                    type: "Received",
                    amount: 410,
                    date: "Feb 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 6,
                    type: "Received",
                    amount: 100,
                    date: "Aug 30 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Cancelled"
                },
                {
                    id: 7,
                    type: "Received",
                    amount: 3,
                    date: "Feb 12 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Confirmed"
                },
                {
                    id: 8,
                    type: "Received",
                    amount: 10,
                    date: "Jan 21 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Cancelled"
                },
            ],
            password: "Example123"
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
                    id: 1,
                    type: "Received",
                    amount: 0.09,
                    date: "Mar 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 2,
                    type: "Received",
                    amount: 1.14,
                    date: "Aug 14 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 3,
                    type: "Sent",
                    amount: 1.95,
                    date: "Sep 4 at 11:04am",
                    networkFee: 0.08,
                    paymenToAdress: "0x3Dc6...DxE12",
                    currency: "BNB",
                    status: "Cancelled"
                },
                {
                    id: 4,
                    type: "Received",
                    amount: 2.176,
                    date: "Aug 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Cancelled"
                },
                {
                    id: 5,
                    type: "Received",
                    amount: 110,
                    date: "Feb 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 6,
                    type: "Received",
                    amount: 100,
                    date: "Aug 30 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 7,
                    type: "Received",
                    amount: 1,
                    date: "Feb 12 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Cancelled"
                },
                {
                    id: 8,
                    type: "Received",
                    amount: 8,
                    date: "Jan 21 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Confirmed"
                },
            ],
            password: "Example123"

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
                    balance: 24.2371
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
                    id: 1,
                    type: "Received",
                    amount: 0.009,
                    date: "Mar 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Cancelled"
                },
                {
                    id: 2,
                    type: "Received",
                    amount: 0.98,
                    date: "Aug 14 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE9",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 3,
                    type: "Sent",
                    amount: 4.174,
                    date: "Sep 4 at 11:04am",
                    networkFee: 0.08,
                    paymenToAdress: "0x3Dc6...DxE12",
                    currency: "BNB",
                    status: "Confirmed"
                },
                {
                    id: 4,
                    type: "Received",
                    amount: 910,
                    date: "Aug 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Cancelled"
                },
                {
                    id: 5,
                    type: "Received",
                    amount: 201,
                    date: "Feb 3 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 6,
                    type: "Received",
                    amount: 66,
                    date: "Aug 30 at 10:04am",
                    networkFee: 0.12,
                    paymenToAdress: "0x3Dc6...DxL9",
                    currency: "USDC",
                    status: "Confirmed"
                },
                {
                    id: 7,
                    type: "Received",
                    amount: 6,
                    date: "Feb 12 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Confirmed"
                },
                {
                    id: 8,
                    type: "Received",
                    amount: 3.89,
                    date: "Jan 21 at 10:04am",
                    networkFee: 0.13,
                    paymenToAdress: "0x3Dc6...DxE14",
                    currency: "SNX",
                    status: "Confirmed"
                },
            ],
            password: "Example123"

        }
    ]);
    const [sentCoin, setSentCoin] = useState<SentCoin>()
    const [sentAccount, setSentAccount] = useState<Accounts>();
    const [receiverAccount, setReceiverAccount] = useState<Recent>();
    const [tokenFee, setTokenFee] = useState<number>();
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
    const [swapMessage, setSwapMessage] = useState<string>("");
    const [sentMessage, setSentMessage] = useState<string>("");
    const data: AppContextInterface = {
        coinList, setCoinList, accounts, setAccounts, recent, setRecent, sentAccount, setSentAccount,
        receiverAccount, setReceiverAccount, sentCoin, setSentCoin, tokenFee, setTokenFee, swapMessage,
        setSwapMessage, sentMessage, setSentMessage
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    );
}