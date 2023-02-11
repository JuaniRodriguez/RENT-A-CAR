module.exports=class usersService {
    constructor(usersRepository) {
        this.usersRepository=usersRepository
    }

    async getAllUsers() {
        return this.usersRepository.getAllUsers()
    }
    async createUser(data) {
        return this.usersRepository.addUser(data)
    }

    async editUser(userData) {
        return await this.usersRepository.editUser(userData)
    }

    async deleteUser(id) {
        return await this.usersRepository.deleteUser(id)
    }

    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }

} 