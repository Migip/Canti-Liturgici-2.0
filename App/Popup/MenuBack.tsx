import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { Settings as SettingClass, SettingsType } from '../../globals/classes/settings';
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
                bHideSecondVoices: SettingClass.bHideSecondVoices,
                nChantTextSize: SettingClass.nChantTextSize,
                nGeneralTextSize: SettingClass.nGeneralTextSize
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
                noBorder={true} />
        );
    };
}