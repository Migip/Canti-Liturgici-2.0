import { ReactNode } from "react";
import { expoHTMLclass, expoHTMLconst, expoHTMLText, htmlClass, htmlConst, HTMLconst, HTMLtag, htmlTagClass, htmlText, markdownTag, outputClasses, outputRNClasses, outputRNTexts, outputText, reactNativeTag, secondVoicesId } from "../constants/formatText";
import BoldText from "../../App/MinorComponents/ChantTextClass/Bold";
import ItalicText from "../../App/MinorComponents/ChantTextClass/Italic";
import BoldItalicText from "../../App/MinorComponents/ChantTextClass/BoldItalic";
import NoneText from "../../App/MinorComponents/ChantTextClass/None";
import { Text } from "react-native-elements";
import { Settings } from "./settings";

export class myRichText {
    public static formatMarkdown(sInput: string): string {
        let oText: myRichText = new myRichText(sInput);
        oText._formatMarkdown();
        return oText._getOutput();
    };

    public static formatExpoHtmlOld(sInput: string): ReactNode {
        let oText: myRichText = new myRichText(sInput);
        oText._formatExpoHTMLOld();
        return oText._getOutput();
    };

    public static formatHtml(sInput: string, sTitle: string, sAuthor: string | undefined, sAlbum: string | undefined): string {
        let oText: myRichText = new myRichText(sInput);
        oText._formatHTML(sTitle, sAuthor, sAlbum);
        return oText._getOutput();
    };

    public static formatRN(sInput: string): ReactNode {
        let oText: myRichText = new myRichText(sInput);
        oText._formatRN();
        return oText._getRNOutput();
    };

    private _sInput: string;
    private _sOutput: string = '';
    //private _aRNOutput: ReactNode[] = [];
    private _oRNOutput: ReactNode;
    //private _oTextRegex: RegExp = new RegExp('([a-zA-ZàèéìòùÀÈÉÌÒÙ0-9.]+)','ug');
    private _sTextRegex: RegExp = /([a-zA-ZàèéìòùÀÈÉÌÒÙ0-9().!?]+)/g;

    private constructor(sInput: string) {
        this._sInput = sInput;
    };

    private _getOutput(): string {
        return this._sOutput;
    };

    private _getRNOutput(): ReactNode {
        //return this._aRNOutput;
        if (this._oRNOutput === '') {
            return <Text></Text>
        } else {
            return this._oRNOutput;
        };
    };

    private _formatMarkdown(): void {
        let aParts: string[] = this._sInput.split('§');
        aParts.forEach((sPart: string) => {
            if (sPart.length >= 4) {
                let sKey: string = sPart.substring(0, 4);
                let sText: string = sPart.substring(4);
                let sOutputTag: string;
                let sAddText: string | undefined = undefined;

                sAddText = outputText[sKey];
                sOutputTag = outputClasses[sKey] || '';
                if (sAddText) {
                    this._addText(sText, sAddText);
                } else {
                    this._addTag(sText, sOutputTag);
                };
            } else {
                console.error("Errore formattazione: ", this._sInput);
            }
        });
    };

    private _formatRN(): void {
        let sInput: string = this._sInput;
        let iKey: number = 0;
        let aParts: string[] = sInput.split('§');
        let aExcludeKey: string[] = this._idToExclude();
        aParts.reverse().forEach((sPart: string) => {
            iKey += 1;
            if (sPart.length >= 4) {
                let sKey: string = sPart.substring(0, 4);
                if (aExcludeKey.find((sValue: string) => { return sValue === sKey }) === undefined) {
                    let sText: string = sPart.substring(4);
                    let sOutputTag: reactNativeTag;
                    let sAddText: string;

                    sAddText = outputRNTexts[sKey];
                    sOutputTag = outputRNClasses[sKey];
                    if (sAddText) {
                        this._addRNText(sText, sAddText, iKey);
                    } else {
                        this._addRNTag(sText, sOutputTag, iKey);
                    };
                };
            } else {
                console.error("Errore formattazione: ", this._sInput);
            }
        });
        this._oRNOutput = <Text>{this._oRNOutput}{'\n\n\n\n\n\n\n'}</Text>
    };

