const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient_id: {
        type:String,
        required:true,
    },
    created_by: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
}, {
    timestamps: true
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;