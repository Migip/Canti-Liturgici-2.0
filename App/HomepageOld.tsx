import { View } from 'react-native';
import React from 'react';
import myReactComponent from '../customComponents/myReactComponent';
import { GeneralStyles } from '../Styles/GeneralStyles';
import { Drawer } from 'react-native-drawer-layout';
import ChantsList from './ChantsList';
import { Text } from 'react-native-elements';
import Menu from './Menu';


declare type HomepageProps = {
    route: any,
    navigation: any
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
            <View
                style={[
                    GeneralStyles.pageContainer
                ]}>
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
                            navigation={this.props.navigation}
                            route={this.props.route}
                            onCloseMenu={this.onCloseMenu.bind(this)} />;
                    }}
                    swipeEnabled={this.bDrawerState}>
                    <ChantsList
                        navigation={this.props.navigation}
                        route={this.props.route}
                        onOpenMenu={this.onOpenMenu.bind(this)} />
                </Drawer>
            </View>
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