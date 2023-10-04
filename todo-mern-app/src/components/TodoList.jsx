import axios from 'axios';

function TodoList() {
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todo', {
        headers: { 'auth-token': 'YOUR_JWT_TOKEN' }
      });

      console.log(response.data);
    } catch (error) {
      console.error("Fetching todos failed:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      <button onClick={fetchTodos}>Fetch Todos</button>
    </div>
  );
}

export default TodoList;
