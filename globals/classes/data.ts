import { BusyIndicator, funcSortValues } from './../constants/tsGeneral';
import { oConfigClass } from './config';
import { cFilter } from './filter';
/*export const enum jsonProperty {
    fileAuthor = 'a01',
    fileAlbum = 'a02',
    fileCategory = 'c01',
    displayedAuthor = 'a03',
    displayedAlbum = 'a02'
}*/

export declare type oSummaryFileJsonData = Array<{
    i01: string, //id
    t01: string[], //titolo
    a01?: Array<string>, //autore
    a02?: string[], //album
    c01?: Array<string> //categoria
}>


export declare type oSummaryJsonLine = {
    number: string, //id
    title: string, //titolo
    titleU: string, //titolo in maiuscolo
    authors?: Array<string>, //autore
    album?: string[], //album
    displAuthors?: string, //Autore a video
    displAlbums?: string, //Album a video
    categories?: Array<string> //categoria
};

export declare type aSummaryJsonData = Array<oSummaryJsonLine>;

export declare type oFilterModel = {
    selected: boolean,
    value: string
};

export declare type aFilterModel = Array<oFilterModel>;

export declare type fSetState = { (aData: aSummaryJsonData): void };
export declare type fSetBusy = { (bSet: BusyIndicator): void };

export class oData {
    private _aData: aSummaryJsonData | undefined;
    private _aDisplayedData: aSummaryJsonData = [];
    private _aAuthorsFilter: aFilterModel;
    private _aAlbumsFilter: aFilterModel;
    private _aCategoriesFilter: aFilterModel;
    //private _oConfig: oConfigClass;
    private static _fSetStateFunction?: fSetState;
    private static _fSetBusyFunction?: fSetBusy;
    //private readonly _oOnlyNumbersRegexp: RegExp = new RegExp('^[0-9]+$');

    private static _oInstance: oData;

    public static getInstance(
        fSetBusyFunction?: fSetBusy,
        fSetStateFunction?: fSetState): oData {
        if (fSetStateFunction) {
            this._fSetStateFunction = fSetStateFunction;
            this._fSetBusyFunction = fSetBusyFunction;
        };
        if (!this._oInstance) {
            this._oInstance = new oData();
        }
        return this._oInstance;
    };

    public static convText(sString: string): string {
        let sLocalString = sString.toUpperCase();
        return sLocalString;
    };

    private constructor() {
        //this._oConfig = oConfigClass.getInstance();
        //this._aData = this._getData();
        this._aData = undefined;
        //this._aData = [];
        /*this._getDataAsync()
            .then((result) => {
                this._aData = result;
                console.log("result = " + this._aData);
                if (oData._fSetStateFunction != undefined) {
                    oData._fSetStateFunction(this._aData);
                };
            });
        this._aAuthorsFilter = this._getAllAuthors();
        this._aAlbumsFilter = this._getAllAlbums();
        this._aCategoriesFilter = this._getAllCategories();*/
        this._aAuthorsFilter = [];
        this._aAlbumsFilter = [];
        this._aCategoriesFilter = [];
    };
    /*public getInitial(): aSummaryJsonData{
        let oEmptyRow: oSummaryJsonLine = {
            i01: "0",
            t01: "",
            t02: ""
        };
        return [oEmptyRow];
    };*/
    /*public static onNewConfig() {
        //if (this._fSetStateFunction) {
        this._oInstance = new oData();
        this._oInstance.getData()
            .then((aData: aSummaryJsonData) => {
                if (oData._fSetStateFunction) {
                    oData._fSetStateFunction(aData);
                }
            })
            .catch((reason) => {
                console.error(reason);
            })
        //this._fSetStateFunction(this._oInstance.getData());
        //};
    };*/

