import { showMessage } from "react-native-flash-message";
import { PopupStyles } from '../../Styles/PopupStyle';

export class customMessage {
    static send(sMessage: string) {
        try {
            showMessage({
                message: sMessage,
                type: 'info',
                position: 'bottom',
                duration: 3000,
                style: PopupStyles.FlashMessages
            });
            //console.log("send", sMessage);
        } catch (error) {
            console.error("send", error);
        }
    };
}