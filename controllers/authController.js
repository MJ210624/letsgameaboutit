const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (userExists) {
      return res.send("Usuário ou email já cadastrado");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashPassword
    });

    res.send("Usuário cadastrado com sucesso!");

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro interno");
  }
};


const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.send("Senha incorreta");
    }

    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.redirect("/");

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao fazer login");
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};