    public async getData(sSearch: string = ''): Promise<aSummaryJsonData> {
        //console.log("getData");
        //let oSearchRegexp: RegExp;
        //let sSearchLocl: string = sSearch != undefined ? sSearch : '';
        try {

            if (this._aData === undefined) {
                this._aData = await this._getDataAsync();
                this._aAuthorsFilter = this._getAllAuthors();
                this._aAlbumsFilter = this._getAllAlbums();
                this._aCategoriesFilter = this._getAllCategories();
            };

            this._aDisplayedData = cFilter.filter(
                this._aData,
                this._aAuthorsFilter,
                this._aAlbumsFilter,
                this._aCategoriesFilter,
                sSearch);
        } catch (error) {
            console.error('getData4', error);
        }

        /*if (cOldFilter.stateIsChanged(
            this._aAuthorsFilter,
            this._aAlbumsFilter,
            this._aCategoriesFilter,
            sSearchLocl
        )) {
            if (sSearch && this._oOnlyNumbersRegexp.test(sSearch)) {
                //Chant number search
                oSearchRegexp = new RegExp(
                    '.*'
                    +
                    sSearch
                    +
                    '.*'
                );
                this._aDisplayedData = this._aData.filter((item: oSummaryJsonLine) => {
                    return oSearchRegexp.test(item.i01);
                });
            } else if (sSearch) {
                //Chant title search
                oSearchRegexp = new RegExp(
                    '.*'
                    +
                    sSearch.toUpperCase().split(" ").join(".*")
                    +
                    '.*'
                );
                this._aDisplayedData = this._aData.filter((item: oSummaryJsonLine) => {
                    return oSearchRegexp.test(item.t02);
                });
            } else {
                //No search
                this._aDisplayedData = this._aData;
            };
        };*/
        /*this._aDisplayedData =
            this._aDisplayedData.filter(
                (oItem) =>
                    {
                        
                    }
            )*/
        return this._aDisplayedData;
    };
    /*public getAuthors(): aFilterModel {
        return this._aAuthorsFilter;
    };
    public getAlbums(): aFilterModel {
        return this._aAlbumsFilter;
    };
    public getCategories(): aFilterModel {
        return this._aCategoriesFilter;
    };*/
    public get Authors(): aFilterModel {
        return this._aAuthorsFilter;
    }
    public set Authors(aAuthors: aFilterModel) {
        this._aAuthorsFilter = aAuthors;
    };

    public get Albums(): aFilterModel {
        return this._aAlbumsFilter;
    };
    public set Albums(aAlbums: aFilterModel) {
        this._aAlbumsFilter = aAlbums;
    };

    public get Categories(): aFilterModel {
        return this._aCategoriesFilter;
    };
    public set Categories(aCategories: aFilterModel) {
        this._aCategoriesFilter = aCategories;
    };

    public getNumberOfSelected(): number {
        let iAlbums: number = this.Albums.filter((oValue: oFilterModel) => { return oValue.selected === true }).length;
        let iAuthors: number = this.Authors.filter((oValue: oFilterModel) => { return oValue.selected === true }).length;
        let iCategories: number = this.Categories.filter((oValue: oFilterModel) => { return oValue.selected === true }).length;
        return iAlbums + iAuthors + iCategories;
    };

