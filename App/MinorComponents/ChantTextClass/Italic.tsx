import React from 'react';
import { myTextProps } from './Bold';
import myReactComponent from '../../../customComponents/myReactComponent';
import CustomText from '../../../customComponents/myText';

export default class ItalicText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <CustomText style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                {this.props.sText}
                {this.props.oSon}
            </CustomText>
        );
    }
}