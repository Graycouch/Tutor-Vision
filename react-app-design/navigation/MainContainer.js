import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import MessageScreen from './screens/MessageScreen/MessageScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const homeName = "Home";
const searchName = "Search";
const messageName = "Message";
const profileName = "Profile";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === searchName) {
                            iconName = focused ? 'search' : 'search-outline';

                        } else if (rn === messageName) {
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';

                        } else if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline';

                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },

                    tabBarActiveTintColor: '#5F59F7',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                    tabBarStyle: { padding: 10, height: windowHeight * 0.0896, backgroundColor: '#F1F1F1' }
                })}>

                <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
                <Tab.Screen name={searchName} component={SearchScreen} options={{ headerShown: false }} />
                <Tab.Screen name={messageName} component={MessageScreen} options={{ headerShown: false }} />
                <Tab.Screen name={profileName} component={ProfileScreen} options={{ headerShown: false }} />

            </Tab.Navigator>

        </NavigationContainer>
    )
}