const {fromModelToEntity}=require('../mapper/rentMapper.js')
const carsModel=require('../../cars/model/carModel.js')
const usersModel=require('../../users/model/userModel.js')
module.exports= class rentsRepository {
    constructor(rentModel) {
       this.rentModel=rentModel
    }

    async getAllRents() {
        console.error("entro")
        const rents=await this.rentModel.findAll(/*{
        //    include:[
        //        {model:'car'},
        //        {model:'user'},
        //    ],
        }*/);
        //return rents
        return rents.map(rent=>fromModelToEntity(rent))
    }

    async addRent(rentData) {
        await this.rentModel.create(rentData)
        return fromModelToEntity(rentData) 
    }

    editRent(rentData) {
        const updateRent=`UPDATE ${this.tableName} SET
            fk_car=${rentData.car},
            fk_user=${rentData.user},
            startDate='${rentData.startDate}',
            finishDate='${rentData.finishDate}',
            totalDays=${rentData.totalDays}
            WHERE id=${rentData.id}
        `
        
        return this.database.prepare(updateRent).run()
    }

    async deleteRent(rentId) {

        await this.rentModel.destroy({
            where: {
                id:rentId
            }
        })
    }

    async getRentById(id) {

        const rent=await this.rentModel.findByPk(id);
        return fromModelToEntity(rent)
    }

}