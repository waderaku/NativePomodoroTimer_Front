// React
import { FC, useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import StopWatchScreen from "./atoms/StopWatchScreen";
import { startTimeState } from "../../atoms";
import ConfirmDialog from "./ConfirmDialog";
import { confirmFinishFactory, timerFinishFactory, cancelFinishFactory } from "../../factory";
import { Task } from "../../interfaces";
import { Text, Button } from 'react-native-elements';
// State
import { useRecoilState } from "recoil";
import styles from "../../style";
interface PomodoroStopWatchProps {
    userId: string;
    task: Task;
}

const PomodoroStopWatch: FC<PomodoroStopWatchProps> = (props) => {
    // Modalの中身作成
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startTime, setStartTime] = useRecoilState(startTimeState);
    useEffect(() => {
        setStartTime(new Date());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // eslint-disable-next-line
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } = useStopwatch({
        autoStart: true,
    });
    const dispHours = ('00' + hours).slice(-2);
    const dispMinutes = ('00' + minutes).slice(-2);
    const dispSeconds = ('00' + seconds).slice(-2);

    const confirmFinish = confirmFinishFactory(pause, handleOpen);
    const finishName = "finish";

    const buttonData = {
        onPress: confirmFinish,
        title: finishName,
    };
    const finish = timerFinishFactory(props.userId, props.task, startTime, handleClose);
    const cancel = cancelFinishFactory(start, handleClose);

    return (
        <>
            <Text style={styles.text}>{props.task.name}</Text>
            <StopWatchScreen minutes={dispMinutes} seconds={dispSeconds} hours={dispHours} />
            <Button {...buttonData}></Button>

            <ConfirmDialog
                open={open}
                onClose={handleClose}
                finishFunc={finish}
                cancelFunc={cancel}
            ></ConfirmDialog>
        </>
    );
};
export default PomodoroStopWatch;
