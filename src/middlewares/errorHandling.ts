import express, { Request, Response } from 'express';

export default function errorHandling(error: any, req: Request, res: Response, next: Function) {
    if (error.type === 'notFound') return res.sendStatus(404);
    
    return res.sendStatus(500);
}