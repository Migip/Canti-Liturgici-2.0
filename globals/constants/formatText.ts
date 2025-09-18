import { ReactNode } from "react";
import BoldText from "../../App/MinorComponents/ChantTextClass/Bold";
import i18n_class from "../i18n/i18n.general";

/* ---------------------- REACT-NATIVE ---------------------- */
export enum reactNativeTag {
    bold,
    italic,
    none,
    bold_italic
};


export const secondVoicesId: string[] = [
    "str4",
    "rit6"
];

export const outputRNClasses: { [key: string]: reactNativeTag } = {
    "str0": reactNativeTag.none,
    "str1": reactNativeTag.italic,
    "str2": reactNativeTag.italic,
    "str3": reactNativeTag.italic,
    "str4": reactNativeTag.italic,
    "strn": reactNativeTag.bold,
    "rit0": reactNativeTag.bold,
    "rit2": reactNativeTag.bold_italic,
    "rit3": reactNativeTag.bold,
    "rit4": reactNativeTag.bold_italic,
    "rit5": reactNativeTag.bold_italic,
    "rit6": reactNativeTag.bold_italic,
    "ritf": reactNativeTag.bold
};

export const outputRNTexts: { [key: string]: string } = {
    "rit1": i18n_class.getI18n().text.rit,
    "cel0": i18n_class.getI18n().text.cel,
    "ass0": i18n_class.getI18n().text.ass
};

/* ---------------------- MARKDOWN ---------------------- */
export const enum markdownTag {
    bold = '**',
    italic = '_',
    none = '',
    bold_italic = '***'
};

export const outputClasses: { [key: string]: string } = {
    "str0": markdownTag.none,
    "str1": markdownTag.italic,
    "str2": markdownTag.italic,
    "str3": markdownTag.italic,
    "str4": markdownTag.italic,
    "strn": markdownTag.bold,
    "rit0": markdownTag.bold,
    "rit2": markdownTag.bold_italic,
    "rit3": markdownTag.bold,
    "rit4": markdownTag.bold_italic,
    "rit5": markdownTag.bold_italic,
    "rit6": markdownTag.bold_italic,
    "ritf": markdownTag.bold
};

export const outputText: { [key: string]: string } = {
    "rit1": markdownTag.bold + i18n_class.getI18n().text.rit + markdownTag.bold,
    "cel0": markdownTag.bold + i18n_class.getI18n().text.cel + markdownTag.bold,
    "ass0": markdownTag.bold + i18n_class.getI18n().text.ass + markdownTag.bold
};



/* ---------------------- HTML ---------------------- */
export declare type HTMLtag = {
    start: string,
    end: string
};

export declare type htmlTagClass = {
    [key: string]: HTMLtag
};

export declare type HTMLconst = {
    newLine: string
};

export const htmlTag: htmlTagClass = {
    bold: {
        start: '<strong>',
        end: '</strong>'
    },
    italic: {
        start: '<i>',
        end: '</i>'
    },
    none: {
        start: '',
        end: ''
    },
    bold_italic: {
        start: '<strong><i>',
        end: '</i></strong>'
    }
};

export const expoHtmlTag: htmlTagClass = {
    bold: {
        start: '<Strong>',
        end: '</Strong>'
    },
    italic: {
        start: '<I>',
        end: '</I>'
    },
    none: {
        start: '',
        end: ''
    },
    bold_italic: {
        start: '<Strong><I>',
        end: '</I></Strong>'
    }
};

export const expoHTMLconst: HTMLconst = {
    newLine: '<BR />'
};

export const expoHTMLclass: htmlTagClass = {
    "header": {
        start: '<Header>',
        end: '</Header>'
    },
    "main": {
        start: '<Main>',
        end: '</Main>'
    },
    "str0": expoHtmlTag.none,
    "str1": expoHtmlTag.italic,
    "str2": expoHtmlTag.italic,
    "str3": expoHtmlTag.italic,
    "str4": expoHtmlTag.italic,
    "strn": expoHtmlTag.bold,
    "rit0": expoHtmlTag.bold,
    "rit2": expoHtmlTag.bold_italic,
    "rit3": expoHtmlTag.bold,
    "rit4": expoHtmlTag.bold_italic,
    "rit5": expoHtmlTag.bold_italic,
    "rit6": expoHtmlTag.bold_italic,
    "ritf": expoHtmlTag.bold
};

export const expoHTMLText: htmlTagClass = {
    "rit1":
    {
        start: expoHtmlTag.bold.start + i18n_class.getI18n().text.rit + expoHtmlTag.bold.end + expoHtmlTag.none.start,
        end: expoHtmlTag.none.end
    },
    "cel0":
    {
        start: expoHtmlTag.bold.start + i18n_class.getI18n().text.cel + expoHtmlTag.bold.end + expoHtmlTag.none.start,
        end: expoHtmlTag.none.end
    },
    "ass0":
    {
        start: expoHtmlTag.bold.start + i18n_class.getI18n().text.ass + expoHtmlTag.bold.end + expoHtmlTag.none.start,
        end: expoHtmlTag.none.end
    }
};

export const htmlClass: htmlTagClass = {
    "header": {
        start: '<header>',
        end: '</header>'
    },
    "main": {
        start: '<main>',
        end: '</main>'
    },
    "str0": htmlTag.none,
    "str1": htmlTag.italic,
    "str2": htmlTag.italic,
    "str3": htmlTag.italic,
    "str4": htmlTag.italic,
    "strn": htmlTag.bold,
    "rit0": htmlTag.bold,
    "rit2": htmlTag.bold_italic,
    "rit3": htmlTag.bold,
    "rit4": htmlTag.bold_italic,
    "rit5": htmlTag.bold_italic,
    "rit6": htmlTag.bold_italic,
    "ritf": htmlTag.bold
};

export const htmlText: htmlTagClass = {
    "rit1":
    {
        start: htmlTag.bold.start + i18n_class.getI18n().text.rit + htmlTag.bold.end + htmlTag.none.start,
        end: htmlTag.none.end
    },
    "cel0":
    {
        start: htmlTag.bold.start + i18n_class.getI18n().text.cel + htmlTag.bold.end + htmlTag.none.start,
        end: htmlTag.none.end
    },
    "ass0":
    {
        start: htmlTag.bold.start + i18n_class.getI18n().text.ass + htmlTag.bold.end + htmlTag.none.start,
        end: htmlTag.none.end
    }
};

export const htmlConst: HTMLconst = {
    newLine: '<br />'
};