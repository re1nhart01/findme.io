import React, {PropsWithChildren} from 'react';
import {Text} from 'react-native';
import i18next from "@src/locale/i18next";

type textViewProps = PropsWithChildren<{
  text: string;
  styles?: {};
  numberOfLines: number;
}>;
const TextView: React.FC<textViewProps> = ({
  text,
  numberOfLines,
  styles,
  children,
}) => {
  return (
    <Text numberOfLines={numberOfLines} style={styles}>
      {i18next.t(text)}
    </Text>
  );
};

export {TextView};
