import React from 'react';
import { Text } from 'react-native-elements';
import myReactComponent from '../../../customComponents/myReactComponent';
import { myTextProps } from './Bold';

export default class NoneText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <Text style={{ fontWeight: 'normal', fontStyle: 'normal' }}>
                {this.props.sText}
                {this.props.oSon}
            </Text>
        );
    }
}