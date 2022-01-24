// React
import { FC } from "react";

import { Text } from 'react-native-elements';
import styles from "../../../style";

interface TimerScreenProps {
    minutes: string,
    seconds: string
}


const TimerScreen: FC<TimerScreenProps> = (props) => {

    return (
        <Text style={styles.text}>{props.minutes}:{props.seconds}</Text>
    )
}
export default TimerScreen;