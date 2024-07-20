import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'; // react-native-elements에서 CheckBox import


export default function TaskScreen() {
    const [tasks, setTasks] = useState([]);
    const [familyId, setFamilyId] = useState(12345678);

    // 체크 상태 변경 처리 함수
    const toggleItemChecked = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const updateTask = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/task/${familyId}`);
            if (!res.ok) {
                throw new Error('서버로부터 잘못된 응답을 받았습니다.');
            }
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error('API 호출 중 에러 발생:', error);
        }
    };

    useEffect(() => {
        updateTask();
    }, [familyId]);

    const RenderTasks = () => {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header}>가족별 할일</Text>
                <View >
                    {tasks.map((item, index) => (<View styel={styles.taskList}>
                        <CheckBox
                            value={item.checked}
                            onValueChange={() => toggleItemChecked(item.id)}
                        />
                        <Text key={item.id}>- {item.user.name} : {item.content}</Text>
                        
                    </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return <RenderTasks />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 20,
    },
    taskList: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    
});
