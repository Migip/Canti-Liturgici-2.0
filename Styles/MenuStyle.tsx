import { StyleSheet } from 'react-native';

export const MenuStyles = StyleSheet.create({
    MenuView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //alignSelf: 'auto',
        rowGap: 10
    },
    MenuSafeView: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        //justifyContent: 'space-between',
        // paddingBottom: 70,
        // margin: 20
    },
    InfoDescription: {
        fontStyle: 'italic'
    },
    InfoValue: {
        fontWeight: 'normal',
        fontStyle: 'normal'
    },
    InfoHead: {
        fontWeight: 'bold'
    },
    InfoView: {
        rowGap: 20
    },
    InfoVersionView: {
        rowGap: 5
    },
    SettingsView: {
        rowGap: 30
    }
});