import { Text, ScrollView, GestureResponderEvent } from 'react-native';
import React, { ReactNode } from 'react';
import myReactComponent from '../customComponents/myReactComponent';
import { GeneralStyles } from '../Styles/GeneralStyles';
import { myFile } from '../globals/classes/file';
import { ConstFilePath } from '../globals/constants/File';
import { myRichText } from '../globals/classes/text';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { oSummaryJsonLine } from '../globals/classes/data';
import CustomButton from '../customComponents/CustomButton';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Settings } from '../globals/classes/settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myIcons } from '../globals/constants/Icons';
import { Gesture, GestureDetector, GestureHandlerRootView, GestureStateChangeEvent, GestureUpdateEvent, PinchGestureChangeEventPayload, PinchGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { ChantTextStyles } from '../Styles/ChantTextStyles';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import SettingsMenuButton from './Popup/MenuSetting';


declare type ChantTextProps = {
    route: any,
    navigation: any
};

export declare type ChantTextRouteParams = {
    oJsonLine: oSummaryJsonLine
};

declare type stateType = {
    chantText: ReactNode,
    nFontSize: number
};

export default class ChantText extends myReactComponent<ChantTextProps> {
    private _params: ChantTextRouteParams;
    private _oCurrState: stateType;
    private _sOriginalText: string = '';
    protected _sCompName: string = "ChantText";
    public state: stateType;

    public constructor(props: any) {
        super(props);
        this._params = props.route.params;

        this._oCurrState = this.getDefaultState();
        this.initView();

        let oOptions: NativeStackNavigationOptions = {
            title: `${this._params.oJsonLine.number}. ${this._params.oJsonLine.title}`,
            headerRight: () => (
                <SettingsMenuButton
                    noButton
                    onApplyChanges={this.initView.bind(this)} />
            ),
        };
        this.props.navigation.setOptions(oOptions);

        this.props.navigation.addListener('focus', (event: any) => {
            this._log("focus");
            activateKeepAwakeAsync();
            this.nFontSizeTmp = Settings.nChantTextSize;
        });
        this.props.navigation.addListener('beforeRemove', (event: any) => {
            this._log("beforeRemove");
            deactivateKeepAwake();
        });

        this.state = this._oCurrState;
    };

    public render() {
        const oPinch = Gesture.Pinch()
            .onEnd(this.onPinchEnd.bind(this))
            .onChange(this.onPinchChange.bind(this));
        return (
            <SafeAreaView
                style={[
                    GeneralStyles.pageContainer
                ]}>
                <ScrollView
                    style={[
                        ChantTextStyles.text
                    ]}>
                    <GestureHandlerRootView>
                        <GestureDetector
                            gesture={oPinch}>
                            <Text style={{ fontSize: this.nFontSizeTmp }}>
                                {this._oCurrState.chantText}
                            </Text>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </ScrollView>
                <CustomButton
                    title={this._oI18n.detail.share}
                    icon={myIcons.share}
                    onPress={this.onShare.bind(this)} />
            </SafeAreaView>
        );
    };

    public onShare(event: GestureResponderEvent): void {
        Print.printToFileAsync({
            html: myRichText.formatHtml(
                this._sOriginalText,
                this._params.oJsonLine.title,
                this._params.oJsonLine.displAuthors,
                this._params.oJsonLine.displAlbums)
        })
            .then((value: Print.FilePrintResult): Print.FilePrintResult => {
                Sharing.shareAsync(value.uri);
                return value;
            },
                (reason: any) => { console.error("r1", reason) }
            )
            .catch(
                (reason2: any) => {
                    console.error("r2:", reason2)
                }
            );
    };

    public onPinchEnd(oEvent: GestureStateChangeEvent<PinchGestureHandlerEventPayload>, bSuccess: boolean) {
        //'worklet';
        runOnJS(this.onPinchEndJs.bind(this))(oEvent, bSuccess);
    };

    public onPinchEndJs(oEvent: GestureStateChangeEvent<PinchGestureHandlerEventPayload>, bSuccess: boolean) {
        this.nFontSize = this.nFontSize * oEvent.scale;
    };

    public onPinchChange(oEvent: GestureUpdateEvent<PinchGestureHandlerEventPayload & PinchGestureChangeEventPayload>) {
        //'worklet';
        runOnJS(this.onPinchChangeJs.bind(this))(oEvent);
    };

    public onPinchChangeJs(oEvent: GestureUpdateEvent<PinchGestureHandlerEventPayload & PinchGestureChangeEventPayload>) {
        this._log(oEvent);
        this.nFontSizeTmp = Settings.normalizeTextSize(this.nFontSize * oEvent.scale);
    };

    public initView() {
        if (this.state) {
            this._oCurrState = this.getDefaultState();
            this.setState(this._oCurrState);
        };
        this._log("initView", this._oCurrState, this.state);
        myFile.readDocumentFile(ConstFilePath.mainCanti + this._params.oJsonLine.number + '.txt')
            .then(
                (sString: string) => {
                    this._sOriginalText = sString;
                    this._oCurrState.chantText = myRichText.formatRN(this._sOriginalText);
                    this.setState(this._oCurrState);
                    //this._oCurrState.chantText = myRichText.formatExpoHtml(this._sOriginalText);
                }
            )
            .catch(
                (oReason: any) => {
                    console.error(oReason);
                    this._oCurrState.chantText = <Text>{this._oI18n.detail.error}</Text>;
                    this.setState(this._oCurrState);
                }
            );
    };

    private getDefaultState(): stateType {
        return {
            chantText: <Text>{this._oI18n.detail.loading}</Text>,
            nFontSize: Settings.nChantTextSize
        };
    };

    private set nFontSize(newFontSize: number) {
        Settings.nChantTextSize = newFontSize;
    };
    private get nFontSize(): number {
        return Settings.nChantTextSize;
    };

    private set nFontSizeTmp(newFontSize: number) {
        this._oCurrState.nFontSize = newFontSize;
        this.setState(this._oCurrState);
    };
    private get nFontSizeTmp(): number {
        return this._oCurrState.nFontSize;
    };
}