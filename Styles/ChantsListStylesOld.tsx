import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    flexVert:{
        flexDirection: 'column'
    },
    flexHoriz:{
        flexDirection: 'row'
    },
    pageContainer: {
        flex: 1,
        paddingTop: 25,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    buttonBar:{
        justifyContent: 'flex-end'
    },
    lineContainer: {
        flex: 1,
        paddingTop: 22,
        verticalAlign: 'middle',
        alignItems: 'center'
    },
    item: {
        padding: 10,
        height: 50,
    },
    itemNumber:{
        flex: 3
    },
    itemNumberF:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20
    },
    itemNotNumber:{
        flex: 20
    },
    itemTitleF:{
        flexWrap: 'nowrap',
    },
    itemAuthorF:{
        fontStyle: 'italic'
    }
});