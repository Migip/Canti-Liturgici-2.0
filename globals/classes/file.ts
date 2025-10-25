
import * as FileSystem from 'expo-file-system';
import { unzipSync } from "fflate";
import { Buffer } from "buffer";

export class myFile {

    private static bLog: boolean = true;


    public static async downloadFileToTmp(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, FileSystem.cacheDirectory + sDestPath);
    };

    public static async downloadFileToDocument(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, FileSystem.documentDirectory + sDestPath);
    };

    private static async _downloadFile(sUrl: string, sDestPath: string) {
        this._log("_downloadFile", sUrl, sDestPath);
        try {
            await FileSystem.downloadAsync(
                sUrl,
                sDestPath
            );
            this._log("_downloadFile completato", sUrl, sDestPath);
        } catch (error) {
            console.error(error);
        }
    };

    public static async writeTmpFile(sPath: string, sContent: string, options?: FileSystem.WritingOptions): Promise<void> {
        await this._writeFile(FileSystem.cacheDirectory + sPath, sContent, options);
    };

    public static async writeDocumentFile(sPath: string, sContent: string, options?: FileSystem.WritingOptions): Promise<void> {
        await this._writeFile(FileSystem.documentDirectory + sPath, sContent, options);
    };

    private static async _writeFile(sPath: string, sContent: string, options?: FileSystem.WritingOptions): Promise<void> {
        this._log("_writeFile", sPath, options);
        if (sPath.endsWith('onfig.json')) {
            console.log("_writeFile", sPath, sContent);
        };
        await FileSystem.writeAsStringAsync(sPath, sContent, options)
            .catch((oReason) => {
                console.error(oReason);
            });
    };


    public static async readTmpFile(sPath: string, options?: FileSystem.ReadingOptions | undefined): Promise<string> {
        return await this._readFile(FileSystem.cacheDirectory + sPath, options);
    };

    public static async readDocumentFile(sPath: string, options?: FileSystem.ReadingOptions | undefined): Promise<string> {
        return await this._readFile(FileSystem.documentDirectory + sPath, options);
    };

    private static async _readFile(sPath: string, options?: FileSystem.ReadingOptions | undefined): Promise<string> {
        this._log("_readFile", sPath, options);
        try {
            return await FileSystem.readAsStringAsync(sPath, options);
        } catch (oError) {
            console.error(oError);
            return '';
        }
    };


    public static async removeTmpFileOrDir(sPath: string, options?: FileSystem.DeletingOptions): Promise<void> {
        await this._removeFileOrDir(FileSystem.cacheDirectory + sPath, options);
    };

    public static async removeDocumentFileOrDir(sPath: string, options?: FileSystem.DeletingOptions): Promise<void> {
        await this._removeFileOrDir(FileSystem.documentDirectory + sPath, options);
    };

    private static async _removeFileOrDir(sPath: string, options?: FileSystem.DeletingOptions): Promise<void> {
        this._log("_removeFileOrDir", sPath, options);
        try {
            await FileSystem.deleteAsync(sPath, options);
        } catch (error) {
            console.error(error);
        }
    };


    public static async createTmpDir(sPath: string, options?: FileSystem.MakeDirectoryOptions | undefined): Promise<void> {
        await this._createDir(FileSystem.cacheDirectory + sPath, options);
    };

    public static async createDocumentDir(sPath: string, options?: FileSystem.MakeDirectoryOptions | undefined): Promise<void> {
        await this._createDir(FileSystem.documentDirectory + sPath, options);
    };

    private static async _createDir(sPath: string, options?: FileSystem.MakeDirectoryOptions | undefined): Promise<void> {
        this._log("_createDir", sPath, options);
        try {
            await FileSystem.makeDirectoryAsync(sPath, options);
        } catch (error) {
            console.error(error);
        }
    };


    public static async getTmpDirOrFileInfo(sPath: string): Promise<FileSystem.FileInfo> {
        return await this._getDirOrFileInfo(FileSystem.cacheDirectory + sPath);
    };

    public static async getDocumentDirOrFileInfo(sPath: string): Promise<FileSystem.FileInfo> {
        return await this._getDirOrFileInfo(FileSystem.documentDirectory + sPath);
    };

    private static async _getDirOrFileInfo(sPath: string): Promise<FileSystem.FileInfo> {
        this._log("_getDirOrFileInfo", sPath);
        try {
            return await FileSystem.getInfoAsync(sPath);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    public static async unzipTmpToDocument(sZipPath: string, sContentDest: string) {
        await this._unzip(FileSystem.cacheDirectory + sZipPath, FileSystem.documentDirectory + sContentDest);
    };

    private static async _unzip(sZipPath: string, sContentDest: string) {
        this._log("_unzip 0", sZipPath);
        let sZipContent = await this._readFile(sZipPath, { encoding: FileSystem.EncodingType.Base64 });

        try {
            this._log("_unzip 1", "Sto unzippando");
            const zipArray = new Uint8Array(Buffer.from(sZipContent, FileSystem.EncodingType.Base64));
            // Unzip the file using fflate
            const unzippedFiles = unzipSync(zipArray); // unzippedFiles is an object with file names as keys and Uint8Array as values
            this._log("_unzip 2", "Files unzipped:", Object.keys(unzippedFiles));
            //console.log("Files unzipped:", Object.keys(unzippedFiles));

            // Ensure the unzipped folder exists
            const folderInfo = await this._getDirOrFileInfo(sContentDest);
            if (!folderInfo.exists) {
                await this._createDir(sContentDest, { intermediates: true });
            } else {
                await this._removeFileOrDir(sContentDest, { idempotent: true });
                await this._createDir(sContentDest, { intermediates: true });
            }

            // Save each unzipped file to the unzipped folder
            for (const [fileName, fileData] of Object.entries(unzippedFiles)) {
                const filePath = sContentDest + fileName;

                const base64Content = Buffer.from(fileData).toString(FileSystem.EncodingType.Base64);
                //console.log(`Saving ${fileName} to ${filePath} content ${base64Content.substring(0, 20)}`);
                //this._log("_unzip 3", `Saving ${fileName} to ${filePath}`);
                if (fileName.substring(fileName.length - 1) !== '/') {
                    // Convert the file content (Uint8Array) to string (for text files) or directly save binary data (for images, etc.)
                    await this._writeFile(filePath, base64Content, { encoding: FileSystem.EncodingType.Base64 });
                    //this._log("_unzip 4", `Saved ${fileName} to ${filePath}`);
                    // console.log(`Saved ${fileName} to ${filePath} content ${base64Content.substring(0, 20)}`);
                } else {
                    await this._createDir(filePath, { intermediates: true });
                    //this._log("_unzip 5", `Saved directory ${fileName} to ${filePath}`);
                    // console.log(`Saved directory ${fileName} to ${filePath}`);
                };
            }
        } catch (oError) {
            console.error('_unzip', oError);
        }
    };

    private static _log(message?: any, ...optionalParams: any[]) {
        //console.log("myFile", message, optionalParams);
    };
}