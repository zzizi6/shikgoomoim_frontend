import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import ActivityScreen from './activityScreen'
import TodayEventScreen from './todayEventScreen'

const Tab = createMaterialTopTabNavigator();

// 메인 홈 화면 컴포넌트
const MainScreen = () => {
    const [familyId, setFamilyId] = useState(12345678);
    const [family, setFamily] = useState([]);
    const [events, setEvents] = useState([]); // 가족 이벤트
    const [activities, setActivities] = useState([]); // 가족 활동
    
    const today = new Date();
    const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    // 가족 이름과 환영 메시지 컴포넌트
    const WelcomeBanner = ({ familyName }) => (
        <View style={styles.banner}>
            <Text style={styles.bannerText}>{familyName}</Text>
            <Image source={require('../assets/images/family.png')} style={{width:35, height:35}}/>
        </View>
    );

    // 가족 업데이트
    const updateFamily = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/family/${familyId}`);
            if (!res.ok) {
                throw new Error('응답이 없습니다.');
            }
            const data = await res.json();
            setFamily(data);
            console.log("가족 업데이트 ok");
        } catch (error) {
            console.log(error);
        }
    };

    // 활동 업데이트 (예시로 가족 id 사용)
    const updateActivity = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/activity/${familyId}`);
            if (!res.ok) {
                throw new Error('응답이 없습니다.');
            }
            const data = await res.json(); // 응답 데이터를 JSON 형태로 파싱
            setActivities(data);
            console.log("활동 업데이트 ok");
        } catch (error) {
            console.error(error); // 에러 처리
        }
    };

    // 오늘 가족 일정 업데이트
    const updateTodayEvent = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/event/${familyId}`);
            if (!res.ok) {
                throw new Error('응답이 없습니다.');
            }
            const data = await res.json();
            setEvents(data);
            console.log("가족 일정 업데이트 ok");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        updateFamily();
        updateActivity();
        updateTodayEvent();
    }, [familyId]);

    return (
        <SafeAreaView style={styles.container}>
            <WelcomeBanner familyName={family.name} />
            <Tab.Navigator
                initialRouteName="Activities"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName;
                        if (route.name === 'Activities') {
                            iconName = 'list';
                        } else if (route.name === 'Events') {
                            iconName = 'calendar';
                        }
                        return <Icon name={iconName} size={24} color={color} />;
                    },
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarItemStyle: { width: 100 },
                    tabBarStyle: { backgroundColor: 'powderblue' },
                })}
            >
                <Tab.Screen name="Activities">
                    {() => <ActivityScreen activities={activities} />}
                </Tab.Screen>
                <Tab.Screen name="Events">
                    {() => <TodayEventScreen events={events} todayDate={todayDate} />}
                </Tab.Screen>
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
    },
    banner: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 5,
    },
    bannerText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    feedContainer: {
        marginVertical: 10,
    },
    feedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feedItem: {
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
    },
    feedText: {
        fontSize: 16,
    },
    feedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default MainScreen;
