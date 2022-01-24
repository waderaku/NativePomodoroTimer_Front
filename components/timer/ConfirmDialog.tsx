import React, { FC } from "react";
import { Button, Dialog, Portal, } from 'react-native-paper';
import styles from "../../style";

interface ConfirmDialogProps {
    open: boolean;
    onClose(): void;
    finishFunc(): void;
    cancelFunc(): void;
}
const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {

    return (
        <>
            <Portal>
                <Dialog visible={props.open} onDismiss={props.onClose} style={styles.dialog}>
                    <Dialog.Title>時間計測を終了してよろしいですか？</Dialog.Title>
                    {/* <Dialog.Content>
                        <Paragraph>時間計測を終了してよろしいですか？</Paragraph>
                    </Dialog.Content> */}
                    <Dialog.Actions>
                        <Button onPress={props.cancelFunc}>キャンセル</Button>
                        <Button onPress={props.finishFunc}>終了</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}
export default ConfirmDialog;