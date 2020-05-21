import UserModel from '../models/user';
import JwtMiddleware from '../middleware/auth';

class Users {
  static async signUp(req, res) {
      const {name, username, email, password} = req.body;

      const newUser = await UserModel.create({
          name,
          username,
          email,
          password
      });

      if (newUser) {
          const token = JwtMiddleware.getToken(newUser.id, username);
          return res.send(201).json({
              success: true,
              message: 'User created!',
              token: token
          });
      } else {
          return res.send(403).json({
              success: false,
              message: 'Invalid Credentials'
          });
      }
  }

    static async signIn(req, res) {
        const {username, password} = req.body;

        const user = await UserModel.findOne({
            username,
            password
        });

        if (user) {
            const token = JwtMiddleware.getToken(user.id, username);
            return res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            return res.send(403).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
    }
}

export default Users;