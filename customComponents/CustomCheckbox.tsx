import React from 'react';
import myReactComponent from './myReactComponent';
import Checkbox from 'expo-checkbox';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-elements';
import { GeneralStyles } from '../Styles/GeneralStyles';

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
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </Pressable>
        );
    };
}