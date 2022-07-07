import db from '../config/database.js';
import { ResultAndUsers } from '../types/applicationTypes.js';

async function insertFighter(user: string, condition: string) {
    return db.query(`
    INSERT INTO fighters
    (username, wins, losses, draws)
    VALUES ($1, $2, $3, $4)
    `, [user, condition === 'win' ? 1 : 0, condition === 'loss' ? 1 : 0, condition === 'draw' ? 1 : 0])
}

async function updateFighter(user: string, condition: string, count: number) {
    return db.query(`
    UPDATE fighters
    SET ${condition} = $1
    WHERE username = $2
    `, [count, user]);
}

async function searchUserInDb(user: string) {
    return db.query(`
    SELECT * FROM fighters WHERE username = $1
    `, [user]);
}

async function getRanking() {
    return db.query(`
    SELECT * FROM fighters
    ORDER BY wins, draws DESC
    `);
}

const battleRepository = {
    searchUserInDb,
    insertFighter,
    updateFighter,
    getRanking
}

export default battleRepository;