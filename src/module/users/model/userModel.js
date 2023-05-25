const {DataTypes,Model}=require("sequelize");

class UserModel extends Model {
    static setup(sequelize) {
        UserModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement:true,
                    allowNull:false,
                    primaryKey:true,
                    unique:true,    
                },
                name:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                surname:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                phone:{
                    type: DataTypes.INTEGER,
                    allowNull:false,
                },
                email:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                nacionality:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                birthDate:{
                    type: DataTypes.STRING,
                },
                documentType:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                documentNumber:{
                    type: DataTypes.INTEGER,
                    allowNull:false,
                },
                address:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                createdAt:{
                    type: DataTypes.DATE,
                },
                updatedAt:{
                    type: DataTypes.DATE,
                    
                },
            },
            {
                sequelize,
                modelName: 'User',
            }
        );
        return UserModel
    }
}

module.exports=UserModel;