import { CustomError } from './custom-err.class';

export const handleError = (error: any): {error: string} => {
  if (error instanceof CustomError) {
    return { error: error.message };
  } else { return { error: 'An unknown server error has occurred.' }; }
};
