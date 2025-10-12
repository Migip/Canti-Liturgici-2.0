import React from 'react';
import myReactComponent from '../../../customComponents/myReactComponent';
import { myTextProps } from './Bold';
import CustomText from '../../../customComponents/myText';

export default class BoldItalicText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <CustomText style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                {this.props.sText}
                {this.props.oSon}
            </CustomText>
        );
    }
}