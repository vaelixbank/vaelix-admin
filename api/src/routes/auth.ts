import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/v1/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;

  // Simulate a login process
  if (email === '   '&& password === 'password') {
    // In a real application, you would verify the credentials against a database
    const 
        token = 'fake-jwt-token'; // Simulated JWT token
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}); 