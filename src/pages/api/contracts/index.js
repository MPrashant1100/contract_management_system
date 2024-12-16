import dbConnect from '../../../lib/mongodb';
import Contract from '../../../models/Contract';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const contracts = await Contract.find({})
          .skip(skip)
          .limit(limit);
        const total = await Contract.countDocuments({});

        res.status(200).json({ success: true, data: contracts, total, page, limit });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const contract = await Contract.create(req.body);
        res.status(201).json({ success: true, data: contract });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

