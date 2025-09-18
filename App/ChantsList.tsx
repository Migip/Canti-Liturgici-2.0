import { FlatList, GestureResponderEvent, Text, View } from 'react-native';
import { ChantsListStyles } from '../Styles/ChantsListStyles';
import { oData, aSummaryJsonData } from '../globals/classes/data';
import React from 'react';
import CustomSearchBar from '../customComponents/CustomSearchBar';
import { Routes } from '../globals/routes/routes';
import ChantListItem from './MinorComponents/ChantListItem';
import { GeneralStyles } from '../Styles/GeneralStyles';
import myReactComponent from '../customComponents/myReactComponent';
import { FiltersRouteParams } from './Filters';
import { Icon } from 'react-native-elements';
import CustomButton from '../customComponents/CustomButton';
import CustomProgressIndicator from '../customComponents/CustomProgressIndicator';
import { BusyIndicator } from '../globals/constants/tsGeneral';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
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
    //private _oData: oData | undefined = undefined;// = oData.getInstance(this.setBusy.bind(this),this.setStateData.bind(this));
    //private _sSearch: string = '';
    private _oCurrState: stateType = {
        search: '',
        data: [],
        busy: BusyIndicator.charging,
        nFilters: 0
    };/* = {
        search: '',
        data: this._oData.getData()
    };*/
    private _oNavigation;
    //private _bRendered: boolean = false;
    //private _bBusyIndicator: boolean = false;
    public readonly state: stateType;
    //public that = this;
    //private searchQuery: string;
    //private setSearchQuery: Dispatch<SetStateAction<string>>;
    /*public _test: React.Dispatch<React.SetStateAction<boolean>>;
    public _bDialogIsVisible: boolean = false;*/
    /*state = {
        search: '',
      };*/

    public constructor(props: any) {
        super(props);
        this._oNavigation = props.navigation;
        /*this._oCurrState = {
            search: '',
            data: this._oData.getData()
        }*/
        //this._oCurrState = {
        /*this._State = {
            search: '',
            data: this._oData.getData(),
            busy: false
        };*/
        //this.state = this._oCurrState;
        this.state = this._State;

        // this._oNavigation.setOptions({
        //     headerLeft: () => (
        //         <CustomButton
        //             onPress={this.onPressMenu.bind(this)}
        //             icon={myIcons.menu}
        //             title={this._oI18n.list.menuButton}
        //             noBorder />
        //     ),
        // });
        this.setFilterButton();
        //this.setState(this._oCurrState);
        //this.state = this._oState;
        //[this.searchQuery, this.setSearchQuery] = useState('')
        /*const [bDialogIsVisible, test] = useState(false);
        this._bDialogIsVisible = bDialogIsVisible
        this._test = test;*/
        //[this._sSearch, this.setSearchQuery] = useState('');
        //const [sSearch,sSetSearch] = useState('');
        /*this._sSearch = sSearch;
        this._sSetSearch = sSetSearch; */
        this.props.navigation.addListener('focus', (event: any) => {
            //console.log(event, this._bRendered);
            //if (this._bRendered === true) {
            /*this._oCurrState.data = this._oData.getData(this._oCurrState.search);
            this.setState(this._oCurrState);*/
            this.Busy = BusyIndicator.charging;
            oData.getInstance(this.setBusy.bind(this), this.setStateData.bind(this))
                .getData(this._oCurrState.search)
                .then(
                    (aData: aSummaryJsonData) => {
                        this._oCurrState.nFilters = oData.getInstance().getNumberOfSelected();
                        this.StateData = aData;
                        this.setFilterButton();
                        //this.setState(this._oCurrState);
                    }
                );
            this.setState(this._State);
            //this.StateData = this._oData.getData(this._oCurrState.search);
            //};
        });
    };

    public render() {
        //this._bRendered = true;
        /*const [sSearch,sSetSearch] = useState<string>('');
        this._sSearch = sSearch;
        this._sSetSearch = sSetSearch;*/
        //[this._bDialogIsVisible, this._mDialogIsVisible] = useState(false);
        //const { search } = this.state;
        if (this.Busy === BusyIndicator.none) {
            return (
                <SafeAreaView style={GeneralStyles.pageContainer}>
                    {/*<Text
                    style={styles.titleText}>{this._oI18n.appTitle}</Text>*/}
                    {/*<View
                        style={[
                            GeneralStyles.buttonBar,
                            GeneralStyles.flexHoriz
                        ]}>*/}
                    {/*<CustomButton
                            onPress={this.onPressMenu.bind(this)}
                            icon={'bars'}
                            title={this._oI18n.list.menuButton} />*/}
                    {/*<CustomButton
                            onPress={this.onPressFilter.bind(this)}
                            icon={'filter'}
                            title={`${this._oI18n.list.filtersButton} (${this._oCurrState.nFilters.toString()})`} />*/}
                    {/*</View>*/}
                    {/*<SearchBar
                    placeholder="Titolo/Numero canto"
                    onChangeText={(search)=>{ setSearchQuery(search) }}
                    value={searchQuery}
                    platform='default'
                />*/}
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
                                //oData={this._oData}
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
                    {/*
                        ListHeaderComponent={
                            <View
                                style={[
                                    GeneralStyles.flexHoriz,
                                    ChantsListStyles.lineContainer,
                                    ChantsListStyles.itemSeparator
                                ]}>
                                <Text
                                    style={
                                        ChantsListStyles.itemNumber
                                    }>
                                    {this._oI18n.list.numberHeader}
                                </Text>
                                <Text
                                    style={
                                        ChantsListStyles.itemNotNumber
                                    }>
                                    {this._oI18n.list.titleHeader}
                                </Text>
                            </View>
                        }*/}
                    {/*<Dialog
                    isVisible={this._bDialogIsVisible}
                    onBackdropPress={this._closeDialog}/>
                <StatusBar style='inverted' />*/}
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
            {/*if (this._oCurrState.data.length > 0) {
                sDescription = this._oI18n.list.progressDescription;
            } else {
                sDescription = this._oI18n.list.chargeDescription;
            };*/}
            return (
                <SafeAreaView style={GeneralStyles.pageContainer}>
                    <CustomProgressIndicator
                        show={true}
                        indeterminate={true}
                        description={
                            sDescription
                        } />
                    {/*<FlashMessage />*/}
                </SafeAreaView>
            )
        };
    };
    private onPressFilter(oEvent: GestureResponderEvent) {
        //this._bDialogIsVisible = true;
        //this._test(true);
        let oParams: FiltersRouteParams = {
            //oData: this._oData
        };
        this._oNavigation.navigate(Routes.Filters, oParams);
    };
    private onPressMenu(oEvent: GestureResponderEvent) {
        if (this.props.onOpenMenu) {
            //this.setFilterButton(true);
            this.props.onOpenMenu();
        };
    };
    private onSearchBarChange(sNewQuery: string): void {
        /*this._oCurrState.search = sNewQuery;
        this._oCurrState.data = this._oData.getData(this._oCurrState.search);
        this.setState(this._oCurrState);*/

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
        /*
        this._State = {
            search: sNewQuery,
            data: this._oData.getData(this._oCurrState.search),
            busy: this._oCurrState.busy
        };*/
        //this.setState({search: text})
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
        //if (this._bRendered) {
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
