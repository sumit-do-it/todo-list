import { useCallback, useEffect, useRef, useState } from "react";
import { Todo } from "../typings/todo";
import { useTodo } from "../context/TodoContext";
import { ScrollView, TextInput, Keyboard, Platform } from "react-native";
import { SCREEN_HEIGHT } from "../utils/constants";

export default (props: { id?: string }) => {
  const { getTodo, addTodo, deleteTodo, updateTodo } = useTodo();
  const [localTodo, setLocalTodo] = useState<Todo | null>(null);
  const localTodoRef = useRef<Todo | null>(null);
  const titleRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const descriptionRef = useRef<TextInput>(null);

  const scrollToInput = useCallback((inputRef: React.RefObject<TextInput>) => {
    if (!inputRef.current || !scrollRef.current) return;
    // Get the input's position relative to the window
    inputRef.current.measure((x, y, width, height, pageX, pageY) => {
      if (!pageY) return;

      // Get keyboard height (approximate for iOS)
      const keyboardHeight = Platform.OS === 'ios' ? 250 : 0;
      
      // Calculate if input is hidden by keyboard
      const screenHeight = SCREEN_HEIGHT;
      const inputBottom = pageY + height;
      const keyboardTop = screenHeight - keyboardHeight;

      if (inputBottom > keyboardTop) {
        // Scroll to make input visible
        const scrollTo = pageY - (keyboardTop - height - 20); // 20px padding
        scrollRef.current?.scrollTo({ y: scrollTo, animated: true });
      }
    });
  }, []);

  const setData = (field: string, val: string) => {
    setLocalTodo((_local) => {
      return { ..._local, [field]: val };
    });
  };

  const setLocalTodoOnMount = async () => {
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
  };

  const clear = () => {
    const currentTodo = localTodoRef.current;
    if (currentTodo?.id) {
      // console.log("@@@ clear run>>> ", currentTodo);

      if (!currentTodo?.title && !currentTodo?.description) {
        deleteTodo(currentTodo.id);
      } else {
        const { id, ...rest } = currentTodo;
        updateTodo(id, { ...rest });
      }
    }
  };

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
        clearTimeout(timer);
      };
    }
  }, [localTodo?.title]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Check which input is focused and scroll to it
        if (titleRef.current?.isFocused()) {
          scrollToInput(titleRef);
        } else if (descriptionRef.current?.isFocused()) {
          scrollToInput(descriptionRef);
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [scrollToInput]);

  return {
    titleRef,
    descriptionRef,
    scrollRef,
    title: localTodo?.title || "",
    description: localTodo?.description || "",
    setTitle: (val: string) => setData("title", val),
    setDescription: (val: string) => setData("description", val),
  };
};
