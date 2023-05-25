const userEntity=require('../entity/userEntity.js')

function fromModelToEntity(user) {
    const {id,name,surname,phone,email,nacionality,birthDate,documentType,documentNumber,address,createdAt,updatedAt}=user;

    return new userEntity (
        user.id,
        user.name,
        user.surname,
        user.phone,
        user.email,
        user.nacionality,
        user.birthDate,
        user.documentType,
        user.documentNumber,
        user.address,
        user.createdAt,
        user.updatedAt

    )
}

module.exports={fromModelToEntity}
