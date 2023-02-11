module.exports=class usersService {
    constructor(usersRepository) {
        this.usersRepository=usersRepository
    }

    async getUsers() {
        return this.usersRepository.getAllUsers()
    }
    async createUser() {
        return this.usersRepository.addUser()
    }

    async editUser(UserData) {
        return await this.UsersRepository.editUser(UserData)
    }

    async deleteUser(id) {
        return await this.UsersRepository.deleteUser(id)
    }

    async getUserById(id) {
        return await this.UsersRepository.getUserById(id);
    }

} 