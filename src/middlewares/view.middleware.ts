import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ViewMiddleware {
    use(req: any, res: any, next: () => void) {
        res.locals.funcionario = req.session?.funcionario || null;
        next();
    }
}