    public resetFilters() {
        this._aAuthorsFilter.forEach(
            (oAuthorItem) =>
                oAuthorItem.selected = false
        );
        this._aAlbumsFilter.forEach(
            (oAlbumItem) =>
                oAlbumItem.selected = false
        );
        this._aCategoriesFilter.forEach(
            (oCategoryItem) =>
                oCategoryItem.selected = false
        );
    };
    // private _getData(): aSummaryJsonData {
    //     let aFileData: oSummaryFileJsonData;
    //     let aData: aSummaryJsonData = [];
    //     //aFileData = this._oConfig.getJsonData();
    //     aFileData = this._oConfig.getJsonDataSync();
    //     /*aFileData = [
    //         {
    //             i01: '1',
    //             t01: 'Andemus a sa grutta',
    //             a01: ['Autore 1', 'Autore 3'],
    //             c01: ['Natale']
    //         },
    //         {
    //             i01: '2',
    //             t01: 'Astro del ciel'
    //         },
    //         {
    //             i01: '3',
    //             t01: 'Come il pellicano',
    //             a01: ['Gen Verde']
    //         },
    //         {
    //             i01: '4',
    //             t01: 'Il pane del cammino',
    //             a01: ['Sequeri']
    //         },
    //         {
    //             i01: '5',
    //             t01: 'Madre tu sei',
    //             a01: ['Kenosis']
    //         },
    //         {
    //             i01: '6',
    //             t01: 'Perché la vostra gioia sia piena',
    //             a01: ['Ricci']
    //         },
    //         {
    //             i01: '7',
    //             t01: 'Ti ringrazio o mio Signore'
    //         },
    //         {
    //             i01: '8',
    //             t01: 'Ti saluto o croce santa',
    //             c01: ['Quaresima']
    //         },
    //         {
    //             i01: '9',
    //             t01: 'Ti rendiamo grazie',
    //             a01: ['Baggio']
    //         },
    //         {
    //             i01: '10',
    //             t01: 'Verbum panis',
    //             a01: ['Balduzzi', 'Casucci'],
    //             a02: 'Verbum Panis',
    //             c01: ['Eucaristico']
    //         },
    //         {
    //             i01: '11',
    //             t01: 'Tantum Ergo',
    //             c01: ['Eucaristico']
    //         },
    //         {
    //             i01: '12',
    //             t01: 'Alleluia passeranno i cieli',
    //             c01: ['Alleluia']
    //         }
    //     ];*/
    //     aFileData.forEach(oData => {
    //         let oChant: oSummaryJsonLine;
    //         oChant = {
    //             id: oData.i01,
    //             title: oData.t01,
    //             titleU: oData.t01.toUpperCase(),
    //             authors: oData.a01,
    //             displAuthors: '',
    //             album: oData.a02,
    //             categories: oData.c01
    //         };
    //         /*if (oData.hasOwnProperty(jsonProperty.fileAuthor)) {
    //             oChant.displAuthors = oChant.authors.join(', ');
    //         }*/
    //         if (oChant.authors) {
    //             oChant.displAuthors = oChant.authors.join(', ');
    //         }
    //         aData.push(oChant)
    //     });
    //     return aData;
    // };
    private async _getDataAsync(): Promise<aSummaryJsonData> {
        let aFileData: oSummaryFileJsonData;
        let aData: aSummaryJsonData = [];
        //aFileData = this._oConfig.getJsonData();
        let oConfig: oConfigClass = await oConfigClass.getInstance(oData._fSetBusyFunction);
        aFileData = await oConfig.getJsonData();
        //console.log("aFileData = " + aFileData);
        /*aFileData = [
            {
                i01: '1',
                t01: 'Andemus a sa grutta',
                a01: ['Autore 1', 'Autore 3'],
                c01: ['Natale']
            },
            {
                i01: '2',
                t01: 'Astro del ciel'
            },
            {
                i01: '3',
                t01: 'Come il pellicano',
                a01: ['Gen Verde']
            },
            {
                i01: '4',
                t01: 'Il pane del cammino',
                a01: ['Sequeri']
            },
            {
                i01: '5',
                t01: 'Madre tu sei',
                a01: ['Kenosis']
            },
            {
                i01: '6',
                t01: 'Perché la vostra gioia sia piena',
                a01: ['Ricci']
            },
            {
                i01: '7',
                t01: 'Ti ringrazio o mio Signore'
            },
            {
                i01: '8',
                t01: 'Ti saluto o croce santa',
                c01: ['Quaresima']
            },
            {
                i01: '9',
                t01: 'Ti rendiamo grazie',
                a01: ['Baggio']
            },
            {
                i01: '10',
                t01: 'Verbum panis',
                a01: ['Balduzzi', 'Casucci'],
                a02: 'Verbum Panis',
                c01: ['Eucaristico']
            },
            {
                i01: '11',
                t01: 'Tantum Ergo',
                c01: ['Eucaristico']
            },
            {
                i01: '12',
                t01: 'Alleluia passeranno i cieli',
                c01: ['Alleluia']
            }
        ];*/
        aFileData.forEach((oData) => {
            let oChant: oSummaryJsonLine;
            oData.t01.forEach(
                (title: string) => {
                    oChant = {
                        number: oData.i01,
                        title: title,
                        //titleU: oData.t01.toUpperCase(),
                        titleU: title.toUpperCase(),
                        authors: oData.a01,
                        displAuthors: undefined,
                        album: oData.a02,
                        categories: oData.c01
                    };
                    if (oChant.authors) {
                        oChant.displAuthors = oChant.authors.join(', ');
                    };
                    if (oChant.album) {
                        oChant.displAlbums = oChant.album.join(', ');
                    };
                    aData.push(oChant);
                }
            );
            /*if (oData.hasOwnProperty(jsonProperty.fileAuthor)) {
                oChant.displAuthors = oChant.authors.join(', ');
            }*/
        });
        aData.sort((a: oSummaryJsonLine, b: oSummaryJsonLine) => {
            if (a.titleU > b.titleU || a.titleU === b.titleU && a.number > b.number) {
                return funcSortValues.bigger;
            } else {
                return funcSortValues.smaller;
            }
        })
        return aData;
    };

