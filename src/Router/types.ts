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
}

export type Transaction = {
    type: "Received" | "Sent";
    date: string;
    amount: number;
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


