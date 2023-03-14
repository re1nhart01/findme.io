import React, {PropsWithChildren, useEffect, useState} from 'react';
import {View, Text, AppState} from 'react-native';
import {mainNavigationPresenterProps, MainNavigationPresenter } from "./view";

type mainNavigationContainerProps = PropsWithChildren<{

}>;

type mainNavigationContainerState = {

};
const MainNavigationContainer: React.FC<mainNavigationContainerProps> = ({}) => {
    const [getState, setState] = useState<mainNavigationContainerState>({});

    const ApplicationState = () => {
        const subscription = AppState.addEventListener('change', (state) => {
            switch (state) {
                case 'active':
                    console.log('app active');
                    break;
                case 'background':
                    console.log('app background');
                    break;
                case 'inactive':
                    console.log('app inactive');
                    break;
                case 'unknown':
                    console.log('app unknown');
                    break;
                case 'extension':
                    console.log('app extension');
                    break;
            }
        });
        return () => {
            subscription.remove();
        };
    };

    useEffect(ApplicationState, [AppState]);

    const ViewProps: mainNavigationPresenterProps = {};

    return <MainNavigationPresenter {...ViewProps} />
}

export { MainNavigationContainer }