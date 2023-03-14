import React, {PropsWithChildren} from 'react';
import {Text} from "react-native";

type textViewProps = PropsWithChildren<{
    text: string;
    styles?: {};
    numberOfLines: number;
}>
const TextView: React.FC<textViewProps> = ({text, numberOfLines, styles, children}) => {
    return (
        <Text
            numberOfLines={numberOfLines}
            style={styles}
        >
            {text}
        </Text>
    )
}

export { TextView }