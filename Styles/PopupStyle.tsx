import { StyleSheet } from 'react-native';

export const PopupStyles = StyleSheet.create({
    PopupView: {
        //padding: 100,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    PopupModal: {
        flexDirection: 'column',
        alignContent: 'flex-end',
        alignItems: 'center',
        width: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 20,
        padding: 35,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    FlashMessages: {
        borderRadius: 20,
        margin: 20,
        padding: 35,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 50
    }
});