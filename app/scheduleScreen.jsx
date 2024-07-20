import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function ScheduleScreen() {
  // 선택된 날짜의 task를 상태로 관리할 useState 훅
  const [familyId, setFamilyId] = useState(12345678);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    updateEvent();
    ShowEvent();
  }, [familyId])

  const updateEvent = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/event/${familyId}`);
      if(!res.ok){
        throw new Error("응답이 없습니다.");
      }
      const data = await res.json();
      setEvents(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const ShowEvent = ()=>{
    return(
      <View style={styles.taskContainer}>
      {events.filter((item) => item.date === selectedDate).map((item,index)=>
        (<Text key={item.id}>{item.content}</Text>))}
      </View>
    );
  }

  // 달력에서 날짜를 선택했을 때 실행되는 이벤트 핸들러
  const handleDayPress = (day) => {
    // 선택된 날짜의 task를 schedule 배열에서 찾아서 설정
    setSelectedDate(day.dateString);
    console.log(selectedDate);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 달력 컴포넌트 */}
      <Calendar
        current={new Date().toISOString().split('T')[0]} // 현재 날짜 설정
        onDayPress={handleDayPress} // 날짜 클릭 시 실행될 이벤트 핸들러
      />

      {/* 선택된 날짜의 task가 있을 경우에만 출력 */}
      {events && <ShowEvent/>}
    </ScrollView>
  );
}

// 스타일 시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },

  taskContainer: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center'
  },
});

