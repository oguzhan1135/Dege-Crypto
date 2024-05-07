import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SlashPage from "../Screens/SlashPage";
import Walthought from "../Screens/Walthought";
import WalletSetUp from "../Screens/WalletSetUp";
export type RootStackParamList = {
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
}
export type OnboardingStackParamList = {
    SlashPage: undefined;
    Walthought: undefined;
    WalletSetUp: undefined;

}

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <OnboardingStack.Screen name="SlashPage" component={SlashPage} />
            <OnboardingStack.Screen name="Walthought" component={Walthought} />
            <OnboardingStack.Screen name="WalletSetUp" component={WalletSetUp} />


        </OnboardingStack.Navigator>
    )
}
export const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        </RootStack.Navigator>
    )
}