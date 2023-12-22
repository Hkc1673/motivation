import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {SwipeAction} from '@ant-design/react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Goal {
  id: string;
  text: string;
  pomodoroCount: number;
  startDate: Date;
  endDate: boolean;
  workingDates: Date[];
  reminder: boolean;
  repeat: boolean;
  completed: boolean;
  type: string;
}

const Feed: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const goalsCollection = await firestore().collection('goals').get();
    setGoals(
      goalsCollection.docs.map(doc => {
        return {...doc.data(), id: doc.id} as Goal;
      }),
    );
  };

  const deleteGoal = async (goalId: string) => {
    await firestore().collection('goals').doc(goalId).delete();
    fetchGoals();
  };

  const updateGoal = async (goalId: string, updatedText: string) => {
    await firestore().collection('goals').doc(goalId).update({
      text: updatedText,
    });
    fetchGoals();
  };

  type ItemProps = {title: string};
  const Item = ({title}: ItemProps) => (
    <SwipeAction
      right={[
        {
          text: 'Delete',
          onPress: () => console.log('delete'),
          backgroundColor: 'red',
          color: 'white',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          backgroundColor: 'gray',
          color: 'white',
        },
      ]}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SwipeAction>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView>
        <Text>Goals Page</Text>
        {goals.map(goal => (
          <View key={goal.id}>
            <Text>{goal.text}</Text>
            <TextInput
              placeholder="Update Goal"
              value={goal.text}
              onChangeText={text => updateGoal(goal.id, text)}
            />
            <Button title="Delete" onPress={() => deleteGoal(goal.id)} />
          </View>
        ))}
        <FlatList
          data={goals}
          renderItem={({item}) => <Item title={item.text} />}
          keyExtractor={item => item.id}
        />
        <Icon name={'rocket'} size={30} color={'#900'} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Feed;
