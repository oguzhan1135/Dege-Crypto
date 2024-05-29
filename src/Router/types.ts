import { ReactNode } from "react";

export type RootStackParamList = {
    Onboarding: undefined;
}
export type OnboardingStackParamList = {
    SlashPage: undefined;
    Walthought: undefined;
    WalletSetUp: undefined;
    ImportSeed: undefined;
    CreateNewWallet: undefined;
    Homescreen: undefined;
    TokenDetail: TokenDetailParams;
}
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
    coinList: CoinListItem[]; setCoinList: (tokenList: CoinListItem[]) => void;

}

export type Transaction = {
    type: "Recived" | "Sent",
    date: string;
    amount: number;
}

export type CoinListItem = {
    id: number;
    coinName: string;
    currency: string;
    balance: number;
    rate: number;
    onTheRise: boolean;
    percent: number;
    transaction: Transaction[];

}
