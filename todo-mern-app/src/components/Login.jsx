import axios from 'axios';

function Login() {
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        username: 'test',
        password: 'test',
      });

      console.log(response.data); 
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
