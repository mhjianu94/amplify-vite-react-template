'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const client = generateClient<Schema>();

export function TodoList() {
  const [todos, setTodos] = useState<Schema['Todo']['type'][]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await client.models.Todo.list();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const createTodo = async () => {
    if (!newTodoContent.trim()) return;

    try {
      setCreating(true);
      await client.models.Todo.create({
        content: newTodoContent,
      });
      setNewTodoContent('');
      await fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo. Please check the console for details.');
    } finally {
      setCreating(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      await client.models.Todo.delete({ id });
      await fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please check the console for details.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading todos...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>Manage your todos with AWS Amplify</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create Todo Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && createTodo()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={creating}
          />
          <Button onClick={createTodo} disabled={creating || !newTodoContent.trim()}>
            {creating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No todos yet. Create one above!
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <span className="flex-1">{todo.content || 'Untitled'}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

