import { i18n } from "./i18n.general";

export default class i18n_it implements i18n {
    appTitle = 'Elenco dei canti';
    //Homepage - Chant list
    list = {
        filtersButton: 'Filtri',
        menuButton: '',
        searchBarPlaceholder: 'Numero/Titolo',
        numberHeader: 'N°',
        titleHeader: 'Canto',
        albumHeader: 'Album: ',
        authorHeader: 'Autore: ',
        emptyList: 'Nessun canto trovato',
        progressDescription: "Stiamo scaricando l'ultima versione dei canti. Attendere senza chiudere l'app.",
        chargeDescription: 'Caricamento in corso. Attendere.',
        noInitDescription: 'Connettere alla rete per caricare i canti.'
    };
    
    //Filters
    filter = {
        title: 'Filtri',
        remember_apply: 'Ricorda di premere su "Applica" se vuoi confermare i filtri.',
        searchPlaceholder: 'Cerca...',
        album: 'Filtra per album',
        author: 'Filtra per autore',
        category: 'Filtra per categoria',
        noSelection: 'Seleziona',
        someSelection: ' selezionati',
        clearSelection: 'Rimuovi selezione',
        apply: 'Applica',
        info: 'Info',
        infoExt: 'In questa pagina puoi selezionare quali & vuoi vedere nella pagina principale',
        infoExt_aut: 'autori',
        infoExt_alb: 'album',
        infoExt_cat: 'categorie',
        msgApply: 'Filtri applicati',
        msgClear: 'Filtri rimossi',
    };

    //Chant Details
    detail = {
        title: 'Dettaglio canto',
        loading: 'Caricamento in corso, attendere',
        share: 'Condividi in PDF',
        error: 'Errore nel caricamento, riprovare'
    };

    //Homepage - Menù
    menu = {
        PopupClose: 'Chiudimi',
        AppInfoButton: 'Info',
        AppInfoVerNr: 'Versione App: ',
        AppInfoChantsNr: 'Versione Canti: ',
        AppInfoDescr: 'Questa app è un vasto libro di canti, con lo scopo di tenerli sempre a portata di mano. Tutti i testi sono di proprietà del loro autore.',
        SettingsButton: 'Impostazioni',
        SettingsHideMinorVoices: 'Nascondi seconde voci',
        SettingsTextSize: 'Dimensioni testo dei canti: ',
        SettingsTextExample: 'Testo esemplificativo',
        SettingsMessage: 'Impostazioni modificate',
        BackButton: 'Torna a Lista canti',
        OkButton: 'OK',
    };


    text = {
        rit: ' Rit.',
        cel: 'Celebrante: ',
        ass: 'Tutti: '
    };
}