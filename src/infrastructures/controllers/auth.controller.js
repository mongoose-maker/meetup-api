export class AuthController {
  constructor(userServices) {
    this.userServices = userServices;
  }
  register = async (req, res, next) => {
    try {
      if (await this.userServices.findByEmail(req.body.email)) {
        return res.status(409).json({ message: "email already used" });
      }
      const created = await this.userServices.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };
  login = async (req, res, next) => {
    try {
      const user = await this.userServices.findByEmailWithPassword(
        req.body.email
      );
      if (!user || !(await user.comparePassword(req.body.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  };
  me = (req, res) => res.json(req.user);
}
