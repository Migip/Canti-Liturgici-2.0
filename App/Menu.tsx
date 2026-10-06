import { Alert, Modal, View } from 'react-native';
import React from 'react';
import myReactComponent from '../customComponents/myReactComponent';
import { GeneralStyles } from '../Styles/GeneralStyles';
import Info from './Popup/MenuInfo';
import SettingsMenuButton from './Popup/MenuSetting';
import { MenuStyles } from '../Styles/MenuStyle';
import MenuBack from './Popup/MenuBack';
import CustomSafeArea from '../customComponents/mySafeArea';


declare type MenuProps = {
    // route: any,
    // navigation: any,
    onCloseMenu: { (): void }
};

declare type stateType = {
    //bInfoVisible: boolean
};

export default class Menu extends myReactComponent<MenuProps> {
    private _oCurrState: stateType = {
        //bInfoVisible: false
    };
    public readonly state: stateType = this._oCurrState;

    public constructor(props: any) {
        super(props);
    };

    public render() {
        return (
            <CustomSafeArea
                style={[
                    GeneralStyles.pageContainer,
                    MenuStyles.MenuSafeView
                ]}>
                <View
                    style={[
                        MenuStyles.MenuView,
                    ]}>
                    <Info />
                    <SettingsMenuButton />
                </View>
                <MenuBack
                    onCloseMenu={this.props.onCloseMenu} />
            </CustomSafeArea>
        );
    };
};