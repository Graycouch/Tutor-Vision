import * as React from 'react';
import { View, Text, Button, Image, TextInput, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useGlobalState, setGlobalState } from '../../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Header({ navigation }) {
    const [searchValue] = useGlobalState("searchValue");

    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';

    //TODO
    //const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const styles = StyleSheet.create({

        // Overall Header Container
        Container: {
            // flexGrow: 1,
            display: 'flex',
            // flexDirection: 'column',
            flex: 1,
            height: 80,
            backgroundColor: '#ffffff',
            // // border for debugging flex
            // border: "solid",
            // borderColor: "blue",
            // borderWidth: 1
        },

        // 
        logoProfileContainer: {
            // // border for debugging flex
            // border: "solid",
            // borderColor: "blue",
            // borderWidth: 1,
            // backgroundColor: "#FFFFFF",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            marginTop: 40
        },


        searchSection: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
            borderRadius: 20,
            height: 80
        },
        searchIcon: {
            padding: 10,
        },
        input: {
            flex: 1,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 0,
            backgroundColor: '#F1F1F1',
            color: '#424242',
            height: 40
        },
    });

    return (
        <View style={styles.Container}>

            {/* Top Bar */}
            <View style={styles.logoProfileContainer}>
                {/* Logo */}
                <Image
                    source={{ uri: imageURL + 'logo2.png' }}
                    style={{ height: 50, width: 85, resizeMode: "contain" }}
                    onPress={() =>
                        navigation.navigate('Home')
                    }
                />

                {/* User Profile Picture */}
                <Pressable
                    onPress={() =>
                        navigation.navigate('Profile')
                    }
                >
                    <Image
                        source={{ uri: imageURL + 'abdel.jpg' }}
                        style={{ height: 50, width: 50, borderRadius: 60, borderWidth: 3, borderColor: '#FFFFFF' }}
                    />
                </Pressable>
            </View>
        </View>
    )
}