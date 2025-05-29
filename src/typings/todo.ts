export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export type TodoInput = Omit<
  Todo,
  "id" | "createdAt" | "updatedAt" | "completed"
>;

export interface TodoContextType {
  todos: Todo[];
  getTodo: (id: string) => Todo | null;
  addTodo: (todo: TodoInput) => Promise<Todo | null>;
  updateTodo: (id: string, todo: Partial<TodoInput>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  currentFilter: FilterItem["id"];
  setCurrentFilter: (filter: FilterItem["id"]) => void;
  filters: FilterItem[];
}

export interface FilterItem {
  id: "ALL" | "PENDING" | "COMPLETED";
  label: string;
}
