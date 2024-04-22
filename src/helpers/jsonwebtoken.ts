import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { autenticacion } from '../middlewares/autenticacion';

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


router.get('/api/protected', autenticacion);

router.get('/api/protected', (req, res) => {
  res.json({
    message: 'Welcome to the protected route',
  });
});

module.exports = router;