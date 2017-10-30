import React from 'react';
import { TabNavigator } from 'react-navigation';

import ListScreen from './ListScreen';
import SearchScreen from './SearchScreen';

const App = TabNavigator({
  ListScreen: { screen: ListScreen },
  SearchScreen: { screen: SearchScreen }
}, {
  tabBarOptions: { 
    activeTintColor: '#7567B1',
    labelStyle: {
      fontSize: 16,
      fontWeight: '600'
    }
  }
});

export default App;