const userEntity=require('../entity/userEntity.js')

function fromModelToEntity(user) {
    const {id,name,lastName,documentType,documentNumber,country,address,phone,email,birthDate}=user;

    return new userEntity (
        user.id,
        user.name,
        user.lastName,
        user.documentType,
        user.documentNumber,
        user.country,
        user.address,
        user.phone,
        user.email,
        user.birthDate
    )
}

module.exports={fromModelToEntity}
