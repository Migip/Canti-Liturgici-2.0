//import JSZip from 'jszip';
import { ListItemButtonGroup } from '@rneui/base/dist/ListItem/ListItem.ButtonGroup';
import { BusyIndicator, funcSortValues } from './../constants/tsGeneral';
import { fSetBusy, fSetState, oData, oSummaryFileJsonData } from './data';
//import { cFilter } from './filter';
//import fs from 'fs';
//import rnfs from 'react-native-fs';
//import efs from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import { CounterClass } from './counter';
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

    /*private constructor() {
        //let oConfig = fs.readFileSync(this._sConfigPath);
        //let oConfig = oConfigClass._readFile(this._sConfigPath);
        //this._oConfig = oConfig ? oConfigClass._fromStringToConfig(await oConfigClass._readFile(this._sConfigPath)) : { "appVersion": "", "link": "" };
        //fetch("https://drive.google.com/uc?export=download&id=1DWvECRk_1zv5hygBI7eYzZb52nirKp0y", {
        //    method: "GET" // default, so we can ignore
        //})
        //.then((response)=>response.json()
        //.then(oConfigClass._getLastConfig))
        //
        //.catch((error) => console.log("Errore promise: " + error))
        //const lastConfigPromise = new Promise( (resolve)=>{oConfigClass._getLastConfig(); resolve(0)})
        //lastConfigPromise;
        oConfigClass._getLastConfig();
        //oConfigClass._getLastConfig();
    };*/

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

    /*private async _thereIsNewConfig(oNewConfig: oConfigJson) {
        console.log("_thereIsNewConfig");
        try {
            //Lock del FE
            //console.log("INSERIRE UN BLOCCO CON BUSY INDICATOR");
            if (oConfigClass._fSetBusyFunction) {
                oConfigClass._fSetBusyFunction(BusyIndicator.downloading);
            };
            let sFileZipContent = await oConfigClass.httpGet(oNewConfig.link);
            //await oConfigClass._saveFile(ConstFilePath.tmpZip,sFileZipContent);
            // await Zip.unzip({
            //     archive: FileSystem.documentDirectory + 'File.tmp',
            //     directory: FileSystem.documentDirectory || '',
            // })
            // console.log("Zip unzippato");
            let oZip = new JSZip();
            let oZipContent = await oZip.loadAsync(sFileZipContent);

            //Empty ConstFilePath.mainCanti
            oConfigClass._removeDir(ConstFilePath.mainCanti);
            try {
                oConfigClass._createDir(ConstFilePath.mainCanti);
            } catch (error) {
                console.log("Errore creazione cartella: tutto ok");
                console.log(error);
            };
            //Write new elements
            var oCounter = CounterClass.getInstance(CounterClassNames.zipFile, Object.keys(oZipContent).length);
            Object.keys(oZipContent.files).forEach(
                function (sZipPath: string) {
                    let oCurrFile = oZipContent.files[sZipPath];
                    let sFilename = sZipPath.replace(/^.*[\\/]/, '');
                    if (!oCurrFile.dir) {
                        oCurrFile.async('string')
                            .then((sContent) => {
                                try {
                                    if (!oCurrFile.dir && sFilename != ConstFile.sommario) {
                                        oConfigClass._saveFile(ConstFilePath.mainCantiForFile + sFilename, sContent);
                                        oCounter.addCounter();
                                    } else if (!oCurrFile.dir && sFilename == ConstFile.sommario) {
                                        oConfigClass._saveFile(ConstFilePath.mainSommario, sContent);
                                        oCounter.addCounter();
                                    } else {
                                        oCounter.addCounter();
                                    };
                                } catch (error) {
                                    oCounter.setError();
                                }
                            });
                    } else {
                        oCounter.addCounter();
                    };
                });
            this._setNewConfig(oNewConfig);
            //this._oConfig = oNewConfig;
        } catch (error) {
            console.log("Errore _thereIsNewConfig: ", error);
        }
    };*/

    /*private async _setNewConfig(oNewConfig: oConfigJson) {
        let oCounter = CounterClass.getInstance(CounterClassNames.zipFile);
        if (!oCounter.hasError() && oCounter.counterIsMax()) {
            this._oConfig = oNewConfig;
            oData.onNewConfig();
            if (oConfigClass._fSetBusyFunction) {
                oConfigClass._fSetBusyFunction(BusyIndicator.none);
            };
        } else if (oCounter.hasError()) {
            console.log("Errore _setNewConfig");
            if (oConfigClass._fSetBusyFunction) {
                oConfigClass._fSetBusyFunction(BusyIndicator.none);
            };
        } else {
            setTimeout(this._setNewConfig.bind(this, oNewConfig), 30);
        };
    };*/

    private static async _getLastConfig(): Promise<oConfigJson> {
        try {
            //let oConfig = await oConfigClass._readFile(this.getInstance()._sConfigPath);
            //let oConfig = await oConfigClass._readFile(oConfigClass._sConfigPath);
            //this.getInstance()._oConfig = oConfig ? oConfigClass._fromStringToConfig(await oConfigClass._readFile(this.getInstance()._sConfigPath)) : { "appVersion": "", "link": "" };
            //this.getInstance()._oConfig = oConfig ? oConfigClass._fromStringToConfig(await oConfigClass._readFile(oConfigClass._sConfigPath)) : { "appVersion": "", "link": "" };
            //this._oInstance._oConfig = oConfig ? oConfigClass._fromStringToConfig(await oConfigClass._readFile(oConfigClass._sConfigPath)) : { "appVersion": "", "link": "" };

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
            /*let oLastConfig = oConfigClass._fromStringToConfig(await oConfigClass.httpGet(this._oConfigUrl));
            console.log("Last config = " + JSON.stringify(oLastConfig));
            if (oLastConfig.appVersion != oConfigClass.getInstance().getAppVersion()) {
                oConfigClass.getInstance()._thereIsNewConfig(oLastConfig);
                console.log("Last config ne config");
            };
            console.log("Last config end");*/
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
    /*private static async httpGet(sUrl: string): Promise<string> {
        console.log("httpGet");
        try {
            // var xmlHttp = new XMLHttpRequest();
            // await xmlHttp.open("GET", sUrl, true); // false for synchronous request
            // await xmlHttp.send(null);
            // console.log('xmlHttp.responseText: ' + xmlHttp.responseText);
            // return xmlHttp.responseText;
            const sLocalFileName: string = 'File.tmp';
            await this._removeFile(FileSystem.documentDirectory + sLocalFileName);
            const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
                const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            };
            const downloadResumable = FileSystem.createDownloadResumable(
                sUrl,
                FileSystem.documentDirectory + sLocalFileName,
                {},
                callback
            );
            try {
                const uri = await downloadResumable.downloadAsync();
                if (uri) {
                    const uri2: FileSystem.FileSystemDownloadResult = uri;
                    let sContent = this._readFile(sLocalFileName);
                    console.log("sContent = ", sContent);
                    return sContent;
                } else {
                    return '';
                }
            } catch (e) {
                console.error(e);
                return '';
            };


        } catch (error) {
            console.log(error);
            return '';
        }
    };*/


    /*private static async _saveFile(sPath: string, sContent: string): Promise<void> {
        //fs.writeFileSync(sPath, sContent);
        //rnfs.write(sPath, sContent);
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + sPath, sContent);
    };

    private static async _readFile(sPath: string): Promise<string> {
        //return fs.readFileSync(sPath).toString();
        //return rnfs.read(sPath).toString();
        //let sFileContent = await rnfs.read(sPath);
        try {
            let sFileContent: string;
            console.log("reading file " + sPath)
            // if (sPath.toLowerCase().substring(3, sPath.length - 3) === 'zip') {
            //     sFileContent = ""
            // } else {
            sFileContent = await FileSystem.readAsStringAsync(sPath);
            // }
            return sFileContent.toString();
        } catch (error) {
            console.log(error);
            return "";
        }
    };

    private static async _removeFile(sPath: string): Promise<void> {
        try {
            console.log("removing file " + sPath)
            await FileSystem.deleteAsync(FileSystem.documentDirectory + sPath);
        } catch (error) {
            console.log(error);
        }
    };

    private static async _removeDir(sPath: string): Promise<void> {
        //return fs.readFileSync(sPath).toString()
    };

    private static async _createDir(sPath: string): Promise<void> {
        //rnfs.mkdir(sPath);
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + sPath);
    }*/
}