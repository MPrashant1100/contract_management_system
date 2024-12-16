import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide a client name'],
    maxlength: [60, 'Client name cannot be more than 60 characters'],
  },
  status: {
    type: String,
    required: [true, 'Please specify the contract status'],
    enum: ['Draft', 'Finalized'],
    default: 'Draft',
  },
  content: {
    type: String,
    required: [true, 'Please provide contract content'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema);

