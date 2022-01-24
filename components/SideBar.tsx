import { FC } from "react";

import { Task } from "../interfaces";

import { useRecoilValue, useRecoilState } from "recoil";
import { taskListState, userIdState } from "../atoms";
import { Drawer } from 'react-native-paper';
import React from "react";

interface SideBarProps {
    selectedTask: Task | null;
    setSelectedTask(task: Task | null): void;
    closeDrawer(): void;
    setTimerConfig(timerConfig: number | null): void;
}

const SideBar: FC<SideBarProps> = (props) => {
    const userId = useRecoilValue(userIdState);
    const [taskList, setTaskList] = useRecoilState(taskListState);
    let id = "";
    if (props.selectedTask) {
        id = props.selectedTask.id
    }
    const onPush = (task: Task) => {
        props.setSelectedTask(task);
        props.setTimerConfig(null);
        props.closeDrawer();
    }
    return (
        <Drawer.Section title="タスク一覧">
            {taskList.map((task, index) => (
                <Drawer.Item
                    label={task.name}
                    active={id === task.id}
                    onPress={() => onPush(task)}
                />
            ))}
        </Drawer.Section>
    );
};

export default SideBar;
