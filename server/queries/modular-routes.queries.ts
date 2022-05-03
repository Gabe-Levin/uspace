import { prisma } from '../prisma/prisma-client';

export const getAllEntriesQuery = async (tableName: string): Promise<any[]> => {
// @ts-ignore
  const dbEntries = await prisma[tableName].findMany();
  // For each table, loop through elements to change not camel cased property names to camel cased ones
  // (not camel cased in DB, camel cased as per linting rules)

  return dbEntries;
};

export const getUniqueEntryQuery = async (tableName: string, id: string): Promise<any> => {
  // @ts-ignore
  const dbEntry = await prisma[tableName].findUnique({
    where: {
      id: +id // parsed string
    }
  });
  return dbEntry;
};
