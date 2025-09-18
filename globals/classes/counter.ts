
export class CounterClass {
    //private static _oInstance: CounterClass;
    private static _aInstance: [CounterClass];

    private readonly _sName: string;
    private _iMax: number;
    private _iCounter: number;
    private _bError: boolean;
    public static getInstance(sName: string, iMax: number = 0): CounterClass {
        let _oInstance: CounterClass;
        let oInstanceTmp = this._aInstance.find((oCurrInstance: CounterClass) => oCurrInstance.getName() === sName);
        if (oInstanceTmp == undefined || iMax) {
            _oInstance = new CounterClass(sName, iMax);
            if (oInstanceTmp) {
                this._aInstance.splice(this._aInstance.indexOf(oInstanceTmp));
            }
            this._aInstance.push(_oInstance);
        } else {
            _oInstance = oInstanceTmp;
        };
        //if (iMax || !this._oInstance) {
        //this._oInstance = new CounterClass(iName,iMax);
        //};
        //return this._oInstance;
        /*if (iMax || oInstanceTmp == undefined) {
            _oInstance = new CounterClass(sName,iMax);
        };*/
        return _oInstance;
    };
    private constructor(sName: string, iMax: number) {
        this._sName = sName;
        this._iMax = iMax;
        this._iCounter = 0;
        this._bError = false;
    };
    public addCounter() {
        this._iCounter += 1;
    };
    public setError() {
        this._bError = true;
    };
    public hasError(): boolean {
        return this._bError;
    };
    public counterIsMax(): boolean {
        return this._iCounter === this._iMax;
    };
    public getName(): string {
        return this._sName;
    }
};