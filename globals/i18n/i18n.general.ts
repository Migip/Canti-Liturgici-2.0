import i18n_it from "./i18n.it"



declare type i18n_list = {
    filtersButton: string,
    menuButton: string,
    searchBarPlaceholder: string,
    numberHeader: string,
    titleHeader: string,
    authorHeader: string,
    albumHeader: string,
    emptyList: string,
    progressDescription: string,
    chargeDescription: string,
    noInitDescription: string,
};

declare type i18n_filters = {
    title: string,
    searchPlaceholder: string,
    remember_apply: string,
    album: string,
    author: string,
    category: string,
    noSelection: string,
    someSelection: string,
    clearSelection: string,
    apply: string,
    info: string,
    infoExt: string,
    infoExt_aut: string,
    infoExt_alb: string,
    infoExt_cat: string,
    msgApply: string,
    msgClear: string,
};

declare type i18n_detail = {
    title: string,
    loading: string,
    share: string,
    error: string
};

export declare type i18n_text = {
    rit: string,
    cel: string,
    ass: string
};

declare type i18n_menu = {
    PopupClose: string,
    AppInfoButton: string,
    AppInfoVerNr: string,
    AppInfoChantsNr: string,
    AppInfoDescr: string,
    SettingsButton: string,
    SettingsHideMinorVoices: string,
    SettingsTextSize: string,
    SettingsTextExample: string,
    SettingsMessage: string,
    BackButton: string,
    OkButton: string,
};

export interface i18n {
    appTitle: string,
    //Homepage - Chant list
    list: i18n_list,
    /*filtersButton: string,
    menuButton: string,
    searchBarPlaceholder: string,
    numberChantListHeader: string,
    titleChantListHeader: string,
    emptyList: string,
    progressDescription: string,
    chargeDescription: string,*/

    //Homepage - Filters
    filter: i18n_filters,
    /*filtersTitle: string,
    AlbumFilter: string,
    AuthorFilter: string,
    CategoryFilter: string,
    FilterNoSelection: string,
    FilterSomeSelection: string,
    FilterClearSelection: string,
    FilterApply: string,
    FilterInfo: string,
    FilterInfoExt: string,
    FilterInfoExt_aut: string,
    FilterInfoExt_alb: string,
    FilterInfoExt_cat: string,*/
    //Homepage - Menù
    menu: i18n_menu,
    //Chant Details
    detail: i18n_detail,
    /*chantDetailTitle: string*/
    text: i18n_text
}

export default class i18n_class {
    private static _i18n: i18n;
    static getI18n(): i18n {
        if (this._i18n) {
            return this._i18n;
        } else {
            return new i18n_it();
        }
    }
}