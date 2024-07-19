import User from '@/components/models/user';
import db from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function userLogin(req, res) {
  const { password, email } = req.body;
  let user;
  if ((!password, !email)) {
    res.status(400).json({
      success: true,
      message: 'Please fill out the necessary fields!',
    });
  }
  try {
    await db.connect();
    user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found!' });
    }
    const verifypass = await bcrypt.compare(password, user.password);
    console.log(verifypass);
    if (!verifypass) {
      res
        .status(404)
        .json({ success: false, message: 'Invalid email or password!' });
    }
  } catch (error) {
    console.log(error);
    db.disconnect();
    res.status(400).json({ success: false, message: error.message });
  }
  let authToken = jwt.sign(user._id.toString(), process.env.SECRETKEYJWT);

  res.status(200).json({ success: true, authToken });
}
