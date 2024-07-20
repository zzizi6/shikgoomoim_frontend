import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 스택 네비게이션 추가
import { Button, Alert, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, } from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";

import MainScreen from './mainScreen';
import MemoryScreen from './memoryScreen';
import ProfileScreen from './profileScreen';
import ScheduleScreen from './scheduleScreen';
import TaskScreen from './taskScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 스택 네비게이션 객체 생성



export default function MainNavigator() {
  return (
    <MenuProvider style={{ marginRight: 10 }}>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="메인"
            component={MainScreen}
            options={{
              headerRight: () => (
                <View style={styles.headerRightContainer}>

                  <TouchableOpacity
                    onPress={() => Alert.alert('첫 번째 버튼이 눌렸습니다!')}
                    style={{ alignSelf: 'flex-end', marginRight: 5 }}>
                    <Image
                      source={require('../assets/images/alarm.png')}
                      style={{ width: 20, height: 20, }}/>
                  </TouchableOpacity>

                  <View style={styles.menuContainer}>
                    <Menu style={{width:10}}>
                      <MenuTrigger >
                        <Entypo name="dots-three-vertical" size={18} color="black" />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('활동 추가')} >
                          <Text>실시간 활동 조회</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert('Option 2 selected')} >
                          <Text>활동 추가</Text>
                        </MenuOption>
                  
                      </MenuOptions>
                    </Menu>
                  </View>

                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/images/home_tab.png')}
                  style={{width:20, height:20}}
                />
              ),
              title: '메인',
            }}
          />

          <Tab.Screen
            name="추억"
            component={MemoryScreen}
            options={{
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <Menu>
                    <MenuTrigger >
                      <Entypo name="dots-three-vertical" size={18} color="black" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => alert('Option 1 selected')}>
                        <Text>추억 추가</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => alert('Option 2 selected')}>
                        <Text>추억 조회</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/images/memory_tab2.png')}
                  style={{width:20, height:20}}
                />
              ),
              title: '추억',
            }}
          />
          <Tab.Screen
            name="일정"
            component={ScheduleScreen}
            options={{
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <Menu>
                    <MenuTrigger>
                      <Entypo name="dots-three-vertical" size={18} color="black" />
                    </MenuTrigger>
                    <MenuOptions >
                      <MenuOption onSelect={() => alert('Option 1 selected')} >
                        <Text>일정 추가</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => alert('Option 2 selected')} >
                        <Text>수정</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/images/calander_tab.png')}
                  style={{width:20, height:20}}
                />
              ),
              title: '일정',

            }}
          />
          <Tab.Screen
            name="할일"
            component={TaskScreen}
            options={{
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <Menu>
                    <MenuTrigger >
                      <Entypo name="dots-three-vertical" size={18} color="black" />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption onSelect={() => alert('Option 1 selected')}>
                        <Text>할일 추가</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => alert('Option 2 selected')}>
                        <Text>할일 삭제</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/images/task_tab.png')}
                  style={{width:20, height:20}}
                />
              ),
              title: '할일',
            }}
          />
          <Tab.Screen
            name="MyPage"
            component={ProfileScreen}
            options={{
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    // onPress={}
                    style={{ marginRight: 10 }}
                  >
                    <Image
                      source={require('../assets/images/settings.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('../assets/images/profile_tab.png')}
                  style={{width:20, height:20}}
                />
              ),
              title: 'MyPage',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonSetting: {

  },

  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },

});