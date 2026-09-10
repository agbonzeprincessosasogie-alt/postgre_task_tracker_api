const AppDataSource = require("../config/data-source");

const userRepository = AppDataSource.getRepository("User");

const findUserByEmail = async(email) => {
    return await userRepository.findOneBy({
        email
    });
};

const findUserById = async(id) => {
    return await userRepository.findOne({
        where: {
            id: Number(id)
        },
        relations: {
            tasks: true
        }
    });
};

const createUser = async(userData) => {
    const user = userRepository.create(userData);

    return await userRepository.save(user);
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
};