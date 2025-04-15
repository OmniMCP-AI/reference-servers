import React, { useState } from "react";
import Todo from "../components/Todo";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  starred: boolean;
}

const TodoPage: React.FC = () => {
  // Track statistics about todos
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    starred: 0,
  });

  // Handle todos change from Todo component
  const handleTodoChange = (todos: TodoItem[]) => {
    setTodoStats({
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      starred: todos.filter((todo) => todo.starred).length,
    });
  };

  return (
    <main className="px-8 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#202224] -tracking-[0.11px] mb-6">
        To-Do List
      </h1>

      {/* Stats Display */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <p className="text-2xl font-bold">{todoStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {todoStats.completed}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Starred</p>
          <p className="text-2xl font-bold text-yellow-500">
            {todoStats.starred}
          </p>
        </div>
      </div>

      {/* Todo Component */}
      <Todo onTodoChange={handleTodoChange} />
    </main>
  );
};

export default TodoPage;
