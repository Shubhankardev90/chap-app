import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home'
import About from './src/screens/About'
import CompanySelect from './src/screens/CompanySelect'
import Login from './src/screens/Login'

const Stack = createNativeStackNavigator();

function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} 
          options={({ navigation }) => ({
            title: 'Home',
            headerTitleStyle: styles.headerTitle
          })}/>
          <Stack.Screen name='About' component={About} 
          options={({ navigation }) => ({
            title: 'About',
            headerTitleStyle: styles.headerTitle,
           
          })} />
          <Stack.Screen name='company-select' component={CompanySelect} 
          options={({ navigation }) => ({
            title: 'Select Company',
            headerTitleStyle: styles.headerTitle,
           
          })} />
          <Stack.Screen name='login' component={Login} 
          options={({ navigation }) => ({
            title: 'Login',
            headerTitleStyle: styles.headerTitle,
          })} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
  }
});

export default App;