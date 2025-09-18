//import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import myReactComponent from '../../customComponents/myReactComponent';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import CustomPopup from '../../customComponents/CustomPopup';
import { MenuStyles } from '../../Styles/MenuStyle';
import { oConfigClass } from '../../globals/classes/config';
import { myIcons } from '../../globals/constants/Icons';


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
                popupContent={
                    <View
                        style={[
                            MenuStyles.InfoView
                        ]}>
                        <View
                            style={[
                                MenuStyles.InfoVersionView
                            ]}>
                            <Text
                                style={[
                                    MenuStyles.InfoHead
                                ]}>
                                {this._oI18n.menu.AppInfoVerNr}
                                <Text
                                    style={[
                                        MenuStyles.InfoValue
                                    ]}>
                                    {this._oCurrState.sAppVersion}
                                </Text>
                            </Text>
                            <Text
                                style={[
                                    MenuStyles.InfoHead
                                ]}>
                                {this._oI18n.menu.AppInfoChantsNr}
                                <Text
                                    style={[
                                        MenuStyles.InfoValue
                                    ]}>
                                    {this._oCurrState.sChantVersion}
                                </Text>
                            </Text>
                        </View>
                        <Text
                            style={[
                                MenuStyles.InfoDescription
                            ]}>
                            {this._oI18n.menu.AppInfoDescr}
                        </Text>
                    </View>} />
        );
    };
}