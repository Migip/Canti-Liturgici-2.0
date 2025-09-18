import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { GestureResponderEvent, View } from 'react-native';
import { Text } from 'react-native-elements';
import CustomPopup from '../../customComponents/CustomPopup';
import { CheckBox } from '@rneui/themed';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-elements';
import { Settings, SettingsType } from '../../globals/classes/settings';
import { MenuStyles } from '../../Styles/MenuStyle';
import { myIcons } from '../../globals/constants/Icons';
import { customMessage } from '../../globals/classes/customMessage';


declare type SettingsProps = {
    noButton?: true,
    onApplyChanges?: { (): void }
};

declare type stateType = {
    settings: SettingsType,
};


export default class SettingsMenuButton extends myReactComponent<SettingsProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        this._oCurrState = {
            settings: {
                bHideSecondVoices: Settings.bHideSecondVoices,
                nChantTextSize: Settings.nChantTextSize
            }
        };
        SettingsMenuButton._log("constructor", this._oCurrState);
        this.state = this._oCurrState;
    };

    public render() {
        return (
            <CustomPopup
                buttonTitle={this.props.noButton ? '' : this._oI18n.menu.SettingsButton}
                icon={myIcons.settings}
                onOpenModal={this.onOpenModal.bind(this)}
                onCloseModal={this.onMenuClose.bind(this)}
                popupContent={
                    <View
                        style={[
                            MenuStyles.SettingsView
                        ]}>
                        <View
                            style={[
                                GeneralStyles.flexHoriz,
                                GeneralStyles.center
                            ]}>
                            <CheckBox
                                checked={this._oCurrState.settings.bHideSecondVoices}
                                onPress={this.onMinorVoicePress.bind(this)} />
                            <Text>
                                {this._oI18n.menu.SettingsHideMinorVoices}
                            </Text>
                        </View>
                        <View
                            style={[
                                GeneralStyles.flexVert,
                                GeneralStyles.center
                            ]}>
                            <Text>
                                {this._oI18n.menu.SettingsTextSize}
                                <Text>
                                    {this._oCurrState.settings.nChantTextSize}
                                </Text>
                            </Text>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={Settings.getInterval().min}
                                maximumValue={Settings.getInterval().max}
                                step={1}
                                value={this._oCurrState.settings.nChantTextSize}
                                onValueChange={(value: number) => {
                                    SettingsMenuButton._log("onValueChange", value);
                                    this.nChantTextSize = value;
                                }}
                                minimumTrackTintColor="#6d6bfbff"
                                maximumTrackTintColor="#f41c1cff"
                            ></Slider>
                            <Text
                                style={[
                                    { fontSize: this._oCurrState.settings.nChantTextSize }
                                ]}>
                                {this._oI18n.menu.SettingsTextExample}
                            </Text>
                        </View>
                    </View>} />
        );
    };

    private onMinorVoicePress(oEvent: GestureResponderEvent) {
        SettingsMenuButton._log("onMinorVoicePress");
        this.bHideSecondVoices = !this.bHideSecondVoices;
    };

    public onOpenModal() {
        this.nChantTextSize = Settings.nChantTextSize;
        SettingsMenuButton._log("onOpenModal", this._oCurrState);
    };

    private set nChantTextSize(nNewValue: number) {
        SettingsMenuButton._log("set nChantTextSize", nNewValue);
        Settings.nChantTextSize = nNewValue;
        this._oCurrState.settings.nChantTextSize = nNewValue;
        this.setState(this._oCurrState);
    };
    private get nChantTextSize(): number {
        SettingsMenuButton._log("nChantTextSize", Settings.nChantTextSize);
        return Settings.nChantTextSize;
    };
    private set bHideSecondVoices(bHideSecondVoices: boolean) {
        SettingsMenuButton._log("bHideSecondVoices", bHideSecondVoices);
        Settings.bHideSecondVoices = bHideSecondVoices;
        this._oCurrState.settings.bHideSecondVoices = bHideSecondVoices;
        this.setState(this._oCurrState);
    };
    private get bHideSecondVoices(): boolean {
        SettingsMenuButton._log("get bHideSecondVoices", Settings.bHideSecondVoices);
        return Settings.bHideSecondVoices;
    };

    public onMenuClose() {
        if (this.props.onApplyChanges) {
            this.props.onApplyChanges();
        };
        // customMessage.send(this._oI18n.menu.SettingsMessage);
    };
    private static _log(message?: any, ...optionalParams: any[]) {
        //console.log("MenuSettings", message, optionalParams);
    };
}