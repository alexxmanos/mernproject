import axios from 'axios';

function Register() {
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        username: 'test',
        password: 'test',
      });

      console.log(response.data);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
