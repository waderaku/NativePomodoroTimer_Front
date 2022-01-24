// React
import React, { FC } from "react";


import 'localstorage-polyfill';
// Components
import TitledToolbar from "./TitledToolbar";
import { StyleSheet } from "react-native";

// State
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInState, userIdState } from "../atoms";

// API
import LoggedOutScreen from "./LoggedOutScreen";
import { View } from "react-native";
import LoggedInScreen from "./LoggedInScreen";
const drawerWidth = 240;

interface MainProps {
    openDrawer(): void;
}

const Main: FC<MainProps> = (props) => {
    const appTitle = "PomodoroTimer(仮)";
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const setUserId = useSetRecoilState(userIdState);
    const MainScreen: FC = () => {
        if (isLoggedIn) {
            return <LoggedInScreen />;
        } else {
            return <LoggedOutScreen />;
        }
    };
    const logout = () => {
        setUserId("");
    }
    return (
        <View style={styles.container}>
            <TitledToolbar appTitle={appTitle} isLoggedIn={isLoggedIn} logout={logout} openDrawer={props.openDrawer} />
            <MainScreen />
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    drawer: {
        width: "40%",
    }
});