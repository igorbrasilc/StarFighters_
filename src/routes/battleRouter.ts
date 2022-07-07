import express from "express";
import { returnBattle, returnRanking } from '../controllers/battleController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { battlePlayers } from '../schemas/battleSchemas.js';

const battleRouter = express();

battleRouter.post('/battle', validateSchema(battlePlayers), returnBattle);
battleRouter.get('/ranking', returnRanking);

export default battleRouter;
