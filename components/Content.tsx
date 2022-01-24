import React, { FC } from "react";
import { Task } from "../interfaces";

import { Text } from 'react-native-elements';
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SelectTimer from "./timer/SelectTimer";
import PomodoroTimer from "./timer/PomodoroTimer";
import PomodoroStopWatch from "./timer/PomodoroStopWatch";

import { Provider } from 'react-native-paper';


interface ContentProps {
    userId: string;
    selectedTask: Task | null;
    timerConfig: number | null;
    setTimerConfig(timerConfig: number | null): void;
}
const Content: FC<ContentProps> = (props) => {
    let content;
    if (props.selectedTask) {
        if (props.timerConfig != null) {
            if (props.timerConfig) {
                content = (
                    <PomodoroTimer
                        userId={props.userId}
                        timerConfig={props.timerConfig}
                        task={props.selectedTask}
                    ></PomodoroTimer>
                );
            } else {
                content = (
                    <PomodoroStopWatch userId={props.userId} task={props.selectedTask}></PomodoroStopWatch>
                );
            }

        } else {
            content = (
                <SelectTimer task={props.selectedTask} setTimerConfig={props.setTimerConfig}></SelectTimer>
            )
        }
    } else {
        content = (
            <Text style={styles.text}>Choose task</Text>);
    }
    return (
        <Provider >
            < SafeAreaProvider >
                {content}
            </SafeAreaProvider >

        </Provider >
    );
};

export default Content;

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        padding: 5,
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});