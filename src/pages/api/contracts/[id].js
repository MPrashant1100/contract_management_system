import dbConnect from '../../../lib/mongodb';
import Contract from '../../../models/Contract';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const contract = await Contract.findById(id);
        if (!contract) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: contract });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const contract = await Contract.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!contract) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: contract });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedContract = await Contract.deleteOne({ _id: id });
        if (!deletedContract) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

