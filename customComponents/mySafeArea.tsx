import React from 'react';
import myReactComponent from './myReactComponent';
import clTheme from '../globals/classes/colorTheme';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';


export default class CustomSafeArea extends myReactComponent<SafeAreaViewProps> {
    public render() {

        const { children, style, ...rest } = this.props;
        const styles = [style, clTheme.TxtTheme, clTheme.BgTheme].filter(Boolean);
        return (
            <SafeAreaView style={styles as any} {...rest}>
                {children}
            </SafeAreaView>)
    }
}