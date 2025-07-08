import Joi, { NumberSchema, StringSchema } from "joi";

const idSchema :  NumberSchema = Joi.number();
const nameSchema : StringSchema = Joi.string().max(200);
const descriptionSchema : StringSchema = Joi.string().max(2000);
const iconSchema : StringSchema = Joi.string().max(2);
const statusSchema : StringSchema = Joi.string().valid('TO_DO', 'IN_PROGRESS', 'COMPLETED', 'WONT_DO');

const taskIdSchema = {
    taskId: idSchema.required(),
}

const createTaskSchema = {
    boardId: idSchema.required(),
    name: nameSchema.required(),
    description: descriptionSchema.optional(),
    icon: iconSchema.required(),
    status: statusSchema.required(),
}

const updateTaskSchema = {
    boardId: idSchema.optional(),
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    icon: iconSchema.optional(),
    status: statusSchema.optional(),
}

export {
    taskIdSchema,
    createTaskSchema,
    updateTaskSchema,
}