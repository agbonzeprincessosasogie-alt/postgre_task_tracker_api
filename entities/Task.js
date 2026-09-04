const { EntitySchema } = require("typeorm");

const Task = new EntitySchema({
    name: "Task",

    tableName: "tasks",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },

        title: {
            type: "varchar"
        },

        description: {
            type: "text",
            nullable: true
        },

        completed: {
            type: "boolean",
            default: false
        }
    },

    relations: {
        user: {
            type: "many-to-one",

            target: "User",

            joinColumn: true,

            nullable: false,

            onDelete: "CASCADE"
        }
    }
});

module.exports = Task;