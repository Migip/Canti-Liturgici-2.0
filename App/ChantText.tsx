import { ScrollView, GestureResponderEvent } from 'react-native';
import React, { ReactNode } from 'react';
import myReactComponent from '../customComponents/myReactComponent';
import { GeneralStyles } from '../Styles/GeneralStyles';
import { myFile } from '../globals/classes/file';
import { ConstFilePath } from '../globals/constants/File';
import { myRichText } from '../globals/classes/text';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { oSummaryJsonLine } from '../globals/classes/data';
import CustomButton from '../customComponents/CustomButton';
import { Buffer } from 'buffer';
import { File, Paths } from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Settings } from '../globals/classes/settings';
import { myIcons } from '../globals/constants/Icons';
import { Gesture, GestureDetector, GestureHandlerRootView, GestureStateChangeEvent, GestureUpdateEvent, PinchGestureChangeEventPayload, PinchGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { ChantTextStyles } from '../Styles/ChantTextStyles';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import SettingsMenuButton from './Popup/MenuSetting';
import CustomText from '../customComponents/myText';
import CustomSafeArea from '../customComponents/mySafeArea';


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

    // Gesture creata una sola volta (non a ogni render).
    // I callback sono metodi di classe, non worklet: li eseguo esplicitamente sul thread JS.
    // NB: vanno passati come riferimenti già bindati, NON come arrow function inline:
    // il plugin Babel di reanimated workletizza le funzioni inline nella catena Gesture
    // e in quel caso `this` risulta undefined.
    private _oPinch = Gesture.Pinch()
        .runOnJS(true)
        .onChange(this.onPinchChangeJs.bind(this))
        .onEnd(this.onPinchEndJs.bind(this));

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
        return (
            <CustomSafeArea
                style={[
                    GeneralStyles.pageContainer
                ]}>
                <ScrollView
                    style={[
                        ChantTextStyles.text
                    ]}>
                    <GestureHandlerRootView>
                        <GestureDetector
                            gesture={this._oPinch}>
                            <CustomText style={{ fontSize: this.nFontSizeTmp }}>
                                {this._oCurrState.chantText}
                            </CustomText>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </ScrollView>
                <CustomButton
                    title={this._oI18n.detail.share}
                    icon={myIcons.share}
                    onPress={this.onShare.bind(this)} />
            </CustomSafeArea>
        );
    };

    public async onShare(event: GestureResponderEvent): Promise<void> {
        try {
            // base64: true => il PDF mi viene restituito anche come stringa base64,
            // così non devo leggere il file generato da expo-print (che l'app non può leggere).
            const oPrinted: Print.FilePrintResult = await Print.printToFileAsync({
                html: myRichText.formatHtml(
                    this._sOriginalText,
                    this._params.oJsonLine.title,
                    this._params.oJsonLine.displAuthors,
                    this._params.oJsonLine.displAlbums),
                base64: true
            });
            if (!oPrinted.base64) {
                throw new Error("printToFileAsync non ha restituito il base64 del PDF");
            }

            // Scrivo il PDF in una cartella che l'app può gestire (con nome leggibile) e condivido quel file
            const sSafeTitle: string = this._params.oJsonLine.title
                .replace(/[^\p{L}\p{N}\-_ ]/gu, '')
                .trim() || 'chant';
            const oDest = new File(Paths.cache, `${this._params.oJsonLine.number}-${sSafeTitle}.pdf`);
            if (oDest.exists) {
                oDest.delete();
            }
            oDest.write(new Uint8Array(Buffer.from(oPrinted.base64, 'base64')));

            await Sharing.shareAsync(oDest.uri, {
                mimeType: 'application/pdf',
                UTI: 'com.adobe.pdf'
            });
        } catch (oReason: any) {
            console.error("onShare:", oReason);
        }
    };

    public onPinchEndJs(oEvent: GestureStateChangeEvent<PinchGestureHandlerEventPayload>, bSuccess: boolean) {
        this.nFontSize = Settings.normalizeTextSize(this.nFontSize * oEvent.scale);
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
                    this._oCurrState.chantText = <CustomText>{this._oI18n.detail.error}</CustomText>;
                    this.setState(this._oCurrState);
                }
            );
    };

    private getDefaultState(): stateType {
        return {
            chantText: <CustomText>{this._oI18n.detail.loading}</CustomText>,
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