import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  const navigate = useNavigate();
      const goToSignUp = () => {
      navigate('/signup');
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem('token', data.token);

        if (!response.ok) {
          alert("Invalid username or password");
          throw new Error('Network response was not ok ' + response.statusText);
          
        }
  
        else{
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        alert("Login successfully");
        navigate('/')
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Failed to login');
      }
    };
  
  return (
    <>
     <div className="flex items-center justify-center min-h-screen p-5">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-white max-w-sm p-5 rounded-3xl">
        <h2 className="relative flex items-center text-cyan-400 text-2xl font-semibold pl-8">
          Welcome Back!  
          <span className="before:content-[''] before:absolute before:h-4 before:w-4 before:rounded-full before:bg-cyan-400 before:left-0 after:content-[''] after:absolute after:h-5 after:w-5 after:rounded-full after:bg-cyan-400 after:left-0 animate-ping"></span>
        </h2>
        <p className="text-gray-400 text-sm font-normal mt-2 text-center">
        Please Login to continue.
        </p>
        <div className="flex gap-2 mt-4">
          <label className="flex-1">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="bg-gray-700 text-white border border-gray-400 rounded-lg text-base p-4 outline-none w-full mb-4 placeholder-gray-500"
            />
          </label>
        </div>
        <label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="bg-gray-700 text-white border border-gray-400 rounded-lg text-base p-4 outline-none w-full mb-4 placeholder-gray-500"
          />
        </label>
        <button type="submit" className="border-none bg-cyan-400 mt-2 outline-none p-3 rounded-lg text-white text-lg w-full hover:bg-cyan-500">
          Login
        </button>
        <p className="text-gray-400 text-sm font-normal mt-2 text-center">
          Do not have an account?{' '}
          <button className="rounded-full ..." onClick={goToSignUp}>SignUp</button>
        </p>
      </form>
    </div>
    <div>  {message && <p>{message}</p>}</div>
    </>
  );
}

export default Login  