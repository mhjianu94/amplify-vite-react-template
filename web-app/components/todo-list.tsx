'use client';

import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2 } from 'lucide-react';

// Todo type definition
interface Todo {
  id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get API endpoint from amplify_outputs.json
const getApiUrl = async () => {
  if (typeof window === 'undefined') return '';
  
  try {
    // Load amplify_outputs.json
    const response = await fetch('/amplify_outputs.json');
    if (response.ok) {
      const outputs = await response.json();
      // API URL will be in outputs.api.url after deployment
      return outputs?.api?.url || outputs?.custom?.todosApiUrl || '';
    }
  } catch (error) {
    console.error('Error loading amplify_outputs.json:', error);
  }
  
  return process.env.NEXT_PUBLIC_API_URL || '';
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTodoContent, setNewTodoContent] = useState('');

  // Fetch todos from REST API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const apiUrl = await getApiUrl();
      if (!apiUrl) {
        console.error('API URL not configured. Deploy backend first.');
        setLoading(false);
        return;
      }

      const session = await fetchAuthSession();
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add API key or auth token if needed
          ...(session.tokens?.idToken && {
            Authorization: `Bearer ${session.tokens.idToken.toString()}`,
          }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create todo via REST API
  const createTodo = async () => {
    if (!newTodoContent.trim()) return;

    try {
      setCreating(true);
      const apiUrl = await getApiUrl();
      if (!apiUrl) {
        throw new Error('API URL not configured. Deploy backend first.');
      }

      const session = await fetchAuthSession();
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session.tokens?.idToken && {
            Authorization: `Bearer ${session.tokens.idToken.toString()}`,
          }),
        },
        body: JSON.stringify({ content: newTodoContent }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create todo');
      }

      setNewTodoContent('');
      await fetchTodos();
    } catch (error: any) {
      console.error('Error creating todo:', error);
      alert(error.message || 'Failed to create todo. Please check the console for details.');
    } finally {
      setCreating(false);
    }
  };

  // Delete todo via REST API
  const deleteTodo = async (id: string) => {
    try {
      const apiUrl = await getApiUrl();
      if (!apiUrl) {
        throw new Error('API URL not configured. Deploy backend first.');
      }

      const session = await fetchAuthSession();
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(session.tokens?.idToken && {
            Authorization: `Bearer ${session.tokens.idToken.toString()}`,
          }),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete todo');
      }

      await fetchTodos();
    } catch (error: any) {
      console.error('Error deleting todo:', error);
      alert(error.message || 'Failed to delete todo. Please check the console for details.');
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
        <CardDescription>Manage your todos with AWS Amplify REST API</CardDescription>
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
