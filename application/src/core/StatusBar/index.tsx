import React from 'react';
import {StatusBar, View} from "react-native";

type findStatusBarProps = {};
const FindStatusBar: React.FC<findStatusBarProps> = ({}) => {
    return (
        <View>
            <StatusBar
                backgroundColor={'red'}
                animated
                translucent
                networkActivityIndicatorVisible
            />
        </View>
    )
}

export { FindStatusBar };