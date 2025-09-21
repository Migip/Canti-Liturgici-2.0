import React from 'react';
import { FlatList, GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { aFilterModel, oData, oFilterModel } from '../globals/classes/data';
import { GeneralStyles } from '../Styles/GeneralStyles';
import myReactComponent from '../customComponents/myReactComponent';
import CustomSearchBar from '../customComponents/CustomSearchBar';
//import myButton from '../customComponents/CustomButton';
import { FiltersStyles } from '../Styles/FiltersStyles';
import FilterSelectionItem from './MinorComponents/FilterSelectionItem';
import { Icon } from 'react-native-elements';
import { Alert } from 'react-native';
import CustomButton from '../customComponents/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { myIcons } from '../globals/constants/Icons';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Routes } from '../globals/routes/routes';
import { FiltersRouteParams } from './Filters';
import { customMessage } from '../globals/classes/customMessage';

export declare type FilterSelectionRouteParams = {
    sTitle: string,
    aList: aFilterModel,
    sInfoExt: string,
    //onApply: { (): void }
    //oNavigation: any
};


declare type stateType = {
    search: string,
    data: aFilterModel,
    sSelText: string
};

export default class FilterSelection extends myReactComponent {
    private _oParams: FilterSelectionRouteParams;
    private _oCurrState: stateType;
    private _oNavigation: any;
    private readonly _aAllList: aFilterModel;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        this._oParams = props.route.params;
        this._aAllList = this._oParams.aList;
        this._oCurrState = {
            search: '',
            data: this._aAllList,
            sSelText: ''
        };
        this._oCurrState.sSelText = this._updateSelText();
        this.state = this._oCurrState;

        this._oNavigation = this.props.navigation;

        let oOptions: NativeStackNavigationOptions = {
            title: `${this._oParams.sTitle}`,
            headerRight: () => (
                <CustomButton
                    onPress={() => Alert.alert(this._oI18n.filter.info, this._oI18n.filter.infoExt.replace("&", this._oParams.sInfoExt))}
                    icon={myIcons.singleFilterInfo}
                    //title={this._oI18n.FilterInfo} />
                    title={this._oI18n.filter.info} />
            ),
        };
        this._oNavigation.setOptions(oOptions);
        /*this._oNavigation.setOptions({
            headerRight: () => (
                <CustomButton
                    onPress={() => Alert.alert(this._oI18n.filter.info, this._oI18n.filter.infoExt.replace("&", this._oParams.sInfoExt))}
                    icon={myIcons.singleFilterInfo}
                    //title={this._oI18n.FilterInfo} />
                    title={this._oI18n.filter.info} />
            ),
        });*/

        this.props.navigation.addListener('focus', () => {
            customMessage.send(this._oI18n.filter.remember_apply);
        });
    };
    public render() {

        return (
            <SafeAreaView
                style={[
                    GeneralStyles.pageContainer,
                    GeneralStyles.marginContainer,
                    FiltersStyles.filterSelectionView
                ]}>
                <CustomSearchBar
                    placeholder={this._oI18n.filter.searchPlaceholder}
                    value={this.state.search}
                    onChangeText={this.onSearchBarChange.bind(this)} />
                <View
                    style={[
                        GeneralStyles.flexHoriz,
                        GeneralStyles.buttonBar,
                        FiltersStyles.filterSelectionButtons
                    ]}>
                    {/*singleFilterRemoveSelection*/}
                    <CustomButton
                        onPress={this._onClearPress.bind(this)}
                        icon={myIcons.clearFilters}
                        title={this._oI18n.filter.clearSelection} />
                    <CustomButton
                        onPress={this._onApply.bind(this)}
                        icon={myIcons.applyFilters}
                        title={this._oI18n.filter.apply} />
                </View>
                <Text
                    style={[
                        GeneralStyles.boldText
                    ]}>
                    {this.state.sSelText}
                </Text>
                <FlatList
                    data={this.state.data}
                    style={FiltersStyles.item}

                    renderItem={({ item }) =>
                    (<FilterSelectionItem
                        oItem={item}
                        onItemChange={this._onItemChange.bind(this)} />)
                    }
                    ListEmptyComponent={
                        <View>
                            <Text>
                                {this._oI18n.list.emptyList}
                            </Text>
                        </View>
                    }
                />
                {/*<Dialog
                    isVisible={this._bDialogIsVisible}
                    onBackdropPress={this._closeDialog}/>
                <StatusBar style='inverted' />*/}
            </SafeAreaView>)
    };
    public onSearchBarChange(sNewQuery: string): void {
        let oSearchRegexp: RegExp;
        let aNewList: aFilterModel;
        this._oCurrState.search = sNewQuery;
        if (sNewQuery) {
            //Chant title search
            oSearchRegexp = new RegExp(
                '.*'
                +
                sNewQuery.toUpperCase().split(" ").join(".*")
                +
                '.*'
            );
            aNewList = this._aAllList.filter((item) => {
                return oSearchRegexp.test(oData.convText(item.value));
            });
        } else {
            //No search
            aNewList = this._aAllList;
        };
        this._oCurrState.data = [...aNewList];
        this.setState(this._oCurrState);
    };

    private _onClearPress() {
        this._oCurrState.data.forEach(
            (oItem) => {
                oItem.selected = false;
            }
        );
        this._oCurrState.sSelText = this._updateSelText();
        this.setState(this._oCurrState);
    };

    private _onApply() {
        let oParams: FiltersRouteParams = {
            aNewValue: this._oCurrState.data
        };
        this._oNavigation.navigate(Routes.Filters, oParams);
    };
    /*private _onApplyOld() {
        this._oNavigation.goBack();
        this._oParams.onApply();
    };*/

    private _updateSelText(): string {
        let iLen = this._oCurrState.data.filter((item) => item.selected === true).length;
        return iLen + this._oI18n.filter.someSelection;
    };

    private _onItemChange(oItem: oFilterModel) {
        oItem.selected = !oItem.selected;
        this._oCurrState.sSelText = this._updateSelText();
        this.setState(this._oCurrState);
    }
}