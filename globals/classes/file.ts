import { Directory, File, Paths } from 'expo-file-system';
import { unzipSync } from 'fflate';
import { Buffer } from 'buffer';

export type myFileEncoding = 'utf8' | 'base64';

export interface myReadOptions {
    encoding?: myFileEncoding;
}

export interface myWriteOptions {
    encoding?: myFileEncoding;
}

export interface myDeleteOptions {
    /** Se true, non genera errore se il file/cartella non esiste. */
    idempotent?: boolean;
}

export interface myMakeDirOptions {
    /** Se true, crea anche le cartelle intermedie (e non fallisce se esiste già). */
    intermediates?: boolean;
}

export interface myFileInfo {
    exists: boolean;
    uri: string;
    isDirectory: boolean;
    size?: number;
    modificationTime?: number;
}

export class myFile {

    private static bLog: boolean = false;

    // ------------------------------------------------------------------
    // Helper per i percorsi
    // ------------------------------------------------------------------

    /**
     * Spezza un percorso relativo in segmenti, scartando "", "." e rifiutando ".."
     * (protezione da path traversal, ad es. zip con voci tipo "../../x").
     */
    private static _splitPath(sPath: string): string[] {
        const aParts = sPath.split('/').filter((s) => s !== '' && s !== '.');
        if (aParts.some((s) => s === '..')) {
            throw new Error(`Percorso non valido (contiene ".."): ${sPath}`);
        }
        return aParts;
    };

    private static _file(oBase: Directory, sPath: string): File {
        return new File(oBase, ...this._splitPath(sPath));
    };

    private static _dir(oBase: Directory, sPath: string): Directory {
        return new Directory(oBase, ...this._splitPath(sPath));
    };

    // ------------------------------------------------------------------
    // Download
    // ------------------------------------------------------------------

