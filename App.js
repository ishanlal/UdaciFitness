import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Title from './components/Title';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}){
    return (
      <View style={{backgroundColor, height: Constants.statusBarHeight}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === 'History') {
              return <Ionicons name='ios-bookmarks' size={30} color={color} />
            } else if (route.name === 'AddEntry') {
              return <FontAwesome name='plus-square' size={30} color={color} />
            } else if (route.name === 'Live') {
            return <Ionicons name='ios-speedometer' size={30} color={color} />
          }
          },
        })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}>
      <Tab.Screen
        name="History"
        component={History}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="AddEntry"
        component={AddEntry}
        options={{ headerShown: false }} />
      <Tab.Screen
          name="Live"
          component={Live}
          options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} style='light' />
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Tabs} />
              <Stack.Screen
                  name="EntryDetail"
                  component={EntryDetail}
                  options={({ route }) => ({
                    headerTintColor: white,
                    headerStyle: {
                      backgroundColor: purple
                    },
                    title: route.params.entryId,
                    headerTitle: props => <Title {...props} />
                  })} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </Provider>
    )
  }
}
