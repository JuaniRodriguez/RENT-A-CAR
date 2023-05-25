const {fromModelToEntity}=require('../mapper/userMapper.js')
module.exports=class UsersRepository {
    constructor(userModel) {
        this.userModel=userModel;
    }

    async getAllUsers() {
        const users=await this.userModel.findAll();
        return users.map(user=>fromModelToEntity(user))
    }

    async addUser(userData) {//tengo que chequear si ya existe el id
        await this.userModel.create(userData)
        return fromModelToEntity(userData) 
        
    }

    async editUser(userData) {

        await this.userModel.update(userData,{
            where: {
                id:userData.id
            }
        })
    }

    async deleteUser(userId) {

        await this.userModel.destroy({
            where: {
                id:userId
            }
        })
        
    }

    async getUserById(id) {
        
        const user=await this.userModel.findByPk(id);
        return fromModelToEntity(user)
    }
}
