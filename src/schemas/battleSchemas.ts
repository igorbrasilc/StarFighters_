import joi from 'joi';

export const battlePlayers = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required()
})