import React, { FC } from "react";
import {
    createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import 'localstorage-polyfill';

// State
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState, selectedTaskState, timerConfigState } from "../atoms";

// Component
import Main from "./Main";
import SideBar from "./SideBar";
type HomeNavigationParamList = {
    Home: undefined;
};



const Drawer = createDrawerNavigator<HomeNavigationParamList>();

const Navigation: FC = () => {
    const isLoggedIn = useRecoilValue(isLoggedInState);
    const [selectedTask, setSelectedTask] = useRecoilState(selectedTaskState);
    const setTimerConfig = useSetRecoilState(timerConfigState)
    if (isLoggedIn) {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => <SideBar selectedTask={selectedTask} setSelectedTask={setSelectedTask} closeDrawer={props.navigation.closeDrawer} setTimerConfig={setTimerConfig}></SideBar>}
                >
                    <Drawer.Screen name="Home" component={(props) => <Main openDrawer={props.navigation.openDrawer} />}
                        options={{ headerShown: false }} />
                </Drawer.Navigator>
                <StatusBar style="auto" />
            </NavigationContainer >
        );
    }
    else {
        return (
            <Main openDrawer={() => { }}></Main>
        );
    }
}

export default Navigation;