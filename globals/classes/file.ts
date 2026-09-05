import { File, Directory, Paths } from 'expo-file-system';
import { unzipSync } from "fflate";
import { Buffer } from "buffer";

type TEncodingOptions = { encoding?: 'utf8' | 'base64' };

export class myFile {

    private static bLog: boolean = true;


    // ---------------------------------------------------------------
    // DOWNLOAD
    // ---------------------------------------------------------------

    public static async downloadFileToTmp(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, new File(Paths.cache, sDestPath));
    };

    public static async downloadFileToDocument(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, new File(Paths.document, sDestPath));
    };

    private static async _downloadFile(sUrl: string, oDest: File) {
        this._log("_downloadFile", sUrl, oDest.uri);
        try {
            // Assicura che la cartella di destinazione esista
            oDest.parentDirectory.create({ idempotent: true, intermediates: true });
            // Se il file esiste già lo rimuoviamo prima di scaricare: la nuova
            // downloadFileAsync (a differenza della vecchia downloadAsync) rifiuta
            // la chiamata con "Destination already exists" se non lo si fa.
            if (oDest.exists) {
                oDest.delete();
            }
            await File.downloadFileAsync(sUrl, oDest, { idempotent: true });
            this._log("_downloadFile completato", sUrl, oDest.uri);
        } catch (error) {
            console.error(error);
        }
    };


    // ---------------------------------------------------------------
    // WRITE
    // ---------------------------------------------------------------

    public static async writeTmpFile(sPath: string, sContent: string, options?: TEncodingOptions): Promise<void> {
        await this._writeFile(new File(Paths.cache, sPath), sContent, options);
    };

    public static async writeDocumentFile(sPath: string, sContent: string, options?: TEncodingOptions): Promise<void> {
        await this._writeFile(new File(Paths.document, sPath), sContent, options);
    };

    private static async _writeFile(oFile: File, sContent: string, options?: TEncodingOptions): Promise<void> {
        this._log("_writeFile", oFile.uri, options);
        if (oFile.uri.endsWith('onfig.json')) {
            console.log("_writeFile", oFile.uri, sContent);
        };
        try {
            oFile.parentDirectory.create({ idempotent: true, intermediates: true });
            oFile.create({ overwrite: true, intermediates: true });
            oFile.write(sContent, options);
        } catch (oReason) {
            console.error(oReason);
        }
    };


    // ---------------------------------------------------------------
    // READ
    // ---------------------------------------------------------------

    public static async readTmpFile(sPath: string, options?: TEncodingOptions): Promise<string> {
        return await this._readFile(new File(Paths.cache, sPath), options);
    };

    public static async readDocumentFile(sPath: string, options?: TEncodingOptions): Promise<string> {
        return await this._readFile(new File(Paths.document, sPath), options);
    };

    private static async _readFile(oFile: File, options?: TEncodingOptions): Promise<string> {
        this._log("_readFile", oFile.uri, options);
        try {
            if (options?.encoding === 'base64') {
                return await oFile.base64();
            }
            return await oFile.text();
        } catch (oError) {
            console.error(oError);
            return '';
        }
    };


    // ---------------------------------------------------------------
    // DELETE
    // ---------------------------------------------------------------

    public static async removeTmpFileOrDir(sPath: string): Promise<void> {
        await this._removeFileOrDir(Paths.join(Paths.cache, sPath));
    };

    public static async removeDocumentFileOrDir(sPath: string): Promise<void> {
        await this._removeFileOrDir(Paths.join(Paths.document, sPath));
    };

    private static async _removeFileOrDir(sUri: string): Promise<void> {
        this._log("_removeFileOrDir", sUri);
        try {
            const pathInfo = Paths.info(sUri);
            if (!pathInfo.exists) {
                // idempotente: se non esiste non c'è nulla da eliminare
                return;
            }
            if (pathInfo.isDirectory) {
                new Directory(sUri).delete();
            } else {
                new File(sUri).delete();
            }
        } catch (error) {
            console.error(error);
        }
    };


    // ---------------------------------------------------------------
    // CREATE DIR
    // ---------------------------------------------------------------

    public static async createTmpDir(sPath: string, options?: { intermediates?: boolean }): Promise<void> {
        await this._createDir(new Directory(Paths.cache, sPath), options);
    };

    public static async createDocumentDir(sPath: string, options?: { intermediates?: boolean }): Promise<void> {
        await this._createDir(new Directory(Paths.document, sPath), options);
    };

    private static async _createDir(oDir: Directory, options?: { intermediates?: boolean }): Promise<void> {
        this._log("_createDir", oDir.uri, options);
        try {
            oDir.create({ idempotent: true, intermediates: options?.intermediates ?? true });
        } catch (error) {
            console.error(error);
        }
    };


    // ---------------------------------------------------------------
    // INFO
    // ---------------------------------------------------------------

    public static async getTmpDirOrFileInfo(sPath: string) {
        return await this._getDirOrFileInfo(Paths.join(Paths.cache, sPath));
    };

    public static async getDocumentDirOrFileInfo(sPath: string) {
        return await this._getDirOrFileInfo(Paths.join(Paths.document, sPath));
    };

    private static async _getDirOrFileInfo(sUri: string) {
        this._log("_getDirOrFileInfo", sUri);
        try {
            const pathInfo = Paths.info(sUri);
            if (!pathInfo.exists) {
                return { exists: false as const, isDirectory: null, uri: sUri };
            }
            if (pathInfo.isDirectory) {
                const oDir = new Directory(sUri);
                return { ...oDir.info(), exists: true as const, isDirectory: true as const };
            }
            const oFile = new File(sUri);
            return { ...oFile.info(), exists: true as const, isDirectory: false as const };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    // ---------------------------------------------------------------
    // UNZIP
    // ---------------------------------------------------------------

    public static async unzipTmpToDocument(sZipPath: string, sContentDest: string) {
        await this._unzip(new File(Paths.cache, sZipPath), new Directory(Paths.document, sContentDest));
    };

    private static async _unzip(oZipFile: File, oContentDest: Directory) {
        this._log("_unzip 0", oZipFile.uri);
        let sZipContent = await this._readFile(oZipFile, { encoding: 'base64' });

        try {
            this._log("_unzip 1", "Sto unzippando");
            const zipArray = new Uint8Array(Buffer.from(sZipContent, 'base64'));
            // Unzip the file using fflate
            const unzippedFiles = unzipSync(zipArray); // unzippedFiles is an object with file names as keys and Uint8Array as values
            this._log("_unzip 2", "Files unzipped:", Object.keys(unzippedFiles));
            //console.log("Files unzipped:", Object.keys(unzippedFiles));

            // Ensure the unzipped folder exists (pulita se già presente)
            if (!oContentDest.exists) {
                oContentDest.create({ idempotent: true, intermediates: true });
            } else {
                oContentDest.delete();
                oContentDest.create({ idempotent: true, intermediates: true });
            }

            // Save each unzipped file to the unzipped folder
            for (const [fileName, fileData] of Object.entries(unzippedFiles)) {
                if (fileName.substring(fileName.length - 1) !== '/') {
                    // File: convertiamo in base64 e scriviamo
                    const base64Content = Buffer.from(fileData).toString('base64');
                    const oFile = new File(oContentDest, fileName);
                    //this._log("_unzip 3", `Saving ${fileName} to ${oFile.uri}`);
                    oFile.parentDirectory.create({ idempotent: true, intermediates: true });
                    oFile.create({ overwrite: true, intermediates: true });
                    oFile.write(base64Content, { encoding: 'base64' });
                    //this._log("_unzip 4", `Saved ${fileName} to ${oFile.uri}`);
                } else {
                    // Directory
                    const oDir = new Directory(oContentDest, fileName);
                    oDir.create({ idempotent: true, intermediates: true });
                    //this._log("_unzip 5", `Saved directory ${fileName} to ${oDir.uri}`);
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