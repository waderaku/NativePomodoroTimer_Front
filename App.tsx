
import React, { FC } from 'react';
import 'localstorage-polyfill';
import 'react-native-gesture-handler';
import { RecoilRoot } from "recoil";
import Navigation from './components/Navigation';
import { LogBox } from 'react-native';
const App: FC = () => {
  LogBox.ignoreAllLogs()
  return (
    <RecoilRoot>
      <Navigation></Navigation>
    </RecoilRoot>
  );
}

export default App;