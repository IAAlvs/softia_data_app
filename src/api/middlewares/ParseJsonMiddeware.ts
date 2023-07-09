import { injectable, inject} from 'inversify';
import { Request, Response, NextFunction } from 'express';

@injectable()
//@middleware()
export class ExampleMiddleware {
  constructor() {}

  public handler(req: Request, res: Response, next: NextFunction): void {
    // Middleware logic goes here
    console.log('Example middleware executed');
    next();
  }
}
