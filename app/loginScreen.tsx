import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginWithKakao = () => {
  const handleLoginWithKakao = () => {
    // Kakao 로그인 처리 로직을 여기에 추가
    console.log('Kakao login button clicked');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={handleLoginWithKakao}
      >
        <Image
          style={styles.kakaoImage}
          source={{ uri: 'https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg' }}
          resizeMode="contain"
          width={150}
          height={15}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9e000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  kakaoImage: {
    width: 222,
    height: 50,
  },
});

export default LoginWithKakao;
