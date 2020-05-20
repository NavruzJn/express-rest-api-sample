import UserModel from '../models/user';

class Users {
  async signUp(req, res) {
      const {name, username, email, password} = req.body;

      const newUser = await UserModel.create({
          name,
          username,
          email,
          password
      });

      return res.status(201).send({
          success: true,
          message: 'User successfully created',
          newUser
      })
  }

    async signIn(req, res) {
        const {username, password} = req.body;

        const newUser = await UserModel.findOne({
            username,
            password
        });

        return res.status(201).send({
            success: true,
            message: 'User successfully created',
            newUser
        })
    }
}

export default Users;