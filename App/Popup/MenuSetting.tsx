import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { GestureResponderEvent, View } from 'react-native';
import CustomPopup from '../../customComponents/CustomPopup';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import Slider from '@react-native-community/slider';
import { Settings, SettingsType } from '../../globals/classes/settings';
import { MenuStyles } from '../../Styles/MenuStyle';
import { myIcons } from '../../globals/constants/Icons';
import CustomCheckbox from '../../customComponents/CustomCheckbox';
import CustomText from '../../customComponents/myText';
import clTheme from '../../globals/classes/colorTheme';


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
    protected _sCompName: string = 'SettingsMenuButton';

    public constructor(props: any) {
        super(props);
        this._oCurrState = {
            settings: {
                bHideSecondVoices: Settings.bHideSecondVoices,
                nChantTextSize: Settings.nChantTextSize,
                nGeneralTextSize: Settings.nGeneralTextSize,
            }
        };
        this._log("constructor", this._oCurrState);
        this.state = this._oCurrState;
    };

    public render() {
        return (
            <CustomPopup
                buttonTitle={this.props.noButton ? '' : this._oI18n.menu.SettingsButton}
                icon={myIcons.settings}
                noBorder={true}
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
                            <CustomCheckbox
                                value={this._oCurrState.settings.bHideSecondVoices}
                                onPress={this.onMinorVoicePress.bind(this)}
                                title={this._oI18n.menu.SettingsHideMinorVoices} />
                        </View>
                        <View
                            style={[
                                GeneralStyles.flexVert,
                                GeneralStyles.center
                            ]}>
                            <CustomText>
                                {this._oI18n.menu.SettingsTextSize}
                                <CustomText>
                                    {this._oCurrState.settings.nChantTextSize}
                                </CustomText>
                            </CustomText>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={Settings.getInterval().min}
                                maximumValue={Settings.getInterval().max}
                                step={1}
                                value={this._oCurrState.settings.nChantTextSize}
                                onValueChange={(value: number) => {
                                    this._log("onValueChange", value);
                                    this.nChantTextSize = value;
                                }}
                                minimumTrackTintColor={clTheme.minimumTrackTintColor}
                                maximumTrackTintColor={clTheme.maximumTrackTintColor}
                            ></Slider>
                            <CustomText
                                style={[
                                    { fontSize: this._oCurrState.settings.nChantTextSize }
                                ]}>
                                {this._oI18n.menu.SettingsTextExample}
                            </CustomText>
                        </View>
                    </View>} />
        );
    };

    private onMinorVoicePress(oEvent: GestureResponderEvent) {
        this._log("onMinorVoicePress");
        this.bHideSecondVoices = !this.bHideSecondVoices;
    };

    public onOpenModal() {
        this.nChantTextSize = Settings.nChantTextSize;
        this._log("onOpenModal", this._oCurrState);
    };

    private set nChantTextSize(nNewValue: number) {
        this._log("set nChantTextSize", nNewValue);
        Settings.nChantTextSize = nNewValue;
        this._oCurrState.settings.nChantTextSize = nNewValue;
        this.setState(this._oCurrState);
    };
    private get nChantTextSize(): number {
        this._log("nChantTextSize", Settings.nChantTextSize);
        return Settings.nChantTextSize;
    };
    private set bHideSecondVoices(bHideSecondVoices: boolean) {
        this._log("bHideSecondVoices", bHideSecondVoices);
        Settings.bHideSecondVoices = bHideSecondVoices;
        this._oCurrState.settings.bHideSecondVoices = bHideSecondVoices;
        this.setState(this._oCurrState);
    };
    private get bHideSecondVoices(): boolean {
        this._log("get bHideSecondVoices", Settings.bHideSecondVoices);
        return Settings.bHideSecondVoices;
    };

    public onMenuClose() {
        if (this.props.onApplyChanges) {
            this.props.onApplyChanges();
        };
        // customMessage.send(this._oI18n.menu.SettingsMessage);
    };
}