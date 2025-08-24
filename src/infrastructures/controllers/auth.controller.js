import { createToken } from "../utils/createToken.js";

export class AuthController {
  constructor(userService) {
    this.userService = userService;
  }
  register = async (req, res, next) => {
    try {
      const createdUser = await this.userService.registerUser(req.body);
      if (!createdUser) {
        return res.status(409).json({ message: "Email already used" });
      }
      const { password, ...userResponse } = createdUser;
      res.status(201).json(userResponse);
    } catch (err) {
      next(err);
    }
  };
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.authenticate(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Здесь должна быть логика создания токена (JWT)
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = createToken(payload);
      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  };
  me = (req, res) => {
    res.json(req.user);
  };
}
