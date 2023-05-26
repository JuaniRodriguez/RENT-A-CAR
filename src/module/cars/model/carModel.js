const {DataTypes,Model}=require("sequelize");

class CarModel extends Model {
    static setup(sequelize) {
        CarModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement:true,
                    allowNull:false,
                    primaryKey:true,
                    unique:true,    
                },
                brand:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                model:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                year:{
                    type: DataTypes.INTEGER,
                    allowNull:false,
                },
                kms:{
                    type: DataTypes.INTEGER,
                    allowNull:false,
                },
                color:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                ac:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                passengers:{
                    type: DataTypes.INTEGER,
                    allowNull:false,
                },
                transmission:{
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                picture:{
                    type: DataTypes.STRING,
                },
                price:{
                    type: DataTypes.INTEGER,
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
                modelName: 'car',
                tableName:'cars'
            }
        );
        return CarModel
    }
}

module.exports=CarModel;