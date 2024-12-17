import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ListScreen = ({ navigation }) => {
  const [pomodoroSettings, setPomodoroSettings] = useState([]);

  // ポモドーロ設定一覧を取得
  useEffect(() => {
    const fetchPomodoroSettings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/pomodoro');
        if (response.ok) {
            const data = await response.json();
            console.log(data)
          setPomodoroSettings(data);
        } else {
          console.log('エラーが発生しました:', response.status);
        }
      } catch (error) {
        console.error('通信エラー:', error);
      }
    };

    fetchPomodoroSettings();
  }, []);

  // 編集画面に遷移
  const handleEdit = (id) => {
    const item = pomodoroSettings.find((setting) => setting.id === id);
    if (item) {
      navigation.navigate('Edit', { ...item });
    }
  };

  // 削除機能
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pomodoro/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('ポモドーロ設定が削除されました');
        setPomodoroSettings(pomodoroSettings.filter((item) => item.id !== id));  // リストを更新
      } else {
        console.log('削除エラー:', response.status);
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('削除エラー:', error);
      alert('通信エラー');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={styles.headerButtonText}>新しく作成</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ポモドーロ設定</Text>

      {/* 一覧表示 */}
      <FlatList
        data={pomodoroSettings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item.id)}
                >
                  <Text style={styles.buttonText}>編集</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>削除</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemDetail}>作業時間: {item.duration}分</Text>
              <Text style={styles.itemDetail}>休憩時間: {item.break_time}</Text>
              <Text style={styles.itemDetail}>繰り返し回数: {item.repeat}回</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('TimerScreen', { ...item })}
              >
                <Text style={styles.buttonText}>タイマー開始</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* 戻るボタン */}
      <Button title="もどる" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  itemDetails: {
    paddingTop: 5,
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ListScreen;
