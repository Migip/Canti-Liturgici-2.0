import { aFilterModel, aSummaryJsonData, oFilterModel, oSummaryJsonLine } from "./data";

export class cFilter {
    private static _oInstance: cFilter;
    private static readonly _oOnlyNumbersRegexp: RegExp = new RegExp('^[0-9]+$');

    private _aAuthorsFilter: aFilterModel = [];
    private _aAlbumsFilter: aFilterModel = [];
    private _aCategoriesFilter: aFilterModel = [];
    private _aSelectedAuthors: aFilterModel = [];
    private _aSelectedAlbums: aFilterModel = [];
    private _aSelectedCategories: aFilterModel = [];
    /*private _aSelectedAuthors: Array<string> = [];
    private _aSelectedAlbums: Array<string> = [];
    private _aSelectedCategories: Array<string> = [];*/
    private _sQuery: string = '';
    private _aDisplayedData: aSummaryJsonData;
    private _aAllData: aSummaryJsonData;

    private constructor(
        aAllData: aSummaryJsonData,
        aNewAuthorsFilter: aFilterModel,
        aNewAlbumsFilter: aFilterModel,
        aNewCategoriesFilter: aFilterModel,
        sNewQuery: string
    ) {
        this._aAllData = aAllData;
        this._aAuthorsFilter = [];
        aNewAuthorsFilter.forEach(
            (oAuthor: oFilterModel) => {
                let oAuthorCopy = { ...oAuthor };
                this._aAuthorsFilter.push(oAuthorCopy);
            }
        );
        this._aAlbumsFilter = [];
        aNewAlbumsFilter.forEach(
            (oAlbum: oFilterModel) => {
                let oAlbumCopy = { ...oAlbum };
                this._aAlbumsFilter.push(oAlbumCopy);
            }
        );
        this._aCategoriesFilter = [];
        aNewCategoriesFilter.forEach(
            (oCategory: oFilterModel) => {
                let oCategoryCopy = { ...oCategory };
                this._aCategoriesFilter.push(oCategoryCopy);
            }
        );
        this._sQuery = sNewQuery;
        this._aDisplayedData = this.calculateDisplayedData();
    };

    /*public static setNewState(
        aNewAuthorsFilter: aFilterModel,
        aNewAlbumsFilter: aFilterModel,
        aNewCategoriesFilter: aFilterModel,
        sNewQuery: string
    ) {
    };*/
    public static filter(
        aAllData: aSummaryJsonData,
        aNewAuthorsFilter: aFilterModel,
        aNewAlbumsFilter: aFilterModel,
        aNewCategoriesFilter: aFilterModel,
        sNewQuery: string
    ): aSummaryJsonData {
        if (this.stateIsChanged(
            aNewAuthorsFilter,
            aNewAlbumsFilter,
            aNewCategoriesFilter,
            sNewQuery
        )) {
            this._oInstance = new cFilter(
                aAllData,
                aNewAuthorsFilter,
                aNewAlbumsFilter,
                aNewCategoriesFilter,
                sNewQuery);
        }
        return this._oInstance.getDisplayedData();
    };
    private _filterDataByFilters(item: oSummaryJsonLine): boolean {
        if (this._aSelectedAlbums.length > 0 &&
            //!this._aSelectedAlbums.find((oAlbum:oFilterModel)=>oAlbum.value === item.album)
            !this._aSelectedAlbums.find((oAlbum: oFilterModel) => item.album && item.album.includes(oAlbum.value))
        ) {
            return false;
        };
        if (this._aSelectedAuthors.length > 0 &&
            (!item.authors ||
                !this._aSelectedAuthors.find((oAuthor: oFilterModel) => item.authors && item.authors.includes(oAuthor.value)))
        ) {
            return false;
        };
        if (this._aSelectedCategories.length > 0 &&
            !this._aSelectedCategories.find((oCategory: oFilterModel) => item.categories && item.categories.includes(oCategory.value))
        ) {
            return false;
        };
        return true;
    };

    private calculateDisplayedData(): aSummaryJsonData {
        let oSearchRegexp: RegExp;
        this._aSelectedAuthors = this._aAuthorsFilter.filter((item) => item.selected);
        this._aSelectedAlbums = this._aAlbumsFilter.filter((item) => item.selected);
        this._aSelectedCategories = this._aCategoriesFilter.filter((item) => item.selected);

        if (this._sQuery != '' && cFilter._oOnlyNumbersRegexp.test(this._sQuery)) {
            //Chant number search
            oSearchRegexp = new RegExp(
                '.*'
                +
                this._sQuery
                +
                '.*'
            );
            return this._aAllData.filter((item: oSummaryJsonLine) => {
                return oSearchRegexp.test(item.number) && this._filterDataByFilters(item);
            });
        } else if (this._sQuery != '') {
            //Chant title search
            oSearchRegexp = new RegExp(
                '.*'
                +
                this._sQuery.toUpperCase().split(" ").join(".*")
                +
                '.*'
            );
            return this._aAllData.filter((item: oSummaryJsonLine) => {
                return oSearchRegexp.test(item.titleU) && this._filterDataByFilters(item);
            });
        } else {
            //No search
            //this._aDisplayedData = this._aAllData;
            return this._aAllData.filter((item: oSummaryJsonLine) => {
                return this._filterDataByFilters(item);
            });
        };
    };

    private getDisplayedData(): aSummaryJsonData {
        return this._aDisplayedData;
    };

    private static stateIsChanged(
        aNewAuthorsFilter: aFilterModel,
        aNewAlbumsFilter: aFilterModel,
        aNewCategoriesFilter: aFilterModel,
        sNewQuery: string): boolean {
        if (!this._oInstance) {
            return true;
        } else if (JSON.stringify(this._oInstance._aAuthorsFilter) != JSON.stringify(aNewAuthorsFilter) ||
            JSON.stringify(this._oInstance._aAlbumsFilter) != JSON.stringify(aNewAlbumsFilter) ||
            JSON.stringify(this._oInstance._aCategoriesFilter) != JSON.stringify(aNewCategoriesFilter) ||
            JSON.stringify(this._oInstance._sQuery) != JSON.stringify(sNewQuery)) {
            return true;
        } else {
            return false;
        }
    }
}