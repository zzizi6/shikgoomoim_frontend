import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';

export default function ProfileScreen(props) {
  const [userId, setUserId] = useState("testId"); // 사용자 아이디 상태
  const [response, setResponse] = useState(null); // API 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 사용자 정보 업데이트 함수
  const updateProfile = async () => {
    try {
      setLoading(true); // 로딩 시작
      const res = await fetch(`http://localhost:8080/api/user/${userId}`); // API 호출
      if (!res.ok) {
        throw new Error('서버로부터 잘못된 응답을 받았습니다.');
      }
      const data = await res.json(); // JSON 데이터로 변환

      setResponse(data); // 상태 업데이트

    } catch (error) {
      setError(error); // 에러 발생 시 에러 상태 업데이트

    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때와 userId가 변경될 때마다 사용자 정보 업데이트
  useEffect(() => {
    updateProfile();
  }, [userId]);

  // 로딩 중일 때 보여줄 화면
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  // 에러 발생 시 보여줄 화면
  if (error) {
    return (
      <View style={styles.error}>
        <Text>에러가 발생했습니다: {error.message}</Text>
      </View>
    );
  }

  // 데이터가 없을 때 보여줄 화면
  if (!response) {
    return (
      <View style={styles.error}>
        <Text>데이터가 없습니다.</Text>
      </View>
    );
  }

  // 정상적인 데이터가 있을 때 보여줄 화면
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.profile}>
        <Image style={styles.profileImage} source={{ uri: response.image}} />
        <View style={styles.textBox}>
          <Text style={{fontSize: 20, marginBottom: 2}}>{response.name}</Text>
          <Text>{response.userId}</Text>
          <Text>{response.age}</Text>
          <Text>{response.gender}</Text>
        </View>
      </View> */}


      <View style={styles.profile}>
        <Image style={styles.profileImage} source={{ uri: response.image }} />
        <View style={styles.textBox}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>{response.name}</Text>
          <Text style={{ color: "gray", marginBottom:5 }}>{response.userId}</Text>
          <Text style={{ color: "gray" }}>소속가족 3</Text>
        </View>
      </View>



      <View style={styles.content}>

        <View style={styles.contentDetail}>
          <Text style={{color:'gray'}}>가족 정보</Text>
        </View>
        <View style={styles.contentDetail}>
          <Text>가족 변경</Text> 
        </View>
        <View style={styles.contentDetail}>
          <Text>가족 수정</Text> 
        </View>

      </View>

      <View style={styles.content}>

        <View style={styles.contentDetail}>
          <Text style={{color:'gray'}}>기타</Text>
        </View>
        <View style={styles.contentDetail}>
          <Text>유저 검색</Text> 
        </View>
        <View style={styles.contentDetail}>
          <Text>탈퇴</Text> 
        </View>

      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    padding: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 25,
    marginTop: 20
  },
  textName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBox: {
    flex: 1,
    alignItems: 'center'

  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    padding: 15,

  },
  contentDetail: {
    flexDirection: 'row',
    padding: 7,
    marginBottom: 5,
    fontSize: 16

  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
