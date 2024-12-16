import dbConnect from '../../../lib/mongodb';
import Contract from '../../../models/Contract';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const { status, clientName, id, page = 1, limit = 10 } = req.query;
      const query = {};

      if (status) query.status = status;
      if (clientName) query.clientName = { $regex: clientName, $options: 'i' };
      if (id) query._id = id;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const contracts = await Contract.find(query)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Contract.countDocuments(query);

      res.status(200).json({ 
        success: true, 
        data: contracts, 
        total, 
        page: parseInt(page), 
        limit: parseInt(limit) 
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

