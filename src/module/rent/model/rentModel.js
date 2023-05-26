const {DataTypes,Model}=require("sequelize");

class RentModel extends Model {
    static setup(sequelize) {
        RentModel.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    autoIncrement:true,
                    allowNull:false,
                    primaryKey:true,
                    unique:true,  
                },
                /*
                fk_car: {
                    type:DataTypes.STRING,
                    allowNull:false,
                    references: {
                        model: "car",
                        key:"id",
                    },
                },
                fk_user: {
                    type:DataTypes.STRING,
                    allowNull:false,
                    references: {
                        model:"users",
                        key:"id",
                    },
                },*/
                startDate: {
                    type:DataTypes.TEXT,
                    allowNull:false,
                },
                finishDate:{
                    type:DataTypes.TEXT,
                    allowNull:false,
                },
                pricePerDay: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                },
                totalPrice: {
                    type:DataTypes.INTEGER,
                    allowNull:false,
                },
                payingMethod: {
                    type:DataTypes.STRING,
                    allowNull:false,
                },
                isPaid:{
                    type:DataTypes.BOOLEAN,
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
                modelName:'rent',
                tableName:'rents'
            }
        );
        return RentModel
    }

    static setupAssociations(CarModel,UserModel) {
        CarModel.hasMany(RentModel,{foreignKey:"fk_car"})//porque un auto puede ser reservado varias veces(aunque habria que chequear que no la misma fecha)
        RentModel.belongsTo(CarModel,{foreignKey:"fk_car"})
        UserModel.hasMany(RentModel,{foreignKey:"fk_user"})
        RentModel.belongsTo(UserModel,{foreignKey:"fk_user"})

    }
    
}

module.exports=RentModel