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
            <Text>
                {this.props.sText}
                {this.props.oSon}
            </Text>
        );
    }
}