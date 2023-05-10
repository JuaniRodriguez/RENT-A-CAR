const userEntity=require('../entity/userEntity.js')

function fromModelToEntity(user) {
    const {id,name,surname,documentType,documentNumber,nacionality,address,phone,email,birthDate}=user;

    return new userEntity (
        user.id,
        user.name,
        user.surname,
        user.documentType,
        user.documentNumber,
        user.nacionality,
        user.address,
        user.phone,
        user.email,
        user.birthDate
    )
}

module.exports={fromModelToEntity}
