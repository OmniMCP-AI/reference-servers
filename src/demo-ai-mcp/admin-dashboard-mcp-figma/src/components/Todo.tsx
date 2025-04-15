import React, { useState } from "react";

interface TodoProps {
  onTodoChange?: (todos: TodoItem[]) => void;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  starred: boolean;
}

const Todo: React.FC<TodoProps> = ({ onTodoChange }) => {
  // Initial todos from the design
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      text: "Meeting with CEO",
      completed: false,
      starred: false,
    },
    {
      id: 2,
      text: "Pick up kids from school",
      completed: false,
      starred: true,
    },
    {
      id: 3,
      text: "Shopping with Brother",
      completed: false,
      starred: false,
    },
    {
      id: 4,
      text: "Review with HR",
      completed: true,
      starred: false,
    },
    {
      id: 5,
      text: "Going to Dia's School",
      completed: false,
      starred: false,
    },
    {
      id: 6,
      text: "Check design files",
      completed: false,
      starred: true,
    },
    {
      id: 7,
      text: "Update File",
      completed: false,
      starred: false,
    },
  ]);

  const [newTodoText, setNewTodoText] = useState("");

  // Update parent component when todos change
  React.useEffect(() => {
    if (onTodoChange) {
      onTodoChange(todos);
    }
  }, [todos, onTodoChange]);

  // Add new todo
  const addTodo = () => {
    if (newTodoText.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      starred: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  // Toggle todo completion status
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Toggle todo star status
  const toggleStar = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, starred: !todo.starred } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle Enter key press in the new todo input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="todo-component">
      {/* Add New Task Button */}
      <div className="mb-6 flex">
        <button
          onClick={addTodo}
          className="add-task-button bg-[#4379EE] hover:bg-[#3668d8] text-white font-bold py-3 px-6 rounded-md"
        >
          Add New Task
        </button>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a new task here..."
          className="todo-input ml-4 flex-1 px-4 py-2 border border-[#D5D5D5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4379EE]/50"
        />
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item relative rounded-xl border ${
              todo.completed
                ? "bg-[#4880FF] text-white todo-completed"
                : "bg-[#FBFCFF] text-[#2E2E2E]"
            } border-[#D5D5D5] p-4 flex items-center transition-all hover:shadow-md`}
          >
            {/* Checkbox */}
            <div
              onClick={() => toggleComplete(todo.id)}
              className={`todo-checkbox w-6 h-6 rounded-md mr-4 flex-shrink-0 cursor-pointer border ${
                todo.completed
                  ? "bg-[#4880FF] border-white"
                  : "bg-[#FBFCFF] border-[#D5D5D5]"
              }`}
            >
              {todo.completed && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-white"
                >
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Todo Text */}
            <p
              className={`text-base font-semibold ${
                todo.completed ? "line-through text-white" : ""
              }`}
            >
              {todo.text}
            </p>

            {/* Controls */}
            <div className="flex items-center ml-auto">
              {/* Star Button */}
              {!todo.completed && (
                <button
                  onClick={() => toggleStar(todo.id)}
                  className="star-button w-6 h-6 mr-2"
                >
                  {todo.starred ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#888888"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className={`delete-button w-6 h-6 rounded-full flex items-center justify-center ${
                  todo.completed
                    ? "bg-[#6C99FF] hover:bg-[#5680e0]"
                    : "bg-[#FCFCFC] hover:bg-[#f0f0f0] border border-[#888888]"
                }`}
              >
                {todo.completed ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4H3.33333H14"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.33337 4.00001V2.66668C5.33337 2.31305 5.47385 1.97392 5.7239 1.72387C5.97395 1.47382 6.31308 1.33334 6.66671 1.33334H9.33337C9.68701 1.33334 10.0261 1.47382 10.2762 1.72387C10.5262 1.97392 10.6667 2.31305 10.6667 2.66668V4.00001M12.6667 4.00001V13.3333C12.6667 13.687 12.5262 14.0261 12.2762 14.2762C12.0261 14.5262 11.687 14.6667 11.3334 14.6667H4.66671C4.31308 14.6667 3.97395 14.5262 3.7239 14.2762C3.47385 14.0261 3.33337 13.687 3.33337 13.3333V4.00001H12.6667Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1L1 11"
                      stroke="#888888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L11 11"
                      stroke="#888888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
