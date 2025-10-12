import React from 'react';
import myReactComponent from '../../../customComponents/myReactComponent';
import { myTextProps } from './Bold';
import CustomText from '../../../customComponents/myText';

export default class NoneText extends myReactComponent<myTextProps> {
    /**
     * render
     */
    public render() {
        return (
            <CustomText style={{ fontWeight: 'normal', fontStyle: 'normal' }}>
                {this.props.sText}
                {this.props.oSon}
            </CustomText>
        );
    }
}