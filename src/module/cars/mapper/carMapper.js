const carEntity=require("../entity/carEntity.js")

function fromModelToEntity(car) {
    const {id,brand,model,year,kms,color,ac,passengers,transmission,picture,price,createdAt,updatedAt}=car
    return new carEntity(
        car.id,
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.color,
        car.ac,
        car.passengers,
        car.transmission,
        car.picture,
        car.price,
        car.createdAt,
        car.updatedAt
    )
}

module.exports={fromModelToEntity}