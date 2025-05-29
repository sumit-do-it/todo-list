import { useCallback, useEffect, useRef, useState } from "react";
import { Todo } from "../typings/todo";
import { useTodo } from "../context/TodoContext";
import { TextInput } from "react-native";

export default (props: { id?: string }) => {
  const { getTodo, addTodo, deleteTodo, updateTodo } = useTodo();
  const [localTodo, setLocalTodo] = useState<Todo | null>(null);
  const localTodoRef = useRef<Todo | null>(null);
  const titleRef = useRef<TextInput>(null);

  const setData = (field: string, val: string) => {
    setLocalTodo((_local) => {
      return { ..._local, [field]: val };
    });
  };

  const setLocalTodoOnMount = useCallback(async () => {
    let todo;
    if (props?.id) {
      todo = getTodo(props.id);
    }

    if (!todo) {
      todo = await addTodo({
        title: "",
        description: "",
      });
    }
    setLocalTodo(todo);
  }, []);

  const clear = (() => {
    const currentTodo = localTodoRef.current;
    if (currentTodo?.id) {
      // console.log("@@@ clear run>>> ", currentTodo);

      if (!currentTodo?.title && !currentTodo?.description) {
        deleteTodo(currentTodo.id);
      } else {        
        const {id, ...rest} = currentTodo;
        updateTodo(id, { ...rest });
      }
    }
  });

  useEffect(() => {
    setLocalTodoOnMount();
    return clear;
  }, []);

  useEffect(() => {
    localTodoRef.current = localTodo;
  }, [localTodo]);

  useEffect(() => {
    // Focus title input if empty after screen transition
    if (!localTodo?.title) {
      const timer = setTimeout(() => {
        titleRef.current?.focus();
      }, 250); // Small delay to ensure screen transition is complete

      return () => {
        console.log("@@@ clearing timeout>>>");

        clearTimeout(timer);
      };
    }
  }, [localTodo?.title]);

  return {
    titleRef,
    title: localTodo?.title || "",
    description: localTodo?.description || "",
    setTitle: (val: string) => setData("title", val),
    setDescription: (val: string) => setData("description", val),
  };
};
