import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';

type userProfileRowViewProps = PropsWithChildren<{
    rightSide?: JSX.Element;
    text: string;
    style?: {
        rowStyle?: {};
        textStyle?: {};
        rightSide?: {};
    }
}>;

const UserProfileRowView: React.FC<userProfileRowViewProps> = ({ children, rightSide, style, text }) => {
  return (
    <View style={[Styles.Layout.flexCol, Styles.Layout.ai_fs, Styles.Layout.w100]}>
      <View style={[Styles.Layout.w100, Styles.Layout.flexRow, Styles.Layout.jc_sb, Styles.Layout.ai_c]}>
        <TextView text={text} numberOfLines={1} styles={style?.textStyle} />
        <View style={style?.rightSide}>
          {rightSide || null}
        </View>
      </View>
      {children || null}
    </View>
  );
};

export { UserProfileRowView };
