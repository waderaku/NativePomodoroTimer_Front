// React
import React, { FC, useLayoutEffect } from "react";

// // Components
import Content from "./Content";
import ConfigScreen from "./ConfigScreen";

// State
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  isConfiguredState,
  userConfigState,
  userIdState,
  selectedTaskState,
  timerConfigState,
  taskListState,
} from "../atoms";

// API
import { fetchTask, fetchUserConfig } from "../api";

// Interfaces
import { Task, UserConfig } from "../interfaces";


export const LoggedInScreen: FC = () => {
  const userId = useRecoilValue(userIdState);
  const [userConfig, setUserConfig] = useRecoilState(userConfigState);
  const selectedTask = useRecoilValue(selectedTaskState);
  const [timerConfig, setTimerConfig] = useRecoilState(timerConfigState);
  const setTaskList = useSetRecoilState(taskListState);

  useLayoutEffect(() => {
    fetchUserConfig(userId).then((userConfig: UserConfig) => {
      setUserConfig(userConfig);
    });
    fetchTask(userId).then((taskList: Task[]) => {
      setTaskList(taskList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isConfigured = useRecoilValue(isConfiguredState);

  const ConditionedLoggedInScreen: FC = () => {
    if (isConfigured) {
      return (
        <Content
          selectedTask={selectedTask}
          userId={userId}
          timerConfig={timerConfig}
          setTimerConfig={setTimerConfig}
        />
      );
    } else {
      return <ConfigScreen userConfig={userConfig} setUserConfig={setUserConfig} setTaskList={setTaskList} />;
    }
  };

  return (
    <ConditionedLoggedInScreen />
  );
};

export default LoggedInScreen;
