export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async registerUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      return null;
    }
    const newUser = await this.userRepository.create(userData);
    return newUser;
  }
  async authenticate(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null;
    }
    const { password: _, ...userResponse } = user;
    return userResponse;
  }
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}
