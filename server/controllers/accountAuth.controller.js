const { generateToken, hashPassword, comparePassword } = require('../utils/jwtBcryptMethods.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required: name, email, password, role' });
    }
   
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

  
    if (!['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either USER or ADMIN' });
    }

    
    const existing = await prisma.account.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPwd = await hashPassword(password);

    const account = await prisma.account.create({
      data: {
        name,
        email,
        password: hashedPwd,
        role
      }
    });

    const token = generateToken(account);

    res.status(200).json({
      id: account.id,
      email: account.email,
      role: account.role,
      token
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password ,role} = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, role and password are required' });
    }

    const account = await prisma.account.findFirst({
      where: { email,role }
    });

    if (!account) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(account);

    res.status(200).json({
      id: account.id,
      email: account.email,
      role: account.role,
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error during login' });
  }
};
