import React, { ReactNode } from 'react';
import { Text } from 'react-native-elements';
import myReactComponent from '../../../customComponents/myReactComponent';

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
            <Text style={{ fontWeight: 'bold' }}>
                {this.props.sText}
                {this.props.oSon}
            </Text>
        );
    }
}