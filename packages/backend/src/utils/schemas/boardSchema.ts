import Joi, { NumberSchema, StringSchema } from "joi";

const idSchema : NumberSchema =  Joi.number();
const boardNameSchema : StringSchema =  Joi.string().max(100);
const boardDescriptionSchema : StringSchema =  Joi.string().max(2000);

const boardIdSchema = {
    boardId: idSchema.required(),
}

const createBoardSchema = {
    name: boardNameSchema.required(),
    description: boardDescriptionSchema.required()
}

const updateBoardSchema = {
    name: boardNameSchema.optional(),
    description: boardDescriptionSchema.optional(),
}

export {
    boardIdSchema,
    createBoardSchema,
    updateBoardSchema
}