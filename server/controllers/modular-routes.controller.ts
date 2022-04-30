import { returnAllEntries, returnEntryById } from '../models/modular-routes.model';
import { Response, Request } from 'express';

// modular route: returns all entries in a table
const getAllEntries = async (req: Request, res: Response): Promise<void> => {
  try {
    // pass route (table name) and remove '/' in the end
    const entries = await returnAllEntries(req.path.slice(1, -1));
    res.status(200);
    res.send(entries);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};

// modular route: returns single entry in a table by id
const getSingleEntryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // pass route param, cut off plural and '/' on front and beginning
    const entry = await returnEntryById(req.path, req.params.id);
    res.status(200);
    res.send(entry);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify(error));
  }
};
module.exports = { getAllEntries, getSingleEntryById };
