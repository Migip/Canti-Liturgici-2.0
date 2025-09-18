const ConstFolder = {
    //"main": './Config/',
    //"tmp": './Temp/'
    "main": '',
    "tmp": '',
    "data": 'Data/',
    "canti": "Canti/"
};
const ConstFile = {
    "zip": "Zip.zip",
    "config": "Config.json",
    "sommario": "Sommario.json",
    "settings": "Settings.json",
};

export const ConstFilePath = {
    //"tmpZip": ConstFolder.tmp + ConstFile.zip,
    "tmpConfig": ConstFolder.tmp + ConstFile.config,
    "tmpZipCanti": ConstFolder.tmp + ConstFile.zip,
    "mainData": ConstFolder.main + ConstFolder.data,
    "mainSettings": ConstFolder.main + ConstFile.settings,
    "mainConfig": ConstFolder.main + ConstFile.config,
    "mainSommario": ConstFolder.main +
        ConstFolder.data + ConstFile.sommario,
    "mainCanti": ConstFolder.main +
        ConstFolder.data + ConstFolder.canti
};