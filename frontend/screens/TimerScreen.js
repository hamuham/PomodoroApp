import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimerScreen = ({ route, navigation }) => {
  const { title, duration, breakTime, repeat } = route.params;  // リスト画面から受け取った情報

  const [timeLeft, setTimeLeft] = useState(parseInt(duration) * 60);  // タイマーの残り時間（秒）
  const [isRunning, setIsRunning] = useState(false);  // タイマーが動いているか
  const [timerId, setTimerId] = useState(null);  // タイマーID（停止のため）

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      setTimerId(id);
    } else {
      if (timerId) {
        clearInterval(timerId);
      }
    }

    // クリーンアップ
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, timerId]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>{formatTime(timeLeft)}</Text>

      <Button title={isRunning ? '停止' : '開始'} onPress={handleStartStop} />
      <Button title="戻る" onPress={() => navigation.goBack()} style={styles.backButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
});

export default TimerScreen;