    private _formatHTML(sTitle: string, sAuthor: string | undefined, sAlbum: string | undefined): void {
        this._formatAnyHTML(htmlClass, htmlText, htmlConst);
        let sAlbumAuthor: string = '';
        if (sAlbum) {
            sAlbumAuthor =
                `<h2>
                    ${sAuthor} - ${sAlbum}
                </h2>`
        } else if (sAuthor) {
            sAlbumAuthor =
                `<h2>
                    ${sAuthor}
                </h2>`
        }
        this._sOutput =
            `<html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                </head>
                <body style="text-align: center;">
                    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
                        ${sTitle}
                    </h1>
                    ${sAlbumAuthor}
                    <p>
                            ${this._sOutput}
                    </p>
                    <footer><p><small><em>
                        File autogenerato dall'app Canti Liturgici
                    </em></small></p></footer>
                </body>
            </html>`;
    };

    private _formatExpoHTMLOld(): void {
        this._formatAnyHTML(expoHTMLclass, expoHTMLText, expoHTMLconst);
    };

    private _formatAnyHTML(oHtmlClass: htmlTagClass, oHtmlText: htmlTagClass, oHtmlConst: HTMLconst): void {

        let sInput: string = this._sInput;
        //sInput.replaceAll(/(?:\r\n|\r|\n)/g, oHtmlConst.newLine);
        sInput = sInput.replace(/(?:\r\n|\r|\n)/g, oHtmlConst.newLine);
        let aParts: string[] = sInput.split('§');
        let aExcludeKey: string[] = this._idToExclude();
        aParts.forEach((sPart: string) => {
            if (sPart.length >= 4) {
                let sKey: string = sPart.substring(0, 4);
                if (aExcludeKey.find((sValue: string) => { return sValue === sKey }) === undefined) {
                    let sText: string = sPart.substring(4);
                    let sOutputTag: HTMLtag;
                    let sAddText: HTMLtag;

                    sAddText = oHtmlText[sKey];
                    sOutputTag = oHtmlClass[sKey] || '';
                    if (sAddText) {
                        this._addHtmlText(sText, sAddText);
                    } else {
                        this._addHtmlTag(sText, sOutputTag);
                    };
                };
            } else {
                console.error("Errore formattazione: ", this._sInput);
            }
        });
    };

    private _addText(sText: string, sToAdd: string) {
        let sTextToAdd: string;
        if (this._firstCharIsText(sText)) {
            sTextToAdd = sToAdd + ' ' + sText;
        } else {
            sTextToAdd = sToAdd + sText;
        };

        if (this._lastCharIsText(this._sOutput)) {
            this._sOutput += ' ' + sTextToAdd;
        } else {
            this._sOutput += sTextToAdd;
        };
    };

    private _addTag(sText: string, sTag: string) {

        let sTextToAdd: string;
        if (sText.length > 0 && sTag !== markdownTag.none) {

            if (this._firstCharIsText(sText)) {

                /*let iActualOutputLen: number = this._sOutput.length;
                let iTagLen: number = sTag.length;
                if (iActualOutputLen >= iTagLen && this._sOutput.substring(iActualOutputLen - iTagLen, iTagLen)) {
                    this._sOutput = this._sOutput.slice(0, iActualOutputLen - iTagLen);
                    sTextToAdd = sText;
                } else {
                    sTextToAdd = sTag + sText;
                };*/
                if (this._sOutput.length > 0 && this._sOutput.substring(this._sOutput.length - 1).match(/[\*\_]$/)) {
                    //this._sOutput = this._sOutput.slice(0, this._sOutput.length - sTag.length);
                    //sTextToAdd = sText;
                    sTextToAdd = ' ' + sTag + sText;
                } else {
                    sTextToAdd = sTag + sText;
                };
            } else {
                //let aResults: RegExpExecArray | null = this._oTextRegex.exec(sText);
                let aResults: RegExpMatchArray | null = sText.match(this._sTextRegex);
                /*if (aResults?.index) {
                    sTextToAdd = sText.slice(0, aResults.index) + sTag + sText.slice(aResults.index);*/
                if (aResults && aResults.length > 0) {
                    sTextToAdd = sText.slice(0, sText.indexOf(aResults[0])) + sTag + sText.slice(sText.indexOf(aResults[0]));
                } else {
                    sTextToAdd = '';
                    if (aResults) {
                        console.error("_addTag:", sText, sTag, JSON.stringify(aResults), aResults?.index, sText.indexOf(aResults[0]));
                    } else {
                        console.error("Ciao, sono qui");
                    }
                };
            };

            if (this._lastCharIsText(sTextToAdd)) {
                sTextToAdd += sTag;
            } else {
                //let aResults: RegExpExecArray | null = this._oTextRegex.exec(sText);
                //let aResults: RegExpStringIterator<RegExpExecArray> = sText.matchAll(this._sTextRegex);
                let aResults: RegExpMatchArray | null = sTextToAdd.match(this._sTextRegex);
                if (aResults?.length) {
                    let sLastResult = aResults[aResults?.length - 1];
                    let iSpliceIndex: number = sTextToAdd.lastIndexOf(sLastResult) + sLastResult.length;
                    sTextToAdd = sTextToAdd.slice(0, iSpliceIndex) + sTag + sTextToAdd.slice(iSpliceIndex);

                } else {
                    console.error("_addTag 2", sText, sTag);
                    sTextToAdd += sTag;
                }
                /*if (aResults?.) {
                    sTextToAdd = sText.slice(0, aResults.index) + sTag + sText.slice(aResults.index);
                } else {
                    sTextToAdd = '';
                    console.error("_addTag:", sText, sTag);
                };*/
            };

            this._sOutput += sTextToAdd;
        } else {
            this._sOutput += sTag + sText + sTag;
        };
    };


