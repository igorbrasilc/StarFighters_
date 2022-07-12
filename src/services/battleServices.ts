import axios from 'axios';
import { ResultAndUsers, User, Result, Query } from '../types/applicationTypes.js';
import battleRepository from '../repositories/battleRepository.js';
import { Response } from 'express';
import { QueryConfig } from 'pg';

const API = 'http://api.github.com';

async function lookForUsers(firstUser: string, secondUser: string) {

    const firstUserSearch = await axios.get<User[]>(`${API}/users/${firstUser}/repos`);
    const secondUserSearch = await axios.get<User[]>(`${API}/users/${secondUser}/repos`);

    return {
        firstUser: firstUserSearch.data,
        secondUser: secondUserSearch.data
    };
}

async function countStars(users: User[]) {
    let count = 0;

    users.forEach(repo => count += repo.stargazers_count);

    return {
        username: users[0].owner.login,
        count
    };
}

async function fightUsers(firstUser: User, secondUser: User) {

    let resultObject: Result = {
        winner: null,
        loser: null,
        draw: true
    };

    if (firstUser.count > secondUser.count) {
        resultObject.winner = firstUser.username;
        resultObject.loser = secondUser.username;
        resultObject.draw = false;
    }

    if (firstUser.count < secondUser.count) {
        resultObject.winner = secondUser.username;
        resultObject.loser = firstUser.username;
        resultObject.draw = false;
    }

    return {
        firstUser: firstUser.username,
        secondUser: secondUser.username,
        result: resultObject
    };
}

async function insertResultToDb(resultAndUsers: ResultAndUsers) {
    const firstUserCheck: Query = await battleRepository.searchUserInDb(resultAndUsers.firstUser);
    const secondUserCheck: Query = await battleRepository.searchUserInDb(resultAndUsers.secondUser);

    if (resultAndUsers.result.winner === resultAndUsers.firstUser) {
        if (firstUserCheck.rows.length === 0) {
            await battleRepository.insertFighter(resultAndUsers.firstUser, 'win');
        } else {
            await battleRepository.updateFighter(resultAndUsers.firstUser, 'wins', firstUserCheck.rows[0].wins + 1);
        }

        if (secondUserCheck.rows.length === 0) {
            await battleRepository.insertFighter(resultAndUsers.secondUser, 'loss');
        } else {
            await battleRepository.updateFighter(resultAndUsers.secondUser, 'losses', secondUserCheck.rows[0].losses + 1);
        }

        return;
    }

    if (resultAndUsers.result.winner === resultAndUsers.secondUser) {
        if (firstUserCheck.rows.length === 0) {
            await battleRepository.insertFighter(resultAndUsers.firstUser, 'loss');
        } else {
            await battleRepository.updateFighter(resultAndUsers.firstUser, 'losses', firstUserCheck.rows[0].losses + 1);
        }

        if (secondUserCheck.rows.length === 0) {
            await battleRepository.insertFighter(resultAndUsers.secondUser, 'win');
        } else {
            await battleRepository.updateFighter(resultAndUsers.secondUser, 'wins', secondUserCheck.rows[0].wins + 1);
        }

        return;
    }

    if (firstUserCheck.rows.length === 0) {
        await battleRepository.insertFighter(resultAndUsers.firstUser, 'draw');
    } else {
        await battleRepository.updateFighter(resultAndUsers.firstUser, 'draws', firstUserCheck.rows[0].draws + 1);
    }

    if (secondUserCheck.rows.length === 0) {
        await battleRepository.insertFighter(resultAndUsers.secondUser, 'draw');
    } else {
        await battleRepository.updateFighter(resultAndUsers.secondUser, 'draws', secondUserCheck.rows[0].draws + 1);
    }
}


const battleServices = {
    lookForUsers,
    countStars,
    fightUsers,
    insertResultToDb
}

export default battleServices;