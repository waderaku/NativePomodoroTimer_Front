import React, { FC, useCallback, useEffect } from "react";

// State
import { atom } from "recoil";
import { TaskList, Calendar, UserConfig, Task } from "../interfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "../atoms";

import { RadioButton, Button, Provider } from 'react-native-paper';
import { Text } from 'react-native-elements';

// axios
import axios from "axios";

// endpoint
import MsgScreen from "./MsgScreen";

// API
import { fetchTaskList, fetchCalendar, fetchTask } from "../api";

import styles from "../style";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SystemConst } from "../env";


const BackendURL = SystemConst.REACT_APP_BACKEND_URL;

const taskListListState = atom<TaskList[]>({
    key: "taskList",
    default: [],
});

const calendarListState = atom<Calendar[]>({
    key: "calendar",
    default: [],
});

// Define Enum
const StepList = {
    TASKLIST: "TASKLIST",
    CALENDAR: "CALENDAR",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
} as const;
type Step = typeof StepList[keyof typeof StepList];

interface State {
    step: Step;
    taskListId: string;
    calendarId: string;
}

let configState = atom<State>({
    key: "configState",
    default: {
        step: StepList.TASKLIST,
        taskListId: "",
        calendarId: "",
    },
});

interface ConfigScreenProps {
    userConfig: UserConfig;
    setUserConfig(config: UserConfig): void;
    setTaskList(task: Task[]): void
}

const ConfigScreen: FC<ConfigScreenProps> = (props: ConfigScreenProps) => {
    const [taskListList, setTaskListList] = useRecoilState(taskListListState);
    const [calendarList, setCalendarList] = useRecoilState(calendarListState);
    const [state, setState] = useRecoilState(configState);
    const userId = useRecoilValue(userIdState);
    const sendConfig = async (config: UserConfig) => {
        console.log("config", config);
        axios
            .put<boolean>(`${BackendURL}/user`, config, {
                headers: {
                    "Content-Type": "application/json",
                    id: userId,
                },
            })
            .then(() => {
                setState({ ...state, step: StepList.SUCCESS });
                console.log("refreshing");
                fetchTask(userId).then((taskList: Task[]) => {
                    props.setTaskList(taskList);
                });
                props.setUserConfig(config);
            })
            .catch(() => {
                setState({ ...state, step: StepList.FAILURE });
            });
    };

    const initState = useCallback(() => {
        fetchTaskList(userId).then((taskListList: TaskList[]) => {
            setTaskListList(taskListList);
        });
        fetchCalendar(userId).then((calendarList: Calendar[]) => {
            setCalendarList(calendarList);
        });
        const initState = {
            ...state,
            taskListId: props.userConfig.taskListId,
            calendarId: props.userConfig.calendarId,
        };
        setState(initState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        initState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const nextStep = () => {
        if (state.step !== StepList.TASKLIST) {
            throw Error("Unexpected Step!");
        }
        const nextState = { ...state, step: StepList.CALENDAR };
        setState(nextState);
    };
    const handleChange: (key: string) => (value: string) => void =
        (key) => (value) => {
            const nextState = {
                ...state,
                [key]: value,
            };
            setState(nextState);
        };
    const hundleSubmit: () => void = () => {
        const config: UserConfig = {
            taskListId: state.taskListId,
            calendarId: state.calendarId,
        };
        sendConfig(config);

    };

    const taskListForm = (
        <>
            <Text style={styles.h3}>Select Task List</Text>
            <RadioButton.Group onValueChange={value => handleChange("taskListId")(value)} value={state.taskListId}>
                {taskListList.map((taskList, idx) => {
                    return (
                        <RadioButton.Item mode="ios" style={styles.radioBottuon} label={taskList.summary} value={taskList.id} />
                    );
                })}
            </RadioButton.Group>
            <Button style={styles.configButton} onPress={nextStep}>Next</Button>
        </>
    );
    const calendarForm = (
        <>
            <Text style={styles.h3}>Select Calender</Text>
            <RadioButton.Group onValueChange={value => handleChange("calendarId")(value)} value={state.taskListId}>
                {calendarList.map((calendar, idx) => {
                    return (
                        <RadioButton.Item style={styles.radioBottuon} label={calendar.summary} value={calendar.id} />
                    );
                })}
            </RadioButton.Group>
            <Button style={styles.configButton} onPress={hundleSubmit}>Submit</Button>
        </>
    );
    const successScreen = <MsgScreen msg="Successfully Configured Your Calendar and Task List!" />;
    const failureScreen = <MsgScreen msg="Configuration Failure. Please Contact Us." />;
    const content = (() => {
        switch (state.step) {
            case StepList.TASKLIST: {
                return taskListForm;
            }
            case StepList.CALENDAR: {
                return calendarForm;
            }
            case StepList.SUCCESS: {
                return successScreen;
            }
            case StepList.FAILURE: {
                return failureScreen;
            }
            default:
                throw Error("Unexpected Step");
        }
    })();

    return (
        <Provider >
            < SafeAreaProvider >
                {content}
            </SafeAreaProvider>
        </Provider>
    );
};

export default ConfigScreen;
