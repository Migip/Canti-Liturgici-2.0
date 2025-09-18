import React from 'react';
import { Text } from 'react-native-elements';
import { myTextProps } from './Bold';
import myReactComponent from '../../../customComponents/myReactComponent';

export default class ItalicText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <Text style={{ fontStyle: 'italic' }}>
                {this.props.sText}
                {this.props.oSon}
            </Text>
        );
    }
}