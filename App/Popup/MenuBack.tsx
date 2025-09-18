import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { GestureResponderEvent, View } from 'react-native';
import { Text } from 'react-native-elements';
import CustomPopup from '../../customComponents/CustomPopup';
import { CheckBox } from '@rneui/themed';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-elements';
import { Settings as SettingClass, SettingsType } from '../../globals/classes/settings';
import { MenuStyles } from '../../Styles/MenuStyle';
import { myIcons } from '../../globals/constants/Icons';
import CustomButton from '../../customComponents/CustomButton';


declare type MenuBackProps = {
    onCloseMenu: { (): void }
};

declare type stateType = {
    settings: SettingsType,
};


export default class MenuBack extends myReactComponent<MenuBackProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        this._oCurrState = {
            settings: {
                bMinorVoices: SettingClass.bMinorVoices,
                nChantTextSize: SettingClass.nChantTextSize
            }
        };
        this.state = this._oCurrState;
    };

    public render() {
        return (
            <CustomButton
                icon={myIcons.menuBack}
                title={this._oI18n.menu.BackButton}
                onPress={this.props.onCloseMenu}
                noBorder />
        );
    };
}