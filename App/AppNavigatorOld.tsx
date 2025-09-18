//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, FlatList, GestureResponderEvent, Pressable, Text, View, Button, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ChantsList from './ChantsList';
import ChantText from './ChantText';
import Filters from './Filters';
import { Routes } from '../globals/routes/routes';
import myReactComponent from '../customComponents/myReactComponent';
import FilterSelection from './FilterSelection';
import { NavigationContainer } from '@react-navigation/native';
import Homepage from './Homepage';
import FlashMessage from 'react-native-flash-message';
import { PopupStyles } from '../Styles/PopupStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Navigator extends myReactComponent {
    private _stack = createNativeStackNavigator();

    public constructor(props: any) {
        super(props);
        console.log(`|------------ INIZIO APP ${Date().toString()} ------------|`);
    };

    public render() {
        return (
            <NavigationContainer>
                <this._stack.Navigator
                    initialRouteName={Routes.Homepage}>
                    <this._stack.Screen
                        name={Routes.Homepage}
                        component={Homepage}
                        options={{
                            title: this._oI18n.appTitle
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
                <StatusBar style='auto' />
                {/*<FlashMessage
                    position={'bottom'}
                    duration={3000}
                    style={PopupStyles.FlashMessages}
                />*/}
                <FlashMessage
                    position={'bottom'} />
            </NavigationContainer>
        );
    };
}
