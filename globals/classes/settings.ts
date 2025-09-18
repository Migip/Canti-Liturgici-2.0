import { ConstFilePath } from "../constants/File";
import { myFile } from "./file";

export declare type SettingsType = {
    bHideSecondVoices: boolean,
    nChantTextSize: number
}
const textSizeInt: Record<string, number> = {
    min: 16,
    max: 70
};
const oDefaultSettings: SettingsType = {
    bHideSecondVoices: true,
    nChantTextSize: 20
};

export class Settings {
    private static _oInstance: Settings;
    public static async calculateInstance() {
        myFile.readDocumentFile(ConstFilePath.mainSettings)
            .then(
                (sValue: string) => {
                    this._oInstance = new Settings(JSON.parse(sValue));
                    this._logGeneral("this._oInstance", this._oInstance);
                }
            )
            .catch(
                (oReason) => {
                    this._oInstance = new Settings(oDefaultSettings);
                    this._saveNewConfig(oDefaultSettings);
                    this._logGeneral("oDefaultSettings", oDefaultSettings);
                });
    };
    public static get bHideSecondVoices(): boolean {
        if (this._oInstance) {
            return this._oInstance.bHideSecondVoices;
        } else {
            return oDefaultSettings.bHideSecondVoices;
        };
    };
    public static set bHideSecondVoices(bNewValue: boolean) {
        this._oInstance.bHideSecondVoices = bNewValue;
    };
    public static get nChantTextSize(): number {
        this._logTextSize("get nChantTextSize", this._oInstance);
        if (this._oInstance) {
            return this._oInstance.nChantTextSize;
        } else {
            return oDefaultSettings.nChantTextSize
        };
    };
    public static set nChantTextSize(bNewValue: number) {
        this._oInstance.nChantTextSize = bNewValue;
    };
    private static async _saveNewConfig(oValues: SettingsType) {
        this._logGeneral("_saveNewConfig", oValues);
        myFile.writeDocumentFile(ConstFilePath.mainSettings, JSON.stringify(oValues));
    };

    public static normalizeTextSize(nSize: number): number {
        if (nSize < textSizeInt.min) {
            nSize = textSizeInt.min;
        } else if (nSize > textSizeInt.max) {
            nSize = textSizeInt.max;
        } else {
            nSize = Math.ceil(nSize);
        }
        return nSize;
    };

    public static getInterval(): { min: number, max: number } {
        return {
            min: textSizeInt.min,
            max: textSizeInt.max
        };
    };

    private static _logGeneral(message?: any, ...optionalParams: any[]) {
        //console.log("Settings.General", message, optionalParams);
    };
    private static _logTextSize(message?: any, ...optionalParams: any[]) {
        //console.log("Settings.TextSize", message, optionalParams);
    };
    private static _logMinorVoice(message?: any, ...optionalParams: any[]) {
        //console.log("Settings.MinorVoice", message, optionalParams);
    };

    private _oSettings: SettingsType;
    constructor(oValues: SettingsType) {
        this._oSettings = oValues;
    };
    public get bHideSecondVoices(): boolean {
        Settings._logMinorVoice("this._oSettings.bHideSecondVoices", this._oSettings.bHideSecondVoices);
        return this._oSettings.bHideSecondVoices;
    };
    public set bHideSecondVoices(bNewValue: boolean) {
        Settings._logMinorVoice("bNewValue", bNewValue);
        this._oSettings.bHideSecondVoices = bNewValue;
        this._saveNewConfig();
    };
    public get nChantTextSize(): number {
        Settings._logTextSize("this._oSettings.nChantTextSize", this._oSettings.nChantTextSize);
        return this._oSettings.nChantTextSize;
    };
    public set nChantTextSize(bNewValue: number) {
        Settings._logTextSize("bNewValue", bNewValue);
        this._oSettings.nChantTextSize = Settings.normalizeTextSize(bNewValue);
        this._saveNewConfig();
    };
    private _saveNewConfig() {
        Settings._saveNewConfig(this._oSettings);
    };
}