import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { ChantsListStyles } from '../../Styles/ChantsListStyles';
import { oData, oSummaryJsonLine } from '../../globals/classes/data';
import TextInLine from '../../customComponents/TextInLine';
import { Routes } from '../../globals/routes/routes';
import { GeneralStyles } from '../../Styles/GeneralStyles';
import myReactComponent from '../../customComponents/myReactComponent';
import { ChantTextRouteParams } from '../ChantText';

export declare type ChantListItemProps = {
    oItem: oSummaryJsonLine,
    //    oData: oData | undefined,
    oNavigation: any;
};

export default class ChantListItem extends myReactComponent<ChantListItemProps> {
    public render() {

        //const { } = this.props
        return (
            <View>
                <Pressable
                    onPress={this.onItemPress.bind(this)}>
                    {/* View senza autore/album */}
                    <View
                        style={[
                            ChantsListStyles.lineContainer,
                            GeneralStyles.flexHoriz,
                            {
                                display: this.props.oItem.displAuthors === undefined ? 'flex' : 'none'
                            }
                        ]}>
                        <Text
                            style={[
                                ChantsListStyles.itemNumber,
                                ChantsListStyles.itemNumberF
                            ]}>
                            {this.props.oItem.number}
                        </Text>
                        <View
                            style={[
                                ChantsListStyles.itemNotNumber
                            ]}>
                            <TextInLine
                                style={[
                                    ChantsListStyles.itemTitleF
                                ]}>
                                {this.props.oItem.title}
                            </TextInLine></View>
                    </View>

                    {/* View con autore/album */}
                    <View
                        style={[
                            ChantsListStyles.lineContainer,
                            GeneralStyles.flexHoriz,
                            {
                                display: this.props.oItem.displAuthors === undefined ? 'none' : 'flex'
                            }
                        ]}>
                        <Text
                            style={[
                                ChantsListStyles.itemNumber,
                                ChantsListStyles.itemNumberF
                            ]}>
                            {this.props.oItem.number}
                        </Text>
                        <View
                            style={[
                                ChantsListStyles.itemNotNumber,
                                GeneralStyles.flexVert
                            ]}>
                            <TextInLine
                                style={ChantsListStyles.itemTitleF}>
                                {this.props.oItem.title}
                            </TextInLine>
                            <TextInLine
                                style={ChantsListStyles.itemAuthor}>
                                {this._oI18n.list.authorHeader}
                                <TextInLine
                                    style={ChantsListStyles.itemAuthorF}>
                                    {this.props.oItem.displAuthors}
                                </TextInLine>
                            </TextInLine>
                            <View
                                style={[
                                    {
                                        display: this.props.oItem.album === undefined ? 'none' : 'flex'
                                    }
                                ]}>
                                <TextInLine
                                    style={ChantsListStyles.itemAlbum}>
                                    {this._oI18n.list.albumHeader}
                                    <TextInLine
                                        style={ChantsListStyles.itemAlbumF}>
                                        {this.props.oItem.album}
                                    </TextInLine>
                                </TextInLine>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>)
    };
    public onItemPress(oEvent: GestureResponderEvent) {
        let oParam: ChantTextRouteParams = {
            oJsonLine: this.props.oItem
        };
        this.props.oNavigation.navigate(Routes.Details, oParam);
    };
}