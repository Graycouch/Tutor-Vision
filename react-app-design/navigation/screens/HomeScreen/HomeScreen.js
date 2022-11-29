import * as React from 'react';
import { View, Text, Button, Image, TextInput, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useGlobalState, setGlobalState } from '../../../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


import Header from '../../header/header.js';
import { CardFactory } from '../../../components/Card/Factory';

export default function HomeScreen({ navigation }) {
    const [user] = useGlobalState("user");
    const [allUsers] = useGlobalState("allUsers");
    const [searchValue] = useGlobalState("searchValue");
    const [bookedSessions] = useGlobalState("bookedSessions");
    const [localhost] = useGlobalState("localhost");

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [username, setUsername] = useState(user.username);

    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';
    const [sessionUsers, setSessionUsers] = useState([]);

    // Temporary Hardcoding for Mid-term Demo
    const UpcomingLessons = sessionUsers;
    const MyTeachers = allUsers.slice(5, 6);
    const SuggestedTeachers = allUsers.slice(2, 5);

    useEffect(() => {
        axios.get(`http://${localhost}:8800/api/bookedSessions/${user._id}`, {
        })
            .then((response) => {
                setGlobalState("bookedSessions", response.data);
            }, (error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        if (bookedSessions.length !== 0) {
            setSessionUsers([]);
            bookedSessions.map((bookedSession) => (
                setSessionUsers(sessionsUsers => [...sessionsUsers, Object.assign(allUsers.find(currentUser =>
                    (currentUser._id === bookedSession.members[1] && user._id !== bookedSession.members[1]) ||
                    (currentUser._id === bookedSession.members[0] && user._id !== bookedSession.members[0])
                ), { time: bookedSession.time, date: bookedSession.date })
                ])
            ))
        }
    }, [bookedSessions])


    // DEBUG
    const debugBorders = false;

    const styles = StyleSheet.create({

        contentContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            paddingVertical: windowHeight * 0.064,
            marginLeft: 10,
            marginRight: 10
        },

        // Overall Container
        homepageContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            marginLeft: 10,
            marginRight: 10,
            marginTop: 100
        },

        // Inner Container for each Section
        sectionContainer: {
            flexDirection: 'column',
            alignContent: 'stretch',
            alignItems: 'stretch',
            justifyContent: "flex-start",
            borderColor: debugBorders ? 'blue' : '#ffffff',
            borderWidth: 2,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 4,
            marginRight: 4

        },

        heading: {
            fontSize: 22,
            fontWeight: 'medium',
            borderColor: debugBorders ? 'blue' : '#ffffff',
            borderWidth: debugBorders ? 12 : 0,
            flexDirection: 'row',
            marginBottom: 20
        },

        flexRow: {
            flexDirection: 'row'
        }


    });

    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            {/* Header */}
            {/* <Header navigation={navigation} /> */}

            {/* <View style={styles.homepageContainer}> */}
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={{}}>
                <View style={{ flexDirection: 'row', marginBottom: windowHeight * 0.0128, top: -windowHeight * 0.019 }}>
                    <TextInput placeholder="Search" value={searchValue} onChangeText={newText => setGlobalState("searchValue", newText)}
                        onSubmitEditing={() => navigation.navigate('Search', { screen: 'Search' })}
                        style={{ backgroundColor: '#F1F1F1', height: windowHeight * 0.0512, width: windowWidth * 0.95, borderRadius: windowHeight * 0.0256, paddingLeft: windowWidth * 0.104, fontSize: 15 }} />
                    <MaterialCommunityIcons name={"magnify"} color={"#9E9E9E"} size={20} style={{ top: windowHeight * 0.0128, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
                </View>

                <Text style={{ fontSize: 40, fontWeight: 'bold', margin: 4, textAlign: 'center' }}>
                    Welcome back!
                </Text>
                <Text style={{ fontSize: 10, fontWeight: 'bold', margin: 4, marginBottom: UpcomingLessons.length > 0 ? 20 : 0, textAlign: 'center' }}>
                    We hope you've been doing good  :)
                </Text>
                {/* Upcoming Lessons */}
                <View style={styles.sectionContainer}>
                    {UpcomingLessons.length > 0 ? (
                        <>
                            <Text style={styles.heading}>Upcoming Lessons</Text>
                            <CardFactory CardType="UpcomingLesson" users={UpcomingLessons} />
                        </>
                    ) : (
                        <View />
                    )
                    }
                </View>

                {/* My Teachers */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>Previous Teachers</Text>
                    <CardFactory CardType="MyTeachers" users={MyTeachers} />
                </View>

                {/* Suggested Teachers */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.heading}>Suggested Teachers</Text>
                    <CardFactory CardType="SuggestedTeachers" users={SuggestedTeachers} />
                </View>

                {/* footer spacing */}
                <View style={{ height: 100 }}></View>

            </ScrollView>
        </View>
        // </View>
    )
}