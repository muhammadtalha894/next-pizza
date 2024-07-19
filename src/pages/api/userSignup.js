import User from '@/components/models/user';
import db from '@/utils/db';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
export default async function signUpApi(req, res) {
  const { name, email, password, address } = req.body;
  let user;

  if (req.method === 'POST') {
    await db.connect();
    try {
      const hashpassword = await bcrypt.hash(password, await genSalt(10));
      user = new User({ name, email, password: hashpassword, address });
      await user.save();
    } catch (error) {
      console.log(error);
      db.disconnect();
      res.status(400).json({ success: false, message: error.message });
    }
  }

  let authToken = jwt.sign(user._id.toString(), process.env.SECRETKEYJWT);

  res.status(200).json({ success: true, authToken, isAdmin: user.isAdmin });
}
