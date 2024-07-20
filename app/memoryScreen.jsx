import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button, FlatList, Text, Image, TextInput } from 'react-native';


export default function MemoryScreen() {
    const [memories, setMemories] = useState([]); // 추억 배열
    const [familyId, setFamilyId] = useState(12345678);

    // 추억 업데이트 (예시로 가족 id 사용)
    const updateMemory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/memory/${familyId}`);
            if (!response.ok) {
                throw new Error('응답이 없습니다.');
            }
            const data = await response.json(); // 응답 데이터를 JSON 형태로 파싱
            setMemories(data);

        } catch (error) {
            console.error(error); // 에러 처리
        }
    };

    const RenderMemories = () => {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.feedContainer}>
                    {memories.map((item, index) =>
                    (<View style={styles.feedItem}>
                        <Image source={{ uri: item.image }} style={styles.feedImage} key={item.id}></Image>
                        <Text key={item.id} style={styles.feedText}>{item.content}</Text>
                        <Text key={item.id} style={styles.feedDescription}>{item.date}</Text>
                    </View>
                    ))}
                </View>
            </ScrollView>
        );
    }

    useEffect(() => {
        updateMemory();
    }, [familyId])

    return (
        <RenderMemories></RenderMemories>
    );
}

// 스타일 시트
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputContainer: {
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
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
    feedDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    feedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
});
