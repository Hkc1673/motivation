import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Button, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Feed = () => {
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const goalsCollection = await firestore().collection('goals').get();
    setGoals(
      goalsCollection.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      }),
    );
  };
  const addGoal = async () => {
    const newGoal = {
      text: newGoalText,
      pomodoroCount: 0,
      startDate: new Date(),
      endDate: false,
      workingDates: [],
      reminder: false,
      repeat: false,
      completed: false,
      type: 'goals',
    };

    await firestore().collection('goals').add(newGoal);
    setNewGoalText('');
    fetchGoals();
  };

  const deleteGoal = async goalId => {
    await firestore().collection('goals').doc(goalId).delete();
    fetchGoals();
  };

  const updateGoal = async (goalId, updatedText) => {
    await firestore().collection('goals').doc(goalId).update({
      text: updatedText,
    });
    fetchGoals();
  };
  return (
    <SafeAreaView>
      <Text>Goals Page</Text>
      <TextInput
        placeholder="New Goal"
        value={newGoalText}
        onChangeText={text => setNewGoalText(text)}
      />
      <Button title="Add Goal" onPress={addGoal} />
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
      <Button title={'Sign Out'} onPress={() => auth().signOut()} />
      <Icon name={'rocket'} size={30} color={'#900'} />
    </SafeAreaView>
  );
};

export default Feed;
