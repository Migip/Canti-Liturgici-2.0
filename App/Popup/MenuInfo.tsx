//import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { View } from 'react-native';
import CustomPopup from '../../customComponents/CustomPopup';
import { MenuStyles } from '../../Styles/MenuStyle';
import { oConfigClass } from '../../globals/classes/config';
import { myIcons } from '../../globals/constants/Icons';
import CustomText from '../../customComponents/myText';


declare type InfoProps = {
};

declare type stateType = {
    sAppVersion: string,
    sChantVersion: string
};


export default class Info extends myReactComponent<InfoProps> {
    private _oCurrState: stateType;
    public readonly state: stateType;

    public constructor(props: any) {
        super(props);
        let oApp = require('../../app.json');
        this._oCurrState = {
            sAppVersion: oApp.expo.version,
            sChantVersion: ''
        };
        this.state = this._oCurrState;
        oConfigClass.getInstance()
            .then((oConfig: oConfigClass) => {
                this._oCurrState.sChantVersion = oConfig.getAppVersion();
                this.setState(this._oCurrState);
            })
            .catch((oError) => {
                console.error(oError);
            });
    };

    public render() {
        return (
            <CustomPopup
                buttonTitle={this._oI18n.menu.AppInfoButton}
                icon={myIcons.appInfo}
                noBorder={true}
                popupContent={
                    <View
                        style={[
                            MenuStyles.InfoView
                        ]}>
                        <View
                            style={[
                                MenuStyles.InfoVersionView
                            ]}>
                            <CustomText
                                style={[
                                    MenuStyles.InfoHead
                                ]}>
                                {this._oI18n.menu.AppInfoVerNr}
                                <CustomText
                                    style={[
                                        MenuStyles.InfoValue
                                    ]}>
                                    {this._oCurrState.sAppVersion}
                                </CustomText>
                            </CustomText>
                            <CustomText
                                style={[
                                    MenuStyles.InfoHead
                                ]}>
                                {this._oI18n.menu.AppInfoChantsNr}
                                <CustomText
                                    style={[
                                        MenuStyles.InfoValue
                                    ]}>
                                    {this._oCurrState.sChantVersion}
                                </CustomText>
                            </CustomText>
                        </View>
                        <CustomText
                            style={[
                                MenuStyles.InfoDescription
                            ]}>
                            {this._oI18n.menu.AppInfoDescr}
                        </CustomText>
                    </View>} />
        );
    };
}