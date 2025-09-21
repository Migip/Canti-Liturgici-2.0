import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { aFilterModel, oFilterModel } from '../../globals/classes/data';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import myReactComponent from '../../customComponents/myReactComponent';
//import { CheckBox, Icon } from '@rneui/themed';
import Checkbox from 'expo-checkbox';
import { Button } from 'react-native-elements';
import { FiltersStyles } from '../../Styles/FiltersStyles';
import CustomCheckbox from '../../customComponents/CustomCheckbox';
//import CustomButton from '../../customComponents/CustomButton';

declare type FilterSelectionItemProps = {
    oItem: oFilterModel,
    onItemChange(oItem: oFilterModel): void
};

declare type stateType = {
    //oItem: oFilterModel,
    bSelected: boolean,
    sValue: string
};

export default class FilterSelectionItem extends myReactComponent<FilterSelectionItemProps> {

    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        this._oCurrState = {
            //oItem: this.props.oItem
            bSelected: this.props.oItem.selected,
            sValue: this.props.oItem.value
        };
        this.state = this._oCurrState;
    };

    public render() {
        return (
            <View
                style={[
                    GeneralStyles.flexHoriz,
                    GeneralStyles.spaceBetween,
                    FiltersStyles.filterSelectionItemView
                ]}>
                {/*<CheckBox
                        checked={this.state.bSelected}
                        title={this.state.sValue}
                        onPress={this.onCheckboxPress.bind(this)}
                    />*/}
                {/*<CheckBox
                    checked={this.props.oItem.selected}
                    title={this.props.oItem.value}
                    onPress={this.onCheckboxPress.bind(this)}
                />*/}
                <CustomCheckbox
                    title={this.props.oItem.value}
                    value={this.props.oItem.selected}
                    onPress={this.onCheckboxPress.bind(this)} />

                {/*<Checkbox
                    value={this.props.oItem.selected}
                    onValueChange={this.onCheckboxPress.bind(this)} />
                <Pressable
                    onPress={this.onCheckboxPress.bind(this)}>
                    <Text>
                        {this.state.sValue}
                    </Text>
                </Pressable>*/}
                {/*<CustomButton
                    title={this.props.oItem.value}
                    icon={this.props.oItem.selected ? 'square-check' : 'square'}
                    onPress={this.onCheckboxPress.bind(this)} />*/}
            </View>)
    };
    public onCheckboxPress(oEvent: any) {
        //this._oCurrState.oItem.selected = !this._oCurrState.oItem.selected;
        this._oCurrState.bSelected = !this._oCurrState.bSelected;
        this.setState(this._oCurrState);
        this.props.onItemChange(this.props.oItem);
    };
}