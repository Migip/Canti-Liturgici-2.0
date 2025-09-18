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
        backgroundColor: 'white'
    },
    filterSelectionButtons: {
        alignItems: 'center'
    }
});