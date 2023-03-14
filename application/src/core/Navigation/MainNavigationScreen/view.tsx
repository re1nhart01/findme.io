import React, {PropsWithChildren, useState} from "react";
import {View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export type mainNavigationPresenterProps = PropsWithChildren<{

}>;

const MainNavigationPresenter: React.FC<mainNavigationPresenterProps> = ({}) => {
    const Tab = createBottomTabNavigator();
    return (
        <View>
        </View>
    )
}

export { MainNavigationPresenter }