import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Sound from "react-native-sound";

const alarmSound = "alarm.mp3";

const TimerScreen = ({ route }) => {
  const { title, duration, break_time, repeat } = route.params;

  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);

  const totalTime = isBreak ? break_time * 60 : duration * 60;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;

          clearInterval(timer);
          handleTimerEnd();
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isBreak, currentCycle]);

  const handleTimerEnd = () => {
    if (isBreak) {
      if (currentCycle < repeat) {
        setCurrentCycle((prev) => prev + 1);
        setIsBreak(false);
        setTimeLeft(duration * 60);
      } else {
        alert("全てのサイクルが終了しました");
        resetTimer();
      }
    } else {
      setIsBreak(true);
      setTimeLeft(break_time * 60);
      playAlarmSound();
    }
    setIsRunning(false);
  };

  const playAlarmSound = () => {
    // 音声ファイルが存在するかをチェックして再生
    const sound = new Sound(alarmSound, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("音声の読み込みエラー:", error);
        return;
      }
      sound.play((success) => {
        if (success) {
          console.log("アラーム音が再生成功");
        } else {
          console.log("アラーム音の再生に失敗");
        }
      });
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCurrentCycle(1);
    setTimeLeft(duration * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 円グラフの進捗割合を計算 (0〜1の範囲)
  const progress = 1 - timeLeft / totalTime;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.cycleText}>
        {currentCycle}/{repeat} {isBreak ? "休憩時間" : "作業時間"}
      </Text>

      {/* 円グラフ */}
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.backgroundCircle]} />
        <View
          style={[
            styles.circle,
            styles.progressCircle,
            { transform: [{ rotate: `${progress * 360}deg` }] },
          ]}
        />
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title={isRunning ? "停止" : "開始"} onPress={() => setIsRunning((prev) => !prev)} />
        <Button title="リセット" onPress={resetTimer} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cycleText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 15,
  },
  backgroundCircle: {
    borderColor: "#e0e0e0",
  },
  progressCircle: {
    borderColor: "tomato",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    position: "absolute",
  },
  timerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: 200,
  },
});

export default TimerScreen;
