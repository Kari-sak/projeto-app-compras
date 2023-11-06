import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './screens/MainNavigator';

const App = () => {
    const initializeAuthState = userStateStore((state) => state.initializeAuthState);

    useEffect(() => {
        initializeAuthState();
    }, []);
    
  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
};

export default App;
