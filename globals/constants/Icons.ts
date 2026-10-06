enum myIconEnum {
    share = 'share-nodes',
    menu = 'bars',
    filter = 'filter',
    info = 'circle-info',
    removeFilt = 'trash-can',
    clearFilters = 'filter-circle-xmark',
    close = 'xmark',
    settings = 'gear',
    navigation = 'arrow-right',
    back = 'arrow-up-right-from-square'
};

export type iconType = myIconEnum;

export const myIcons: Record<string, iconType> = {
    share: myIconEnum.share,
    menu: myIconEnum.menu,
    filter: myIconEnum.filter,
    singleFilterInfo: myIconEnum.info,
    singleFilterRemoveSelection: myIconEnum.removeFilt,
    clearFilters: myIconEnum.clearFilters,
    applyFilters: myIconEnum.filter,
    closePopup: myIconEnum.close,
    appInfo: myIconEnum.info,
    settings: myIconEnum.settings,
    navigation: myIconEnum.navigation,
    menuBack: myIconEnum.back
} as const;