
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