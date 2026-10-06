import React from 'react';
import myReactComponent from './myReactComponent';
import Checkbox from 'expo-checkbox';
import { Pressable, View } from 'react-native';
import { GeneralStyles } from '../Styles/GeneralStyles';
import CustomText from './myText';

declare type CustomCheckboxProps = {
    title: string,
    onPress: ((event: any) => void),
    value: boolean
};

export default class CustomCheckbox extends myReactComponent<CustomCheckboxProps> {
    /**
     * render
     */
    public render() {
        return (
            <Pressable
                onPress={this.props.onPress.bind(this)}>
                <View
                    style={[
                        GeneralStyles.flexHoriz,
                        GeneralStyles.spaceBetween,
                        GeneralStyles.checkboxView,
                    ]}>
                    <Checkbox
                        value={this.props.value}
                        onValueChange={this.props.onPress.bind(this)} />
                    <CustomText>
                        {this.props.title}
                    </CustomText>
                </View>
            </Pressable>
        );
    };
}