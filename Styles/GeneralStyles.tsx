import { StyleSheet } from 'react-native';

export const GeneralStyles = StyleSheet.create({
    flexVert: {
        flexDirection: 'column'
    },
    flexHoriz: {
        flexDirection: 'row'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    aBitSpace: {
        justifyContent: 'space-around'
    },
    pageContainer: {
        flex: 1,
        // paddingTop: 25,
        // paddingBottom: 25,
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    marginContainer: {
        marginLeft: 7,
        marginRight: 7,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonBar: {
        justifyContent: 'space-between'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 90,
        borderWidth: 0,
        padding: 10,
        elevation: 2,
        backgroundColor: 'rgba(244, 244, 244, 1)',
    },
    buttonIconContainer: {
        margin: 20
    },
    progressIndicatorView: {
        alignItems: 'center',
        alignSelf: 'center'
    },
    boldText: {
        fontWeight: 'bold'
    },
    checkboxView: {
        columnGap: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 5,
        //backgroundColor: 'white'
    },
});