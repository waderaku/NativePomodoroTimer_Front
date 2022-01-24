import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Icon } from 'react-native-elements';
import { ResponseType } from 'expo-auth-session';
import { useSetRecoilState } from "recoil";
import { userIdState } from "../atoms";
import { login } from '../api';
import { SystemConst } from "../env";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: SystemConst.REACT_APP_EXPO_GOOGLE_CLIENT_ID,
        iosClientId: SystemConst.REACT_APP_IOS_GOOGLE_CLIENT_ID,
        webClientId: SystemConst.REACT_APP_WEB_GOOGLE_CLIENT_ID,
        scopes: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/tasks"],
        shouldAutoExchangeCode: false,
        // responseType: ResponseType.Code
    });

    const setUserId = useSetRecoilState(userIdState);
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication) {
                login(authentication.accessToken).then((id: string) => {
                    setUserId(id);
                });
            }
        }
    }, [response]);

    return (
        <Icon type="entypo" name="login" color="white" onPress={() => promptAsync()} />
    );
}