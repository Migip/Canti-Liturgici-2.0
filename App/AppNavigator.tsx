import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChantsList from './ChantsList';
import ChantText from './ChantText';
import Filters from './Filters';
import { Routes } from '../globals/routes/routes';
import myReactComponent from '../customComponents/myReactComponent';
import FilterSelection from './FilterSelection';
import { NavigationContainer } from '@react-navigation/native';
import CustomButton from '../customComponents/CustomButton';
import { myIcons } from '../globals/constants/Icons';

declare type NavigatorProps = {
    onOpenMenu: { (): void }
};

export default class Navigator extends myReactComponent<NavigatorProps> {
    private _stack = createNativeStackNavigator();
    protected _bActiveLog: boolean = true;

    public constructor(props: any) {
        super(props);
        this._log(`|------------ INIZIO APP ${Date().toString()} ------------|`);
    };

    public render() {
        return (
            <NavigationContainer>
                <this._stack.Navigator
                    initialRouteName={Routes.Homepage}>
                    <this._stack.Screen
                        name={Routes.Homepage}
                        component={ChantsList}
                        options={{
                            title: this._oI18n.appTitle,
                            headerLeft: () => (
                                <CustomButton
                                    onPress={this.props.onOpenMenu}
                                    icon={myIcons.menu}
                                    title={this._oI18n.list.menuButton}
                                    noBorder />
                            ),
                        }} />
                    <this._stack.Screen
                        name={Routes.Details}
                        component={ChantText}
                        options={{
                            title: this._oI18n.detail.title
                        }} />
                    <this._stack.Screen
                        name={Routes.Filters}
                        component={Filters}
                        options={{
                            title: this._oI18n.filter.title
                        }} />
                    <this._stack.Screen
                        name={Routes.FilterSelection}
                        component={FilterSelection}
                        options={{
                            title: this._oI18n.filter.title
                        }} />
                </this._stack.Navigator>
            </NavigationContainer>
        );
    };
}
