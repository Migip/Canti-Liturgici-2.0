import React from 'react';
import myReactComponent from '../customComponents/myReactComponent';
import { Drawer } from 'react-native-drawer-layout';
import Menu from './Menu';
import Navigator from './AppNavigator';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';
import clTheme from '../globals/classes/colorTheme';
import CustomSafeArea from '../customComponents/mySafeArea';


declare type HomepageProps = {
    // route: any,
    // navigation: any
};

declare type stateType = {
    bDrawerState: boolean
};

export default class Homepage extends myReactComponent<HomepageProps> {
    private _oCurrState: stateType = {
        bDrawerState: false
    };
    public readonly state: stateType = this._oCurrState;

    public constructor(props: any) {
        super(props);
    };

    public render() {
        return (
            <CustomSafeArea
                style={[{ flex: 1 }]}>
                <Drawer
                    open={this.bDrawerState}
                    onOpen={(): void => {
                        //this.bSwipe = true;
                        this.bDrawerState = true;
                    }}
                    onClose={(): void => {
                        this.bDrawerState = false;
                    }}
                    renderDrawerContent={() => {
                        return <Menu
                            onCloseMenu={this.onCloseMenu.bind(this)} />;
                    }}
                    swipeEnabled={this.bDrawerState}>
                    <Navigator
                        onOpenMenu={this.onOpenMenu.bind(this)} />
                    <FlashMessage
                        position={'bottom'} />
                </Drawer>
                <StatusBar style='auto' />
            </CustomSafeArea>
        );
    };

    public onOpenMenu(): void {
        this.bDrawerState = true;
    };

    public onCloseMenu(): void {
        this.bDrawerState = false;
    };

    private set bDrawerState(bNewDrawerState: boolean) {
        if (this._oCurrState.bDrawerState != bNewDrawerState) {
            this._oCurrState.bDrawerState = bNewDrawerState;
            this.setState(this._oCurrState);
        };
    };

    private get bDrawerState(): boolean {
        return this._oCurrState.bDrawerState;
    };

};