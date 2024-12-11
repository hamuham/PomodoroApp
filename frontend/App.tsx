import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const handleStartPress = () => {
    alert('スタートボタンが押されました！');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PomodoroApp</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
        <Text style={styles.buttonText}>スタート</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5, // ボタンに影をつける（Android向け）
    shadowColor: '#000', // iOSの影
    shadowOffset: { width: 0, height: 3 }, // iOSの影の位置
    shadowOpacity: 0.3, // iOSの影の透明度
    shadowRadius: 4, // iOSの影のぼかし
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;
