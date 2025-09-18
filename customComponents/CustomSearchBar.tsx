import React from 'react';
//import { SearchBar } from 'react-native-elements';
import { SearchBar } from '@rneui/themed';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import myReactComponent from './myReactComponent';

export declare type CustomSearchBarProps = {
    placeholder: string,
    value: string,
    onChangeText(s: string): void
    //onChange(e: NativeSyntheticEvent<TextInputChangeEventData>): void,
    //onCancel():void
};

export default class CustomSearchBar extends myReactComponent<CustomSearchBarProps> {
    private _bLightTheme: boolean = true;
    private _sPlatform: "ios" | "android" | "default" = "default";
    private _oIcon: IconNode = true;

    public render() {
        return (
            <SearchBar
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                lightTheme={this._bLightTheme}
            />
            /*<SearchBar
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                value={this.props.value}
                loadingProps={{}}
                showLoading={true}
                lightTheme={this._bLightTheme}
                round={true}
                onClear={this.onClear}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChangeText={this.onChangeText}
                onCancel={this.props.onCancel}
                platform={this._sPlatform}
                clearIcon={ this._oIcon }
                searchIcon={ this._oIcon }
                cancelButtonTitle={''}
                cancelButtonProps={{}}
                showCancel={false}/>*/
        )
    };
    /*private onClear():any {

    };
    private onBlur():any {

    }
    private onFocus():any {

    };
    private onChangeText():any {

    };*/
}