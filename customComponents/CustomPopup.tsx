//import { NavigationContainer } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import myReactComponent from './myReactComponent';
import { Alert, Modal, View } from 'react-native';
import { PopupStyles } from '../Styles/PopupStyle';
import CustomButton from './CustomButton';
//import { IconNode } from '@rneui/base';
//import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { iconType, myIcons } from '../globals/constants/Icons';
import clTheme from '../globals/classes/colorTheme';


declare type CustomPopupProps = {
    buttonTitle: string,
    icon: iconType
    popupContent: ReactNode,
    onOpenModal?: { (): void },
    onCloseModal?: { (): void },
    noBorder?: boolean
};

declare type stateType = {
    bInfoVisible: boolean
};

export default class CustomPopup extends myReactComponent<CustomPopupProps> {
    private _oCurrState: stateType = {
        bInfoVisible: false
    };
    public readonly state: stateType = this._oCurrState;

    public constructor(props: any) {
        super(props);
    };

    public render() {
        return (
            <View
                style={[
                    PopupStyles.PopupView
                ]}>
                <CustomButton
                    title={this.props.buttonTitle}
                    onPress={this._onOpenModal.bind(this)}
                    icon={this.props.icon}
                    noBorder={this.props.noBorder} />
                <Modal
                    animationType="fade"
                    presentationStyle='fullScreen'
                    backdropColor={'#6e6d6d83'}
                    visible={this.bInfoVisible}>
                    <View
                        style={[
                            PopupStyles.PopupModal,
                            clTheme.BgTheme
                        ]}>
                        <View
                            style={{
                                alignSelf: 'flex-end'
                            }}>
                            <CustomButton
                                title=''
                                onPress={this._onCloseModal.bind(this)}
                                icon={myIcons.closePopup}
                                noBorder />
                        </View>
                        {this.props.popupContent}
                        <CustomButton
                            title='OK'
                            onPress={this._onCloseModal.bind(this)}
                        />
                        {/*<CustomButton
                            title={this._oI18n.menu.PopupClose}
                            onPress={this._onCloseModal.bind(this)} />*/}
                    </View>
                </Modal>
            </View>
        );
    };

    private _onOpenModal() {
        this.bInfoVisible = true;
        if (this.props.onOpenModal) {
            this.props.onOpenModal();
        }
    };

    private _onCloseModal() {
        this.bInfoVisible = false;
        if (this.props.onCloseModal) {
            this.props.onCloseModal();
        };
    };

    private get bInfoVisible(): boolean {
        return this._oCurrState.bInfoVisible;
    };

    private set bInfoVisible(bNewValue: boolean) {
        this._oCurrState.bInfoVisible = bNewValue;
        this.setState(this._oCurrState);
    };
}
