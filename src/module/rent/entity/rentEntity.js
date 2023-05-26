const { update } = require("../../cars/model/carModel");

module.exports=class Rent {
    constructor(id,carId,userId,startDate,finishDate,pricePerDay,totalPrice,payingMethod,isPaid,createdAt,updatedAt) {
        this.id=id,
        this.carId=carId,
        this.userId=userId
        this.startDate=startDate,
        this.finishDate=finishDate,
        this.pricePerDay=pricePerDay,
        this.totalPrice=totalPrice,
        this.payingMethod=payingMethod,
        this.isPaid=isPaid,
        this.createdAt=createdAt,
        this.updatedAt=updatedAt
    }
}
