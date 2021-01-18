import { Request, Response, Router } from 'express';
import Controller from '../../interfaces/Controller';
import auth from '../../middleware/auth';

import listModel from '../../models/List';

class ReportController implements Controller {
    public path = '/report';
    public router = Router();
    private list = listModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.generateReport);
    }

    private generateReport = async (req: Request, res: Response) => {

    let { date1, date2 } = req.body;

        const ListbyTimePeriod = await this.list.aggregate([
            {
                $match: { createdAt: { $gte: date1, $lte: date2 } }
            },
            {
                $group: { _id: '$Products[0]', Quantity: { $sum: '$Products[1]' } }
            }
        ]);
        res.send({ListbyTimePeriod});
    };
}
export default ReportController;