export class UserRepository {
    async create (userData) {
        throw new Error("Method 'create()' must be implemented.")
    }
    async findByEmail(email) {
        throw new Error("Method 'findByEmail()' must be implemented.")
    }
    async findById (id) {
        throw new Error("Method 'findById()' must be implemented.")
    }
};