import express from 'express';
import jwt from 'jsonwebtoken';
import { authentication } from '../middlewares/autenticacion';

const router = express.Router();

router.use(express.json());

router.post('/api/token', (req, res) => {
  const user = req.body;

  const token = jwt.sign({
    username: user.username,
    email: user.email,
  }, 'secret', {
    expiresIn: '1h',
  });

  res.json({
    token,
  });
});

router.get('/api/protected', authentication);

router.get('/api/protected', (req, res) => {
  res.json({
    message: 'Welcome to the protected route',
  });
});

module.exports = router;