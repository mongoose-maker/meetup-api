export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async registerUser(userData) {
    // 1. Проверяем, существует ли пользователь
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      return null; // Возвращаем null, чтобы контроллер понял причину
    }

    // 2. Создаем пользователя (хеширование пароля происходит в Sequelize hook'ах)
    const newUser = await this.userRepository.create(userData);
    return newUser;
  }
  async authenticate(email, password) {
    // 1. Находим пользователя по email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null; // Пользователь не найден
    }
    // 2. Используем доменную модель для сравнения пароля
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return null; // Пароль неверный
    }
    // 3. Убираем хеш пароля перед отправкой данных
    const { password: _, ...userResponse } = user;
    return userResponse;
  }
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}
