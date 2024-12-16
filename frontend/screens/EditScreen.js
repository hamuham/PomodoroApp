import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const EditScreen = ({ route, navigation }) => {
  // `route.params`から編集対象のデータを受け取る
  const { id, title: initialTitle, duration: initialDuration, breakTime: initialBreakTime, repeat: initialRepeat } = route.params;

  const [title, setTitle] = useState(initialTitle);
  const [duration, setDuration] = useState(initialDuration);
  const [breakTime, setBreakTime] = useState(initialBreakTime);
  const [repeat, setRepeat] = useState(initialRepeat);

  const handleSave = () => {
    if (!title || !duration || !breakTime || !repeat) {
      Alert.alert('エラー', 'すべてのフィールドを入力してください');
      return;
    }

    // 必要に応じて保存処理を追加
    Alert.alert('成功', '編集内容を保存しました');
    navigation.goBack(); // 一覧画面に戻る
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ポモドーロ設定を編集</Text>

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

      <Button title="保存" onPress={handleSave} />
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

export default EditScreen;