    private _getAllAuthors(): aFilterModel {
        if (this._aData) {
            let aData = this._aData;
            var aAuthors: aFilterModel = [];
            aData.forEach(oChant => {
                if (oChant.authors) {
                    oChant.authors.forEach(oA01 => {
                        let oAuthor: oFilterModel = {
                            selected: false,
                            value: oA01
                        };
                        let found = aAuthors.find((value) => value.value === oAuthor.value);
                        if (!found) {
                            aAuthors.push(oAuthor);
                        };
                    });
                }
            });
            aAuthors = [...new Set(aAuthors)];
            aAuthors = aAuthors.sort(this._aFilterModelSort);
            return aAuthors;
        } else {
            return [];
        }
    };

    private _getAllAlbums(): aFilterModel {
        if (this._aData) {
            let aData = this._aData;
            var aAlbums: aFilterModel = [];
            aData.forEach(oChant => {
                if (oChant.album) {
                    oChant.album.forEach(oA01 => {
                        let oAlbum: oFilterModel = {
                            selected: false,
                            value: oA01
                        };
                        let found = aAlbums.find((value) => value.value === oAlbum.value);
                        if (!found) {
                            aAlbums.push(oAlbum);
                        };
                    });
                };
            });
            aAlbums = [...new Set(aAlbums)];
            aAlbums = aAlbums.sort(this._aFilterModelSort);
            return aAlbums;

        } else {
            return [];
        }
    };

    private _getAllCategories(): aFilterModel {
        if (this._aData) {
            let aData = this._aData;
            var aCategories: aFilterModel = [];
            aData.forEach(oChant => {
                if (oChant.categories) {
                    oChant.categories.forEach(oC01 => {
                        let oCategory: oFilterModel = {
                            selected: false,
                            value: oC01
                        };
                        let found = aCategories.find((value) => value.value === oC01);
                        if (!found) {
                            aCategories.push(oCategory);
                        }
                    });
                }
            });
            //aCategories = [...new Set(aCategories)];
            aCategories = aCategories.sort(this._aFilterModelSort);
            return aCategories;
        } else {
            return [];
        }
    };

    private _aFilterModelSort(o1: oFilterModel, o2: oFilterModel): funcSortValues {
        if (o1.value < o2.value) {
            return funcSortValues.smaller;
        } else if (o1.value > o2.value) {
            return funcSortValues.bigger;
        } else {
            return funcSortValues.equal;
        }
    };
}