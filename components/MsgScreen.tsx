import { FC } from 'react';

import { Text } from "react-native";
import styles from '../style';
interface MsgScreenProps {
    msg: string,
}

const MsgScreen: FC<MsgScreenProps> = (props) => {
    return (
        <Text style={styles.text}>{props.msg}</Text>
    )
};

export default MsgScreen;