    public static async downloadFileToTmp(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, Paths.cache, sDestPath);
    };

    public static async downloadFileToDocument(sUrl: string, sDestPath: string) {
        await this._downloadFile(sUrl, Paths.document, sDestPath);
    };

    private static async _downloadFile(sUrl: string, oBase: Directory, sDestPath: string) {
        this._log("_downloadFile", sUrl, sDestPath);
        try {
            const oDest = this._file(oBase, sDestPath);
            // La cartella di destinazione deve esistere
            oDest.parentDirectory.create({ intermediates: true, idempotent: true });
            // idempotent: true => sovrascrive il file se già presente (come downloadAsync)
            await File.downloadFileAsync(sUrl, oDest, { idempotent: true });
            this._log("_downloadFile completato", sUrl, oDest.uri);
        } catch (error) {
            console.error(error);
        }
    };

    // ------------------------------------------------------------------
    // Scrittura
    // ------------------------------------------------------------------

    public static async writeTmpFile(sPath: string, sContent: string, options?: myWriteOptions): Promise<void> {
        await this._writeFile(Paths.cache, sPath, sContent, options);
    };

    public static async writeDocumentFile(sPath: string, sContent: string, options?: myWriteOptions): Promise<void> {
        await this._writeFile(Paths.document, sPath, sContent, options);
    };

    private static async _writeFile(oBase: Directory, sPath: string, sContent: string, options?: myWriteOptions): Promise<void> {
        this._log("_writeFile", sPath, options);
        try {
            const oFile = this._file(oBase, sPath);
            if (options?.encoding === 'base64') {
                oFile.write(new Uint8Array(Buffer.from(sContent, 'base64')));
            } else {
                oFile.write(sContent);
            }
        } catch (oReason) {
            console.error(oReason);
        }
    };

    // ------------------------------------------------------------------
    // Lettura
    // ------------------------------------------------------------------

    public static async readTmpFile(sPath: string, options?: myReadOptions): Promise<string> {
        return await this._readFile(Paths.cache, sPath, options);
    };

    public static async readDocumentFile(sPath: string, options?: myReadOptions): Promise<string> {
        return await this._readFile(Paths.document, sPath, options);
    };

    private static async _readFile(oBase: Directory, sPath: string, options?: myReadOptions): Promise<string> {
        this._log("_readFile", sPath, options);
        try {
            const oFile = this._file(oBase, sPath);
            return options?.encoding === 'base64'
                ? await oFile.base64()
                : await oFile.text();
        } catch (oError) {
            console.error(oError);
            return '';
        }
    };

    // ------------------------------------------------------------------
    // Cancellazione
    // ------------------------------------------------------------------

    public static async removeTmpFileOrDir(sPath: string, options?: myDeleteOptions): Promise<void> {
        await this._removeFileOrDir(Paths.cache, sPath, options);
    };

    public static async removeDocumentFileOrDir(sPath: string, options?: myDeleteOptions): Promise<void> {
        await this._removeFileOrDir(Paths.document, sPath, options);
    };

    private static async _removeFileOrDir(oBase: Directory, sPath: string, options?: myDeleteOptions): Promise<void> {
        this._log("_removeFileOrDir", sPath, options);
        try {
            const aParts = this._splitPath(sPath);
            if (aParts.length === 0) {
                // Evita di cancellare l'intera cartella cache/document
                throw new Error("Percorso vuoto: cancellazione della radice non consentita");
            }
            const oFile = new File(oBase, ...aParts);
            if (oFile.exists) {
                oFile.delete();
                return;
            }
            const oDir = new Directory(oBase, ...aParts);
            if (oDir.exists) {
                oDir.delete();
                return;
            }
            if (!options?.idempotent) {
                throw new Error(`File o cartella non trovati: ${oFile.uri}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ------------------------------------------------------------------
    // Creazione cartelle
    // ------------------------------------------------------------------

    public static async createTmpDir(sPath: string, options?: myMakeDirOptions): Promise<void> {
        await this._createDir(Paths.cache, sPath, options);
    };

    public static async createDocumentDir(sPath: string, options?: myMakeDirOptions): Promise<void> {
        await this._createDir(Paths.document, sPath, options);
    };

    private static async _createDir(oBase: Directory, sPath: string, options?: myMakeDirOptions): Promise<void> {
        this._log("_createDir", sPath, options);
        try {
            const bIntermediates = !!options?.intermediates;
            this._dir(oBase, sPath).create({ intermediates: bIntermediates, idempotent: bIntermediates });
        } catch (error) {
            console.error(error);
        }
    };

    // ------------------------------------------------------------------
    // Info
    // ------------------------------------------------------------------

    public static async getTmpDirOrFileInfo(sPath: string): Promise<myFileInfo> {
        return await this._getDirOrFileInfo(Paths.cache, sPath);
    };

    public static async getDocumentDirOrFileInfo(sPath: string): Promise<myFileInfo> {
        return await this._getDirOrFileInfo(Paths.document, sPath);
    };

    private static async _getDirOrFileInfo(oBase: Directory, sPath: string): Promise<myFileInfo> {
        this._log("_getDirOrFileInfo", sPath);
        try {
            const oFile = this._file(oBase, sPath);
            if (oFile.exists) {
                return {
                    exists: true,
                    uri: oFile.uri,
                    isDirectory: false,
                    size: oFile.size ?? undefined,
                    modificationTime: oFile.modificationTime ?? undefined,
                };
            }
            const oDir = this._dir(oBase, sPath);
            if (oDir.exists) {
                return { exists: true, uri: oDir.uri, isDirectory: true };
            }
            return { exists: false, uri: oFile.uri, isDirectory: false };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // ------------------------------------------------------------------
    // Unzip
    // ------------------------------------------------------------------

    public static async unzipTmpToDocument(sZipPath: string, sContentDest: string) {
        await this._unzip(Paths.cache, sZipPath, Paths.document, sContentDest);
    };

    private static async _unzip(oZipBase: Directory, sZipPath: string, oDestBase: Directory, sContentDest: string) {
        this._log("_unzip 0", sZipPath);
        try {
            const oZip = this._file(oZipBase, sZipPath);
            if (!oZip.exists) {
                throw new Error(`Zip non trovato: ${oZip.uri}`);
            }

            // Lettura diretta dei byte: niente passaggio per base64/Buffer
            const zipArray = await oZip.bytes();

            this._log("_unzip 1", "Sto unzippando");
            const unzippedFiles = unzipSync(zipArray); // { nomeFile: Uint8Array }
            this._log("_unzip 2", "Files unzipped:", Object.keys(unzippedFiles));

            const aDestParts = this._splitPath(sContentDest);
            if (aDestParts.length === 0) {
                // Sotto si cancella la cartella di destinazione: mai la radice
                throw new Error("Destinazione vuota: unzip nella radice non consentito");
            }
            const oDest = new Directory(oDestBase, ...aDestParts);

            // Ricrea da zero la cartella di destinazione
            if (oDest.exists) {
                oDest.delete();
            }
            oDest.create({ intermediates: true });

            for (const [fileName, fileData] of Object.entries(unzippedFiles)) {
                const aParts = this._splitPath(fileName); // rifiuta ".." (zip slip)
                if (aParts.length === 0) {
                    continue;
                }
                if (fileName.endsWith('/')) {
                    new Directory(oDest, ...aParts).create({ intermediates: true, idempotent: true });
                } else {
                    const oOut = new File(oDest, ...aParts);
                    // Alcuni zip non hanno le voci delle cartelle: creo il parent se serve
                    oOut.parentDirectory.create({ intermediates: true, idempotent: true });
                    oOut.write(fileData);
                }
            }
        } catch (oError) {
            console.error('_unzip', oError);
        }
    };

    private static _log(message?: any, ...optionalParams: any[]) {
        if (this.bLog) {
            console.log("myFile", message, optionalParams);
        }
    };
}