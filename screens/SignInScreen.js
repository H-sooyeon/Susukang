import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';

const SignInScreen = ({navigation, route}) => {
  const {isSignUp} = route.params ?? {};

  return (
    <SafeAreaView style={styles.fullscreen}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={styles.text}>Susukang</Text>
      <View style={styles.form}>
        <BorderedInput hasMarginBottom placeholder="이메일" />
        <BorderedInput placeholder="비밀번호" hasMarginBottom={isSignUp} />
        {isSignUp && <BorderedInput placeholder="비밀번호 확인" />}
        <View style={styles.buttons}>
          {isSignUp ? (
            <>
              <CustomButton title="회원가입" hasMarginBottom />
              <CustomButton
                title="로그인"
                theme="secondary"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </>
          ) : (
            <>
              <CustomButton
                title="로그인"
                hasMarginBottom
                onPress={() => {
                  navigation.navigate('Minutes');
                }}
              />
              <CustomButton
                title="회원가입"
                theme="secondary"
                onPress={() => {
                  navigation.push('SignIn', {isSignUp: true});
                }}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
