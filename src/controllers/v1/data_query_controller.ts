import { Request, Response } from "express";
import {findDataByQuery} from '../../handlers/data_query_handler';

const queryDataByName = async  (req: Request, res: Response) => {
    try {
      const value = req.query.value;
      const chefs = await findDataByQuery(value);
      res.json(chefs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

export {queryDataByName};