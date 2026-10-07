import React from 'react';
import myReactComponent from './myReactComponent';
import { ColorValue, GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
//import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { iconType } from '../globals/constants/Icons';
import { Button } from 'react-native-elements';
import clTheme from '../globals/classes/colorTheme';


declare type CustomButtonProps = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    //icon?: IconNode
    icon?: iconType,
    noBorder?: boolean
};

export default class CustomButton extends myReactComponent<CustomButtonProps> {
    protected _sCompName: string = 'CustomButton';
    /**
     * render
     */
    public render() {
        let icon: iconType | undefined = this.props.icon;
        let oStyle: ViewStyle | TextStyle | undefined;
        let sBgColor: ColorValue;
        if (this.props.noBorder) {
            oStyle = undefined;
            sBgColor = 'transparent';
        } else {
            oStyle = {
                borderWidth: 1
            };
            sBgColor = clTheme.buttonBg;
        };
        if (icon) {
            return (
                <Pressable
                    onPress={(event: GestureResponderEvent) => {
                        try {
                            this._log("onPress start", this.props.title);
                            this.props.onPress?.(event);
                            this._log("onPress end", this.props.title);
                        } catch (error) {
                            console.error("onPress", error);
                        }
                    }}
                    style={({ pressed }) => [
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            borderRadius: 8,
                            backgroundColor: sBgColor,
                            borderWidth: this.props.noBorder ? 0 : 1,
                            borderColor: clTheme.BorderColor,
                            opacity: pressed ? 0.7 : 1,
                        },
                    ]}>
                    <FontAwesome6 name={icon} size={18} color={clTheme.TextColor} />
                    <Text style={{ color: clTheme.TextColor, marginLeft: 8 }}>
                        {this.props.title}
                    </Text>
                </Pressable>
            );
        } else {
            return (
                <Button
                    title={this.props.title}
                    onPress={this.props.onPress}

                    buttonStyle={{
                        backgroundColor: sBgColor,
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: clTheme.BorderColor
                    }}
                    containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10
                    }}
                    titleStyle={{
                        marginHorizontal: 20,
                        color: clTheme.TextColor
                    }} />
            );
        };
        {/*<Button
                title={this.props.title}
                onPress={this.props.onPress}
                icon={this.props.icon ? <FontAwesomeIcon icon={this.props.icon} /> : undefined}
                style={[
                    //GeneralStyles.button,
                    {
                        borderWidth: 0,
                        backgroundColor: '#AAAA'
                    }
                ]}
                titleStyle={[{
                    color: 'black'
                }]}
                iconContainerStyle={[
                    //GeneralStyles.buttonIconContainer
                ]} />*/}
        {/*type='outline'*/ }
    };
}