import { View, BackHandler } from 'react-native';
import React from 'react';
import { GeneralStyles } from '../Styles/GeneralStyles';
import SingleFilterButton, { oDataProperty } from './MinorComponents/SingleFilterButton';
import myReactComponent from '../customComponents/myReactComponent';
import { aFilterModel, oData } from '../globals/classes/data';
import CustomButton from '../customComponents/CustomButton';
import { usePreventRemoveContext } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FiltersStyles } from '../Styles/FiltersStyles';
import { showMessage } from 'react-native-flash-message';
import { customMessage } from '../globals/classes/customMessage';
import FlashMessage from 'react-native-flash-message';
import { myIcons } from '../globals/constants/Icons';

export declare type FiltersRouteParams = {
    aNewValue?: aFilterModel
};

enum PressedFilter {
    authors,
    albums,
    categories
}

declare type FiltersProps = {
    route: any,
    navigation: any
};

declare type stateType = {
    /*aAuthors: aFilterModel,
    aAlbums:  aFilterModel,
    aCategories: aFilterModel*/
    oAuthors: oDataProperty,
    oAlbums: oDataProperty,
    oCategories: oDataProperty
};

export default class Filters extends myReactComponent<FiltersProps> {

    // private _oParams: FiltersRouteParams;
    private _oData: oData = oData.getInstance();
    private _oCurrState: stateType;
    public readonly state: stateType;
    private _bRendered: boolean = false;
    // private _oPressedFilter?: PressedFilter;
    protected _sCompName: string = "Filters";

    public constructor(props: any) {
        super(props);
        // let aAuthors = JSON.parse(JSON.stringify(this._oData.Authors));
        // let aAlbums = JSON.parse(JSON.stringify(this._oData.Albums.slice()));
        // let aCategories = JSON.parse(JSON.stringify(this._oData.Categories.slice()));
        let aAuthors = this._oData.Authors;
        let aAlbums = this._oData.Albums;
        let aCategories = this._oData.Categories;
        // this._oParams = props.route.params;
        this._oCurrState = {
            /*aAuthors: this._oData.getAuthors(),
            aAlbums:  this._oData.getAlbums(),
            aCategories: this._oData.getCategories()*/
            oAuthors: {
                sSelText: SingleFilterButton.getSelText(aAuthors),
                aList: aAuthors
            },
            oAlbums: {
                sSelText: SingleFilterButton.getSelText(aAlbums),
                aList: aAlbums
            },
            oCategories: {
                sSelText: SingleFilterButton.getSelText(aCategories),
                aList: aCategories
            }
        };
        this.state = this._oCurrState;

        this.props.navigation.addListener('focus', () => {
            // this._log("focus", this._oPressedFilter, this.props.route.params.aNewValue);
            // if (this._oPressedFilter !== undefined &&
            //     this.props.route.params.aNewValue) {
            //     switch (this._oPressedFilter) {
            //         case PressedFilter.albums:
            //             this._onApplyAlbumsFilters();
            //             break;
            //         case PressedFilter.authors:
            //             this._onApplyAuthorsFilters();
            //             break;
            //         case PressedFilter.categories:
            //             this._onApplyCategoriesFilters();
            //             break;
            //     };
            // };
            // this._oPressedFilter = undefined;
            this._updateMyState();
            //customMessage.send(this._oI18n.filter.remember_apply);
        });
    };

