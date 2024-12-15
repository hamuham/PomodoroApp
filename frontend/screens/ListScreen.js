import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ListScreen = ({ navigation }) => {

    // ポモドーロタイマーの仮データ
  const pomodoroSettings = [
    { id: '1', title: '集中タイム', duration: '25分', breakTime: '5分', repeat: 4 },
    { id: '2', title: '短い休憩', duration: '5分', breakTime: '-', repeat: 1 },
    { id: '3', title: '長い休憩', duration: '15分', breakTime: '-', repeat: 1 },
  ];

  const handleEdit = (id) => {
    console.log(`編集ボタンが押されました: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`削除ボタンが押されました: ${id}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate('CreateScreen')}
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.buttonText}>編集</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemDetail}>作業時間: {item.duration}</Text>
                <Text style={styles.itemDetail}>休憩時間: {item.breakTime}</Text>
                <Text style={styles.itemDetail}>繰り返し回数: {item.repeat}回</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                        <Text style={styles.buttonText}>削除</Text>
                    </TouchableOpacity>
                </View>
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
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    paddingTop: 5,
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      itemSubDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
      buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginBottom: 4,
      },

});

export default ListScreen;
