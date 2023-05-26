const rentEntity=require("../entity/rentEntity.js")

function fromModelToEntity(rent) {
    
    //agregar ahi arriba id,etc.
    return new rentEntity(
        rent.id,
        rent.fk_car,
        rent.fk_user,
        rent.startDate,
        rent.finishDate,
        rent.pricePerDay,
        rent.totalPrice,
        rent.payingMethod,
        rent.isPaid,
        rent.createdAt,
        rent.updatedAt
    )
}

module.exports={fromModelToEntity}