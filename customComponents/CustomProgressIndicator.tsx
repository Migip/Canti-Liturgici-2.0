import React from 'react';
import myReactComponent from './myReactComponent';
import * as Progress from 'react-native-progress';
//import { View } from 'react-native-reanimated/lib/typescript/Animated';
// import TextInLine from './TextInLine';
import { View } from 'react-native';
import { GeneralStyles } from '../Styles/GeneralStyles';
import CustomText from './myText';

export declare type CustomProgressIndicatorProps = {
    show: boolean,
    indeterminate?: boolean,
    progress?: number,
    description?: string
};

export default class CustomProgressIndicator extends myReactComponent<CustomProgressIndicatorProps> {
    private sDescription: string;

    constructor(props: any){
        super(props);
        this.sDescription = this.props.description || '';
    };
    public render() {
        if (this.props.show) {
            return (
                <View
                    style={[
                        GeneralStyles.progressIndicatorView
                    ]}>
                    <Progress.Circle
                        indeterminate={this.props.indeterminate}
                        progress={this.props.progress}
                    />
                    <View style={[{
                        display: ( this.props.description === undefined ) ? 'none' : 'flex'
                    }]}>
                        <CustomText>
                            {this.sDescription}
                        </CustomText>
                    </View>
                </View>
            );
        } else {
            return (
                <View />
            );
        };
    };
}