import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Header, Text, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GoogleLoginButton from "./GoogleLoginButton";


interface TitledToolbarProps {
  appTitle: string;
  isLoggedIn: boolean;
  logout(): void;
  openDrawer(): void;
}
interface LeftComponentProps {
  openDrawer(): void;
}

const TitledToolbar: FC<TitledToolbarProps> = (props) => {
  const appTitle = props.appTitle;

  const CenterComponent: FC = () => {
    return <Text h1 h1Style={styles.heading}>{appTitle}</Text>
  }
  const RightComponent: FC = () => {
    if (props.isLoggedIn) {
      return <Icon type="entypo" name="log-out" color="white" onPress={() => props.logout()} />
    }
    else {
      return <GoogleLoginButton />
    }
  }
  const LeftComponent: FC<LeftComponentProps> = (leftProps) => {

    if (props.isLoggedIn) {
      return <Icon name="menu" onPress={leftProps.openDrawer} />
    }
    else {
      return <View />
    }
  }
  return (
    <SafeAreaProvider>
      <Header
        leftComponent={<LeftComponent openDrawer={props.openDrawer} />}
        rightComponent={<RightComponent />}
        centerComponent={<CenterComponent />}>
      </Header>
    </SafeAreaProvider>
  );
};

export default TitledToolbar;
const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});