import React from 'react';
import myReactComponent from './myReactComponent';
import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { iconType } from '../globals/constants/Icons';


declare type CustomButtonProps = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    //icon?: IconNode
    icon: iconType,
    noBorder?: true
};

export default class CustomButton extends myReactComponent<CustomButtonProps> {
    protected _sCompName: string = 'CustomButton';
    /**
     * render
     */
    public render() {
        let icon: iconType = this.props.icon;
        let oStyle: ViewStyle | TextStyle | undefined;
        if (this.props.noBorder) {
            oStyle = undefined;
        } else {
            oStyle = {
                borderWidth: 1
            };
        };
        return (
            <FontAwesome6.Button
                name={icon}
                backgroundColor="#ffffffff"
                color={'black'}
                style={[oStyle]}
                onPress={(event: GestureResponderEvent) => {
                    try {
                        this._log("onPress start", this.props.title);
                        if (this.props.onPress) {
                            this.props.onPress(event);
                        };
                        this._log("onPress end", this.props.title);
                    } catch (error) {
                        console.error("onPress", error);
                    }
                }}>
                {this.props.title}
            </FontAwesome6.Button>
        );
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