import React from 'react';
import { Text, TextProps } from 'react-native'
import myReactComponent from './myReactComponent';


export default class TextInLine extends myReactComponent<TextProps> {
    public render() {

        const { children, ...rest } = this.props
        return (
            <Text numberOfLines={1} {...rest}>
                {children}
            </Text>)
    }
}