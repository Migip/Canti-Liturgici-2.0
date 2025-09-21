//import JSZip from 'jszip';
//import { ListItemButtonGroup } from '@rneui/base/dist/ListItem/ListItem.ButtonGroup';
import { BusyIndicator, funcSortValues } from './../constants/tsGeneral';
import { fSetBusy, fSetState, oData, oSummaryFileJsonData } from './data';
//import { cFilter } from './filter';
//import fs from 'fs';
//import rnfs from 'react-native-fs';
//import efs from 'expo-file-system';
//import * as FileSystem from 'expo-file-system';
//import { CounterClass } from './counter';
import { myFile } from './file';
import { ConstFilePath } from '../constants/File';
import { Settings } from './settings';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
//import { File, Paths } from 'expo-file-system/next';
//import { fetch } from 'expo/fetch';
//import { subscribeForKeyboardEvents } from 'react-native-reanimated/lib/typescript/reanimated2/core';
// import { Zip } from '@nativescript/zip';

declare type typeConfigJsonAppVersion = string;
declare type typeConfigJsonLink = string;
declare type oConfigJson = {
    "appVersion": typeConfigJsonAppVersion,
    "link": typeConfigJsonLink
};

const oDefaultConfigJson: oConfigJson = {
    "appVersion": "",
    "link": ""
};

/*const ConstFolder = {
    //"main": './Config/',
    //"tmp": './Temp/'
    "main": 'Config/',
    "tmp": 'Temp/'
};
const ConstFile = {
    //"zip": "Zip.zip",
    "canti": "Canti",
    "config": "Config.json",
    "sommario": "Sommario.json"
};

const ConstFilePath = {
    //"tmpZip": ConstFolder.tmp + ConstFile.zip,
    "tmpConfig": ConstFolder.tmp + ConstFile.config,
    "mainCanti": ConstFolder.main + ConstFile.canti,
    "mainCantiForFile": ConstFolder.main + ConstFile.canti + '/',
    "mainConfig": ConstFolder.main + ConstFile.config,
    "mainSommario": ConstFolder.main + ConstFile.sommario
};*/

const CounterClassNames = {
    "zipFile": "zipFile"
};

export class oConfigClass {

    private static _oInstance: oConfigClass;
    private static _sConfigPath: string = ConstFilePath.mainConfig;
    private _oConfig: oConfigJson = oDefaultConfigJson;
    private static readonly _oConfigUrl: string = 'https://drive.google.com/uc?export=download&id=1DWvECRk_1zv5hygBI7eYzZb52nirKp0y';
    private static _fSetBusyFunction?: fSetBusy;

    public static async getInstance(fSetBusyFunction?: fSetBusy): Promise<oConfigClass> {
        if (fSetBusyFunction) {
            this._fSetBusyFunction = fSetBusyFunction;
        };
        if (!this._oInstance) {
            Settings.calculateInstance();
            this._oInstance = new oConfigClass(await oConfigClass._getLastConfig());
            //oConfigClass._getLastConfig();
            //this._oInstance = new oConfigClass();
        };
        return this._oInstance;
    };

    private constructor(oJson: oConfigJson) {
        this._oConfig = oJson;
    };

    public getAppVersion(): typeConfigJsonAppVersion {
        return this._oConfig.appVersion;
    };

    public async getJsonData(): Promise<oSummaryFileJsonData> {
        if (this._oConfig.appVersion != '') {
            try {
                let aJsonData: oSummaryFileJsonData = JSON.parse(await myFile.readDocumentFile(ConstFilePath.mainSommario));
                //let aJsonData: oSummaryFileJsonData = JSON.parse(await oConfigClass._readFile(ConstFilePath.mainSommario));
                return aJsonData;
            } catch (error) {
                console.error("getJsonData", error);
                return [];
            };
        } else {
            return [];
        };
    };

    private static async _thereIsNewConfig(oNewConfig: oConfigJson) {
        try {
            //Lock del FE
            if (oConfigClass._fSetBusyFunction) {
                oConfigClass._fSetBusyFunction(BusyIndicator.downloading);
            };

            await myFile.downloadFileToTmp(oNewConfig.link, ConstFilePath.tmpZipCanti);
            await myFile.unzipTmpToDocument(ConstFilePath.tmpZipCanti, ConstFilePath.mainData);
            myFile.removeDocumentFileOrDir(oConfigClass._sConfigPath)
                .then(() => {
                    myFile.writeDocumentFile(oConfigClass._sConfigPath, JSON.stringify(oNewConfig));
                })
                .catch((reason: any) => {
                    console.error("_thereIsNewConfig: ", reason);
                });
            //this._oConfig = oNewConfig;
        } catch (error) {
            console.error("Errore _thereIsNewConfig: ", error);
        }
    };

    private static async _getLastConfig(): Promise<oConfigJson> {
        try {

            let oLocalConstant: oConfigJson;
            try {
                //this._oInstance._oConfig = oConfigClass._fromStringToConfig(await oConfigClass._readFile(oConfigClass._sConfigPath));
                //oLocalConstant = oConfigClass._fromStringToConfig(await oConfigClass._readFile(oConfigClass._sConfigPath));
                oLocalConstant = oConfigClass._fromStringToConfig(await myFile.readDocumentFile(oConfigClass._sConfigPath));
            } catch (error) {
                //this._oInstance._oConfig = { "appVersion": "", "link": "" };
                oLocalConstant = oDefaultConfigJson;
            };

            let oNetInfo: NetInfoState = await NetInfo.fetch();
            this._log("Internet", oNetInfo);

            if (oNetInfo.isConnected) {
                await myFile.downloadFileToTmp(oConfigClass._oConfigUrl, ConstFilePath.tmpConfig);
                let oInternetConfig = oConfigClass._fromStringToConfig(await myFile.readTmpFile(ConstFilePath.tmpConfig));
                this._log(oInternetConfig, oLocalConstant);
                if (oInternetConfig.appVersion != oLocalConstant.appVersion) {
                    if (oConfigClass._fSetBusyFunction) {
                        oConfigClass._fSetBusyFunction(BusyIndicator.downloading);
                    };
                    await oConfigClass._thereIsNewConfig(oInternetConfig);
                    if (oConfigClass._fSetBusyFunction) {
                        oConfigClass._fSetBusyFunction(BusyIndicator.none);
                    };
                };
                return oInternetConfig;
            } else if (oLocalConstant === oDefaultConfigJson) {
                if (oConfigClass._fSetBusyFunction) {
                    oConfigClass._fSetBusyFunction(BusyIndicator.noInit);
                };
                //wait 1 second
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > 1000) {
                        break;
                    }
                }
                return await this._getLastConfig();
            } else {
                return oLocalConstant;
            };
        } catch (oError) {
            console.error("_getLastConfig", oError);
            return oDefaultConfigJson;
        };
    };

    private static _fromStringToConfig(sString: string): oConfigJson {
        return JSON.parse(sString);
    };


    private static _log(message?: any, ...optionalParams: any[]) {
        //console.log("Config", message, optionalParams);
    };
}