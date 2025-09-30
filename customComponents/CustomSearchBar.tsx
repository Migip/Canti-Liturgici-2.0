import React from 'react';
import myReactComponent from './myReactComponent';
import { Searchbar } from 'react-native-paper';

export declare type CustomSearchBarProps = {
    placeholder: string,
    value: string,
    onChangeText(s: string): void
};

export default class CustomSearchBar extends myReactComponent<CustomSearchBarProps> {

    public render() {
        return (
            <Searchbar
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
            />
        )
    };
}