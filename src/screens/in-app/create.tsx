import React, {useState} from 'react';
import {Button, Text, TextInput, SafeAreaView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Create = () => {
  const [newGoalText, setNewGoalText] = useState<string>('');
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
    //navigation.navigate('Feed');
  };
  return (
    <SafeAreaView>
      <TextInput
        placeholder="New Goal"
        value={newGoalText}
        onChangeText={text => setNewGoalText(text)}
      />
      <Button title="Add Goal" onPress={addGoal} />
    </SafeAreaView>
  );
};

export default Create;
