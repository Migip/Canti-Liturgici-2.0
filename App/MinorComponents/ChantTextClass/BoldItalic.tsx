import React from 'react';
import { Text } from 'react-native-elements';
import myReactComponent from '../../../customComponents/myReactComponent';
import { myTextProps } from './Bold';

export default class BoldItalicText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {this.props.sText}
                {this.props.oSon}
            </Text>
        );
    }
}