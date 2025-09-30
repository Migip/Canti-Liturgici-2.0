import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { aFilterModel, oFilterModel } from '../../globals/classes/data';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import myReactComponent from '../../customComponents/myReactComponent';
import { Routes } from '../../globals/routes/routes';
import { FilterSelectionRouteParams } from '../FilterSelection';
import i18n_class from '../../globals/i18n/i18n.general';
import { Icon } from 'react-native-elements';
import { FiltersStyles } from '../../Styles/FiltersStyles';
import { myIcons } from '../../globals/constants/Icons';
import { FontAwesome6 } from '@expo/vector-icons';


export declare type oDataProperty = {
    sSelText: string,
    aList: aFilterModel,
}

declare type SingleFilterButtonProps = {
    sTitle: string,
    aList: aFilterModel,
    //oDataProperty: oDataProperty,
    sSelText: string,
    oNavigation: any,
    sInfoExt: string,
    //onApply: { (): void },
    // onPress: { (): void }
};

declare type stateType = {
    //sSelText: string
};

export default class SingleFilterButton extends myReactComponent<SingleFilterButtonProps> {
    protected _sCompName: string = 'SingleFilterButton';
    private _oCurrState: stateType = {
        sSelText: ''
    };
    private _bRendered: boolean = false;
    public readonly state: stateType = this._oCurrState;

    public constructor(props: any) {
        super(props);
        //this._oCurrState.sSelText = this.props.oDataProperty.sSelText;
        /*this._updateMyState();
        this.props.oNavigation.addListener('focus', () => {
            this._updateMyState();
        })*/;
    }
    public render() {
        this._bRendered = true;
        return (
            <Pressable
                onPress={this.onFilterPress.bind(this)}
                style={[
                    FiltersStyles.filterPressable
                ]}>
                <View
                    style={[
                        GeneralStyles.flexHoriz,
                        GeneralStyles.spaceBetween,
                        {alignItems: 'center'}
                    ]}>
                    <Text
                        style={[
                            GeneralStyles.boldText
                        ]}>
                        {this.props.sTitle}
                    </Text>
                    <View
                        style={[
                            GeneralStyles.flexHoriz,
                            GeneralStyles.spaceBetween,
                            FiltersStyles.filterItemView,
                            GeneralStyles.marginContainer
                        ]}>
                        <Text>
                            {/*this._oCurrState.sSelText*/}
                            {this.props.sSelText}
                        </Text>
                        {/*<Icon
                            name='chevron-right'
                            type='font-awesome' />*/}
                        {/*<FontAwesomeIcon
                            icon='chevron-right' />*/}
                        <FontAwesome6
                            name={myIcons.navigation}
                            size={32} />
                    </View>
                </View>
            </Pressable>)
    };
    public onFilterPress(oEvent: GestureResponderEvent) {
        this._log(this.props.sTitle)
        let oFilterSelecitonProps: FilterSelectionRouteParams = {
            sTitle: this.props.sTitle,
            aList: this.props.aList,
            sInfoExt: this.props.sInfoExt,
            //onApply: this.props.onApply
            //aList: this.props.oDataProperty.aList,
            //oNavigation: this.props.oNavigation
        };
        this.props.oNavigation.navigate(Routes.FilterSelection, oFilterSelecitonProps);
        // this.props.onPress();
        //this.props.oNavigation.navigate(Routes.Details);
    };
    /*private _updateMyState() {
        //let iLen = this.props.aList.filter((item) => item.selected === true).length;
        let iLen = this.props.oDataProperty.aList.filter((item) => item.selected === true).length;
        this._oCurrState = {
            sSelText: iLen > 0 ? iLen + this._oI18n.FilterSomeSelection : this._oI18n.FilterNoSelection
        };
        if (this._bRendered === true) {
            this.setState(this._oCurrState);
        }
    };*/
    public static getSelText(aList: aFilterModel): string {
        let oI18n = i18n_class.getI18n();
        let iLen = aList.filter((item) => item.selected === true).length;
        return iLen > 0 ? iLen + oI18n.filter.someSelection : oI18n.filter.noSelection
    }
}