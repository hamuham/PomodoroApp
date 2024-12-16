import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [repeat, setRepeat] = useState('');

  const handleCreate = () => {
    if (!title || !duration || !breakTime || !repeat) {
      Alert.alert('エラー', 'すべてのフィールドを入力してください');
      return;
    }

    // 必要に応じてデータ保存処理を追加する
    Alert.alert('成功', '新しいタイマーを設定を作成しました');
    navigation.goBack(); // 一覧画面に戻る
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新しいタイマーを作成</Text>

      <TextInput
        style={styles.input}
        placeholder="タイトルを入力 (例: 集中タイム)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="作業時間 (例: 25分)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="休憩時間 (例: 5分)"
        value={breakTime}
        onChangeText={setBreakTime}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="繰り返し回数 (例: 4)"
        value={repeat}
        onChangeText={setRepeat}
        keyboardType="numeric"
      />

      <Button title="作成" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
});

export default CreateScreen;
