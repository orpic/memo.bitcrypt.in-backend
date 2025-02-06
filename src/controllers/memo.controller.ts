import { Request, Response } from 'express';
import { asyncErrorHandler } from '../utils/wrapper';

class MemoController {
  public createMemo = asyncErrorHandler(async (req: Request, res: Response) => {
    console.log('Request: ', req.body);
    res.status(200).send('POST /');
  });

  public getAllMemo = asyncErrorHandler(async (req: Request, res: Response) => {
    console.log('Request: ', req.body);
    res.status(200).send('POST /');
  });

  public getMemo = asyncErrorHandler(async (req: Request, res: Response) => {
    console.log('Request: ', req.body);
    res.status(200).send('POST /');
  });

  public editMemo = asyncErrorHandler(async (req: Request, res: Response) => {
    console.log('Request: ', req.body);
    res.status(200).send('POST /');
  });

  public softDeleteMemo = asyncErrorHandler(async (req: Request, res: Response) => {
    console.log('Request: ', req.body);
    res.status(200).send('POST /');
  });
}

export default MemoController;