    public render() {
        this._bRendered = true;
        return (
            <SafeAreaView
                style={[
                    GeneralStyles.pageContainer,
                    GeneralStyles.flexVert,
                    FiltersStyles.filtersView,
                    GeneralStyles.marginContainer
                ]}>
                {/*<Text
                    style={[
                        {
                            fontStyle: 'italic'
                        }
                    ]}>
                    {this._oI18n.filter.remember_apply}
                </Text>*/}
                <View
                    style={[
                        GeneralStyles.flexVert,
                        FiltersStyles.singleFiltersView
                    ]}>
                    <SingleFilterButton
                        sTitle={this._oI18n.filter.author}
                        aList={this.state.oAuthors.aList}
                        sSelText={this.state.oAuthors.sSelText}
                        sInfoExt={this._oI18n.filter.infoExt_aut}
                        // onPress={this._onPressAuthorsFilters.bind(this)}
                        oNavigation={this.props.navigation} />
                    <SingleFilterButton
                        sTitle={this._oI18n.filter.album}
                        aList={this.state.oAlbums.aList}
                        sSelText={this.state.oAlbums.sSelText}
                        sInfoExt={this._oI18n.filter.infoExt_alb}
                        // onPress={this._onPressAlbumsFilters.bind(this)}
                        oNavigation={this.props.navigation} />
                    <SingleFilterButton
                        sTitle={this._oI18n.filter.category}
                        aList={this.state.oCategories.aList}
                        sSelText={this.state.oCategories.sSelText}
                        sInfoExt={this._oI18n.filter.infoExt_cat}
                        // onPress={this._onPressCategoriesFilters.bind(this)}
                        oNavigation={this.props.navigation} />
                </View>
                <View
                    style={[
                        FiltersStyles.filtersButtonView
                    ]}>
                    <CustomButton
                        onPress={this._onClearFilters.bind(this)}
                        icon={myIcons.clearFilters}
                        title={this._oI18n.filter.clearSelection} />
                    {/*<CustomButton
                            onPress={this._onApplyFilters.bind(this)}
                            icon={myIcons.applyFilters}
                            title={this._oI18n.filter.apply} />*/}
                </View>
            </SafeAreaView>
        );
    };

    /*private _onApplyFilters() {
        this._oData.Authors = this._oCurrState.oAuthors.aList;
        this._oData.Albums = this._oCurrState.oAlbums.aList;
        this._oData.Categories = this._oCurrState.oCategories.aList;
        this.props.navigation.goBack();
        customMessage.send(this._oI18n.filter.msgApply);
    };*/
    // private _onApplyAuthorsFilters() {
    //     this._oData.Authors = this._oCurrState.oAuthors.aList;
    //     //this.props.navigation.goBack();
    //     this.props.navigation.popToTop();
    //     customMessage.send(this._oI18n.filter.msgApply);
    // };
    // private _onApplyAlbumsFilters() {
    //     this._oData.Albums = this._oCurrState.oAlbums.aList;
    //     this.props.navigation.popToTop();
    //     customMessage.send(this._oI18n.filter.msgApply);
    // };
    // private _onApplyCategoriesFilters() {
    //     this._oData.Categories = this._oCurrState.oCategories.aList;
    //     this.props.navigation.popToTop();
    //     customMessage.send(this._oI18n.filter.msgApply);
    // };
    // private _onPressAuthorsFilters() {
    //     this._oPressedFilter = PressedFilter.authors;
    // };
    // private _onPressAlbumsFilters() {
    //     this._oPressedFilter = PressedFilter.albums;
    // };
    // private _onPressCategoriesFilters() {
    //     this._oPressedFilter = PressedFilter.categories;
    // };
    private _onClearFilters() {
        this._oData.resetFilters();
        // let aAuthors = JSON.parse(JSON.stringify(this._oData.Authors));
        // let aAlbums = JSON.parse(JSON.stringify(this._oData.Albums));
        // let aCategories = JSON.parse(JSON.stringify(this._oData.Categories));
        let aAuthors = this._oData.Authors;
        let aAlbums = this._oData.Albums;
        let aCategories = this._oData.Categories;
        this._oCurrState = {
            /*aAuthors: this._oData.getAuthors(),
            aAlbums:  this._oData.getAlbums(),
            aCategories: this._oData.getCategories()*/
            oAuthors: {
                sSelText: SingleFilterButton.getSelText(aAuthors),
                aList: aAuthors
            },
            oAlbums: {
                sSelText: SingleFilterButton.getSelText(aAlbums),
                aList: aAlbums
            },
            oCategories: {
                sSelText: SingleFilterButton.getSelText(aCategories),
                aList: aCategories
            }
        };
        this._updateMyState();
        //this.props.navigation.goBack();
        customMessage.send(this._oI18n.filter.msgClear);
    };
    private _updateMyState() {
        if (this._bRendered === true) {
            this._oCurrState.oAuthors.sSelText = SingleFilterButton.getSelText(this._oCurrState.oAuthors.aList);
            this._oCurrState.oAlbums.sSelText = SingleFilterButton.getSelText(this._oCurrState.oAlbums.aList);
            this._oCurrState.oCategories.sSelText = SingleFilterButton.getSelText(this._oCurrState.oCategories.aList);
            this.setState(this._oCurrState);
        };
    };
}
