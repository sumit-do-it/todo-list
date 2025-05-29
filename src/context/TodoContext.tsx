import React, { createContext, useContext, useEffect, useState } from "react";
import { Todo, TodoContextType, TodoInput, FilterItem } from "@typings/todo";
import { storage } from "@utils/storage";
import { TodoListFilters } from "@utils/constants";
import { createId } from "@utils/methods";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterItem["id"]>("ALL");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const loadedTodos = await storage.getTodos();
      setTodos(loadedTodos);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const getTodo = (id: string) => {
    return todos.find((todo) => todo.id === id) ?? null;
  };

  const addTodo = async (todoInput: TodoInput) => {
    try {
      const newTodo: Todo = {
        ...todoInput,
        id: createId(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const updatedTodos = [...todos, newTodo];
      await storage.saveTodos(updatedTodos);
      setTodos(updatedTodos);
      return newTodo;
    } catch (err) {
      setError("Failed to add todo");
      return null;
    }
  };

  const updateTodo = async (
    id: string,
    todoInput: Partial<Omit<Todo, "id">>
  ) => {
    try {
      // console.info('@@ before update>>> ', todos);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...todoInput, updatedAt: Date.now() } : todo
      );
      
      await storage.saveTodos(updatedTodos);
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      // console.log('@@@ delete>>> ', todos);
      
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      await storage.saveTodos(updatedTodos);
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      );
      await storage.saveTodos(updatedTodos);
      setTodos(updatedTodos);
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    switch (currentFilter) {
      case "COMPLETED":
        return todo.completed;
      case "PENDING":
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        getTodo,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        loading,
        error,
        currentFilter,
        setCurrentFilter,
        filters: TodoListFilters,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
