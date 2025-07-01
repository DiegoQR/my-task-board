import Joi, { NumberSchema, StringSchema } from "joi";

const idSchema :  NumberSchema = Joi.number();
const nameSchema : StringSchema = Joi.string().max(200);
const descriptionSchema : StringSchema = Joi.string().max(2000);
const iconSchema : StringSchema = Joi.string().max(1);
const statusSchema : StringSchema = Joi.string().valid('TO_DO', 'IN_PROGRESS', 'COMPLETED', 'WONT_DO');

const taskIdSchema = {
    taskId: idSchema.required(),
}

const createTaskSchema = {
    userId: idSchema.required(),
    name: nameSchema.required(),
    description: descriptionSchema.optional(),
    iconSchema: iconSchema.required(),
    statusSchema: statusSchema.required(),
}

const updateBoardSchema = {
    userId: idSchema.optional(),
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
    iconSchema: iconSchema.optional(),
    statusSchema: statusSchema.optional(),
}

export {
    taskIdSchema,
    createTaskSchema,
    updateBoardSchema,
}