    private _addHtmlText(sText: string, sToAdd: HTMLtag) {
        let sTextToAdd: string;
        sTextToAdd = sToAdd.start + sText + sToAdd.end;
        this._sOutput += sTextToAdd;
    };

    private _addHtmlTag(sText: string, sTag: HTMLtag) {

        let sTextToAdd: string;
        sTextToAdd = sTag.start + sText + sTag.end;
        this._sOutput += sTextToAdd;
    };


    private _addRNText(sText: string, sToAdd: string, iKey: number) {
        this._oRNOutput = <NoneText sText={sText} oSon={this._oRNOutput} key={iKey.toString()} />;
        this._oRNOutput = <BoldText sText={sToAdd} oSon={this._oRNOutput} key={iKey.toString()} />;
        //this._aRNOutput.push(<BoldText text={sTag} key={iKey.toString()} />);
        //this._aRNOutput.push(<NoneText text={sText} />);
    };

    private _addRNTag(sText: string, sTag: ReactNode, iKey: number) {
        let oTextToAdd: ReactNode;
        switch (sTag) {
            case reactNativeTag.bold:
                oTextToAdd = <BoldText sText={sText} oSon={this._oRNOutput} key={iKey.toString()} />
                break;
            case reactNativeTag.italic:
                oTextToAdd = <ItalicText sText={sText} oSon={this._oRNOutput} key={iKey.toString()} />
                break;
            case reactNativeTag.bold_italic:
                oTextToAdd = <BoldItalicText sText={sText} oSon={this._oRNOutput} key={iKey.toString()} />
                break;
            case reactNativeTag.none:
                oTextToAdd = <NoneText sText={sText} oSon={this._oRNOutput} key={iKey.toString()} />
                break;
            default:
                console.error("_addRNTag", sTag);
                break;
        };
        //this._aRNOutput.push(oTextToAdd);
        this._oRNOutput = oTextToAdd;
    };

    private _lastCharIsText(sText?: string): boolean {
        let sTestText: string = sText || this._sOutput;
        let iLen: number = sTestText.length;
        //if (iLen > 0 && this._oTextRegex.exec(sTestText.substring(iLen - 1))?.index === 0) {
        if (iLen > 0 && sTestText.substring(iLen - 1).match(this._sTextRegex)) {
            return true;
        } else {
            return false;
        }
    };

    private _firstCharIsText(sText?: string): boolean {
        let sTestText: string = sText || this._sOutput;
        let iLen: number = sTestText.length;
        //console.log("_firstCharIsText", iLen, sTestText, sTestText.substring(0, 1),this._oTextRegex.exec(sTestText.substring(0, 1))?.index === 0);
        //console.log("_firstCharIsText", iLen, sTestText, sTestText.substring(0, 1),this._oTextRegex.exec(sTestText.substring(0, 1))?.groups);
        //console.log("_firstCharIsText", iLen, sTestText, sTestText.substring(0, 1),sTestText.substring(0, 1).match(/([a-zA-ZàèéìòùÀÈÉÌÒÙ0-9.]+)/g));
        //if (iLen > 0 && this._oTextRegex.exec(sTestText.substring(0, 1))?.index === 0) {
        if (iLen > 0 && sTestText.substring(0, 1).match(this._sTextRegex)) {
            return true;
        } else {
            return false;
        };
    };

    private _idToExclude(): string[] {
        if (Settings.bHideSecondVoices) {
            // console.log("secondVoicesId", secondVoicesId);
            return secondVoicesId;
        } else {
            // console.log("secondVoicesId", []);
            return [];
        };
    };
}