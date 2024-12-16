import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [repeat, setRepeat] = useState('');
  const [memo, setMemo] = useState('');

  // フォームの送信処理
  const handleSubmit = async () => {
    const newPomodoro = {
      title,
      duration: parseInt(duration),
      break_time: breakTime ? parseInt(breakTime) : null,
      repeat: parseInt(repeat),
      memo,
    };

    try {
      const response = await fetch('http://localhost:8000/api/pomodoro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPomodoro),
      });

      if (response.ok) {
        alert('ポモドーロ設定が保存されました');
        navigation.goBack();
      } else {
        console.log(response)
        alert('エラーが発生しました');
      }
    } catch (errord) {
      console.error('Error:', error);
      alert('通信エラー');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ポモドーロ設定作成</Text>
      <TextInput
        style={styles.input}
        placeholder="タイトル"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="作業時間 (分)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="休憩時間 (分)"
        keyboardType="numeric"
        value={breakTime}
        onChangeText={setBreakTime}
      />
      <TextInput
        style={styles.input}
        placeholder="繰り返し回数"
        keyboardType="numeric"
        value={repeat}
        onChangeText={setRepeat}
      />
      <TextInput
        style={styles.input}
        placeholder="メモ"
        value={memo}
        onChangeText={setMemo}
      />
      <Button title="保存" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default CreateScreen;
