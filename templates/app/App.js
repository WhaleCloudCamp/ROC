import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import routes from './routes';

const AppNavigator = createStackNavigator(routes, {
  navigationOptions: ({ navigation }) => {
    return {
      title: navigation.getParam('title') || ''
    }
  },
})

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
