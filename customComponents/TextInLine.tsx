import React from 'react';
import { TextProps } from 'react-native'
import myReactComponent from './myReactComponent';
import CustomText from './myText';


export default class TextInLine extends myReactComponent<TextProps> {
    public render() {

        const { children, ...rest } = this.props
        // const { children, style, ...rest } = this.props
        // const oStyle: StyleProp<TextStyle> | undefined = style;
        // const styles = [style, clTheme.TxtTheme].filter(Boolean);
        return (
            <CustomText numberOfLines={1} {...rest}>
                {children}
            </CustomText>)
    }
}