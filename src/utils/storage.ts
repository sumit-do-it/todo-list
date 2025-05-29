import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@typings/todo';

const STORAGE_KEY = '@todo_app:todos';

export const storage = {
  async getTodos(): Promise<Todo[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
      throw error;
    }
  }
}; 