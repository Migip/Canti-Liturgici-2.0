import { FlatList, GestureResponderEvent, PixelRatio, Text, View } from 'react-native';
import { ChantsListStyles } from '../Styles/ChantsListStyles';
import { oData, aSummaryJsonData } from '../globals/classes/data';
import React from 'react';
import CustomSearchBar from '../customComponents/CustomSearchBar';
import { Routes } from '../globals/routes/routes';
import ChantListItem from './MinorComponents/ChantListItem';
import { GeneralStyles } from '../Styles/GeneralStyles';
import myReactComponent from '../customComponents/myReactComponent';
import { FiltersRouteParams } from './Filters';
import CustomButton from '../customComponents/CustomButton';
import CustomProgressIndicator from '../customComponents/CustomProgressIndicator';
import { BusyIndicator } from '../globals/constants/tsGeneral';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myIcons } from '../globals/constants/Icons';

declare type ChantListProps = {
    route: any,
    navigation: any,
    onOpenMenu?: { (): void }
};

declare type stateType = {
    search: string,
    data: aSummaryJsonData,
    busy: BusyIndicator,
    nFilters: number
};

export default class ChantsList extends myReactComponent<ChantListProps> {
    private _oCurrState: stateType = {
        search: '',
        data: [],
        busy: BusyIndicator.charging,
        nFilters: 0
    };
    private _oNavigation;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        this._oNavigation = props.navigation;
        this.state = this._State;

        this.setFilterButton();
        this.props.navigation.addListener('focus', (event: any) => {
            this.Busy = BusyIndicator.charging;
            oData.getInstance(this.setBusy.bind(this), this.setStateData.bind(this))
                .getData(this._oCurrState.search)
                .then(
                    (aData: aSummaryJsonData) => {
                        this._oCurrState.nFilters = oData.getInstance().getNumberOfSelected();
                        this.StateData = aData;
                        this.setFilterButton();
                    }
                );
            this.setState(this._State);
        });
    };

    public render() {
        if (this.Busy === BusyIndicator.none) {
            return (
                <SafeAreaView style={GeneralStyles.pageContainer}>
                    <CustomSearchBar
                        placeholder={this._oI18n.list.searchBarPlaceholder}
                        value={this.state.search}
                        onChangeText={this.onSearchBarChange.bind(this)} />
                    <FlatList
                        data={this.state.data}
                        style={ChantsListStyles.item}
                        ItemSeparatorComponent={
                            (({ highlighted }) => (
                                <View
                                    style={[
                                        ChantsListStyles.itemSeparator
                                    ]}
                                />
                            ))
                        }
                        renderItem={({ item }) =>
                            <ChantListItem
                                oItem={item}
                                oNavigation={this._oNavigation} />
                        }
                        ListEmptyComponent={
                            <View>
                                <Text>
                                    {this._oI18n.list.emptyList}
                                </Text>
                            </View>
                        }
                    />
                </SafeAreaView>
            )

        } else {
            let sDescription: string;
            switch (this.Busy) {
                case BusyIndicator.charging:
                    sDescription = this._oI18n.list.chargeDescription;
                    break;
                case BusyIndicator.downloading:
                    sDescription = this._oI18n.list.progressDescription;
                    break;
                case BusyIndicator.noInit:
                    sDescription = this._oI18n.list.noInitDescription;
                    break;
                default:
                    sDescription = this._oI18n.list.chargeDescription;
                    break;
            }
            return (
                <SafeAreaView style={GeneralStyles.pageContainer}>
                    <CustomProgressIndicator
                        show={true}
                        indeterminate={true}
                        description={
                            sDescription
                        } />
                </SafeAreaView>
            )
        };
    };
    private onPressFilter(oEvent: GestureResponderEvent) {
        if (this.Busy === BusyIndicator.none) {
            let oParams: FiltersRouteParams = {
            };
            this._oNavigation.navigate(Routes.Filters, oParams);
        };
    };
    private onSearchBarChange(sNewQuery: string): void {

        this.Busy = BusyIndicator.charging;

        oData.getInstance(this.setBusy.bind(this), this.setStateData.bind(this)).getData(sNewQuery)
            .then(
                (aData: aSummaryJsonData) => {

                    this._State = {
                        search: sNewQuery,
                        data: aData,
                        busy: this._oCurrState.busy,
                        nFilters: this._oCurrState.nFilters
                    };
                    this.setState(this._State);
                    this.Busy = BusyIndicator.none;
                }
            )
            .catch((reason) => {
                console.error('onSearchBarChange', reason);
                this.Busy = BusyIndicator.none;
            }
            );
    };

    public setBusy(bNewBusy: BusyIndicator) {
        this.Busy = bNewBusy;
    };
    public setStateData(aNewData: aSummaryJsonData) {
        this.StateData = aNewData;
    };

    public set Busy(bNewBusy: BusyIndicator) {
        this._oCurrState.busy = bNewBusy;
        this._State = this._oCurrState;
        this.setState(this._State);
    };
    public get Busy(): BusyIndicator {
        return this._oCurrState.busy;
    };
    public set StateData(aData: aSummaryJsonData) {
        this._oCurrState.data = aData;
        this._oCurrState.busy = BusyIndicator.none;
        this.setState(this._oCurrState);
    };
    private set _State(oState: stateType) {
        this._oCurrState.search = oState.search;
        this._oCurrState.data = oState.data;
        this.setState(this._oCurrState);
        //};
    };
    private get _State(): stateType {
        return this._oCurrState;
    };

    private setFilterButton(bEmpty?: boolean) {
        if (bEmpty) {
            this._oNavigation.setOptions({
                headerRight: () => (<View />),
            });
        } else {
            this._oNavigation.setOptions({
                headerRight: () => (
                    <CustomButton
                        onPress={this.onPressFilter.bind(this)}
                        icon={myIcons.filter}
                        title={`${this._oI18n.list.filtersButton} (${this._oCurrState.nFilters.toString()})`} />
                ),
            });
        };
    };
}
