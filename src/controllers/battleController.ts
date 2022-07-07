import { AxiosError } from 'axios';
import express, { Request, Response } from 'express';
import battleRepository from '../repositories/battleRepository.js';
import battleServices from '../services/battleServices.js';
import { Query, Rows } from '../types/applicationTypes.js';

export async function returnBattle(req: Request, res: Response) {
    const firstUser: string = req.body.firstUser;
    const secondUser: string = req.body.secondUser;

    try {
        const usersToFight = await battleServices.lookForUsers(firstUser, secondUser);

        const starCountFirstUser = await battleServices.countStars(usersToFight.firstUser);
        const starCountSecondUser = await battleServices.countStars(usersToFight.secondUser);

        const fightResult = await battleServices.fightUsers(starCountFirstUser, starCountSecondUser);

        await battleServices.insertResultToDb(fightResult);

        res.status(200).send(fightResult.result); 
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function returnRanking(req: Request, res: Response) {
    const ranking: Query = await battleRepository.getRanking();

    const objToSend = {fighters: ranking.rows};

    res.status(200).send(objToSend);
}