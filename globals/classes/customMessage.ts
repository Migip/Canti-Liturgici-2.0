import { showMessage } from "react-native-flash-message";
import { PopupStyles } from '../../Styles/PopupStyle';
import clTheme from "./colorTheme";

export class customMessage {
    static send(sMessage: string) {
        try {
            showMessage({
                message: sMessage,
                type: 'info',
                position: 'bottom',
                duration: 3000,
                style: [PopupStyles.FlashMessages, {
                    backgroundColor: clTheme.flashMsg
                }]
            });
            //console.log("send", sMessage);
        } catch (error) {
            console.error("send", error);
        }
    };
}