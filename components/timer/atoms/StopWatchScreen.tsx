// React
import { FC } from "react";

import { Text } from 'react-native-elements';
import styles from "../../../style";

interface StopWatchScreenProps {
    hours: string,
    minutes: string,
    seconds: string,
}

const StopWatchScreen: FC<StopWatchScreenProps> = (props) => {

    return (
        <Text style={styles.text}>{props.hours}:{props.minutes}:{props.seconds}</Text>
    )
}
export default StopWatchScreen;