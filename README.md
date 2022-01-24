# ReactNativeによるPomodoroTimer
- Googleアカウントと連携し、Timerに管理された作業情報をGoogleカレンダーに登録
- 登録できる作業はGoogleタスクに登録されている情報
- フロントエンドのみ。バックエンドは[別開発]("h")
- 別途GCPによるGoogle oauth認証を許可するトークンの発行が必要
- 動作させるには、フロント、バックエンドの両サーバーを立ち上げた上で、ルートディレクトリにnamespaceをSystemContentとしたenv.tsを作成し、各定数を記述する必要がある。以下例
```typescript 
export namespace SystemConst {
    export const REACT_APP_EXPO_GOOGLE_CLIENT_ID = "EXPOで立ち上げる用のクライアントIDを記述"
    export const REACT_APP_IOS_GOOGLE_CLIENT_ID = "IOSアプリ（本番環境）用のクライアントIDを記述"
    export const REACT_APP_WEB_GOOGLE_CLIENT_ID = "別途テスト用"
    export const REACT_APP_BACKEND_URL = "バックエンドのサーバーIPを記述";
}
```

