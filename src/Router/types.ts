import { ReactNode } from "react";
import { SvgProps } from "react-native-svg";

export type RootStackParamList = {
    Onboarding: { screen: keyof OnboardingStackParamList, params?: CommonParams };
};

export type OnboardingStackParamList = {
    SlashPage: undefined;
    Walthought: undefined;
    WalletSetUp: undefined;
    ImportSeed: undefined;
    CreateNewWallet: undefined;
    Homescreen: undefined;
    TokenDetail: TokenDetailParams;
    Setting: undefined;
    Preferences: undefined;
};

export interface CommonParams {
}

export interface TokenDetailParams extends CommonParams {
    balance: number;
    currency: string;
    rate: number;
}

export type ContextProps = {
    children: ReactNode;
}

export type AppContextInterface = {
    coinList: CoinListItem[];
    setCoinList: (tokenList: CoinListItem[]) => void;
    accounts: Accounts[];
    setAccounts: (accounts: Accounts[]) => void;
    recent: Recent[];
    setRecent: (recent: Recent[]) => void;
    sentAccount?: Accounts;
    setSentAccount: (sentAccount: Accounts) => void;
    receiverAccount?: Recent;
    setReceiverAccount: (receiverAccount: Recent) => void;
    sentCoin?: SentCoin;
    setSentCoin: (sentCoin: SentCoin) => void;
    tokenFee?: number;
    setTokenFee: (tokenFee: number) => void;
    swapMessage: string;
    setSwapMessage: (swapMessage: string) => void;
    sentMessage: string;
    setSentMessage: (sentmessage: string) => void;
}

export type Transaction = {
    id: number;
    type: "Received" | "Sent";
    date: string;
    amount: number;
    networkFee: number;
    paymenToAdress: string;
    currency: string;
    status: "Cancelled" | "Submitted" | "Confirmed"
}

export type CoinListItem = {
    id: number;
    coinName: string;
    currency: string;
    rate: number;
    onTheRise: boolean;
    percent: number;
}

export interface Accounts {
    id: number;
    name: string;
    avatar: React.JSX.Element;
    balance: Balance[];
    adress: string;
    transaction: Transaction[];
    password: string;
}
interface Balance {
    coinName: string;
    balance: number;
}
export interface AccountProp {
    currency: string;
}
export type Recent = {
    id: number;
    name: string;
    adress: string;
    avatar: React.JSX.Element
}
export type SentCoin = {
    currency: string;
    amount: number;
    balance: number;
}



