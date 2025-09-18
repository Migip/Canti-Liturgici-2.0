import { StyleSheet } from 'react-native';

export const ChantsListStyles = StyleSheet.create({
    lineContainer: {
        flex: 1,
        paddingTop: 22,
        paddingBottom: 22,
        verticalAlign: 'middle',
        alignItems: 'center',
        //borderBottomWidth: 0.5
    },
    item: {
        padding: 10,
        //height: 30,
    },
    itemSeparator: {
          borderBottomWidth: 1
    },
    itemNumber: {
        flex: 4,
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20,
        fontWeight: 'bold',
    },
    itemNumberF: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 20
    },
    itemNotNumber: {
        flex: 20,
        fontSize: 20,
        textAlign: 'left',
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    itemTitleF: {
        flexWrap: 'nowrap',
        fontWeight: 'bold'
    },
    itemAuthor: {
        fontStyle: 'italic'
    },
    itemAlbum: {
        fontStyle: 'italic'
    },
    itemAuthorF: {
        fontStyle: 'normal'
    },
    itemAlbumF: {
        fontStyle: 'normal'
    }
});