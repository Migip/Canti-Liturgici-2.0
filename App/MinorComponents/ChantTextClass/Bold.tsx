import React, { ReactNode } from 'react';
import myReactComponent from '../../../customComponents/myReactComponent';
import CustomText from '../../../customComponents/myText';

export declare type myTextProps = {
    sText: string,
    oSon: ReactNode
};

export default class BoldText extends myReactComponent<myTextProps>  {
    /**
     * render
     */
    public render() {
        return (
            <CustomText style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                {this.props.sText}
                {this.props.oSon}
            </CustomText>
        );
    }
}