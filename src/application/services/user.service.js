import { User } from "../../core/models/user.model.js";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../../infrastructures/config/constants.js";

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async registerUser(userData) {
    // Хеширование пароля - это логика приложения, а не домена
    const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_ROUNDS);

    const createUserData = {
      ...userData,
      password: hashedPassword,
    };
    return this.userRepository.create(createUserData);
  }
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
  // Метод для аутентификации может выглядеть так
  async authenticate(email, password) {
    const userModel = await this.userRepository.findByEmail(email);
    if (!userModel) {
      return null;
    }
    // Создаем экземпляр доменной модели, чтобы использовать ее логику
    const user = new User(
      userModel.id,
      userModel.username,
      userModel.email,
      userModel.password,
      userModel.role
    );

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...userData } = user;
    return userData;
  }
}
