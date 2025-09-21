import { StyleSheet } from 'react-native';

export const FiltersStyles = StyleSheet.create({
    item: {
        padding: 10,
        height: 50,
    },
    singleFiltersView: {
        rowGap: 5
    },
    filtersButtonView: {
        rowGap: 10,
        flexDirection: 'column'
    },
    filtersView: {
        rowGap: 70
    },
    filterPressable: {
        padding: 20
    },
    filterItemView: {
        alignItems: 'center',
        columnGap: 5
    },
    filterSelectionItemView: {
        // columnGap: 10,
        // alignItems: 'baseline',
        // alignSelf: 'flex-start',
        margin: 5
        //backgroundColor: 'white'
    },
    filterSelectionView: {
        rowGap: 15
    },
    filterSelectionButtons: {
        alignItems: 'center'
    }
});