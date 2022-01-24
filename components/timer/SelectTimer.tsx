import { FC } from "react";
import { Task } from "../../interfaces";
import { View, StyleSheet } from "react-native";
import { Text, ButtonGroup } from 'react-native-elements';
import styles from "../../style";

interface SelectTimerProps {
    setTimerConfig(x: number): void;
    task: Task;
}

const SelectTimer: FC<SelectTimerProps> = (props) => {

    const buttonDataList = [
        "5分", "15分", "30分", "∞"
    ]
    const setTimerValueList = [5, 15, 30, 0]

    return (
        <>
            <Text style={styles.text}>{props.task.name}</Text>
            <ButtonGroup
                buttons={buttonDataList}
                onPress={(value) => {
                    props.setTimerConfig(setTimerValueList[value]);
                }}
                containerStyle={{ marginTop: 20, width: 200 }}
            />
        </ >
    )
}


export default SelectTimer;