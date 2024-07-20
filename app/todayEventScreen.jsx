// EventScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodayEventScreen = ({ events, todayDate }) => {
    return (
        <View style={styles.feedContainer}>
            <Text style={styles.feedTitle}>오늘 가족 이벤트 피드</Text>
            <View style={styles.feedItem}>
                {events.filter(item => item.date === todayDate).map((item, index) => (
                    <Text style={styles.feedText} key={item.id}>{(index + 1) + ". " + item.content}</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    feedContainer: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: 'white',
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
});

export default TodayEventScreen;