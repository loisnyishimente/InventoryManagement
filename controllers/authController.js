const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: role || 'Staff', // Default role
        });

        const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request with:', email, password);
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Ensure you are using 'token' here and not 'generatedToken'
      return res.json({
        token,    // Use the correct variable name
        role: user.role,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  

exports.resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

        await user.save();

        // Send reset email with the token
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        await mailer.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });

        res.status(200).json({ msg: 'Password reset email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: ${resetLink}`,
        });

        res.json({ msg: 'Password reset email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({ where: { resetPasswordToken: token } });
        if (!user || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ msg: 'Password has been reset' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};