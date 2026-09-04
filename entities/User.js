const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",

    tableName: "users",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },

        email: {
            type: "varchar",
            unique: true
        },

        password: {
            type: "varchar"
        }
    },

    relations: {
        tasks: {
            type: "one-to-many",
            target: "Task",
            inverseSide: "user"
        }
    }
});

module.exports = User;