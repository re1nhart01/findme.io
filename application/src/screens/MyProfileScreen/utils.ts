import { forceNavigator } from '@core/Navigator';

export const handleSettingsPress = () => {
  forceNavigator.navigate('SettingsScreen', {});
};

export const handleEditBasicInformation = () => {
  forceNavigator.navigate('EditProfileScreen', {});
};

export const handleSelectGendersPress = () => {
  forceNavigator.navigate('SelectGenderScreen', {});
};

export const handleSelectInterestsPress = () => {
  forceNavigator.navigate('SelectInterestsScreen', {});
};

export const handleSelectTagsPress = () => {
  forceNavigator.navigate('SelectTagsScreen', {});
};

export const handleEditMood = () => {
  forceNavigator.navigate('EditMoodRelationsScreen', {});
};

export const handleEditImages = () => {
  forceNavigator.navigate('EditImagesScreen', {});
};
