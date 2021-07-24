const mongoose = require('mongoose');
		
const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    vaccine: {
        count: Number,
        vaccine: {
            type: mongoose.Schema.Types.ObjectId,
            reference: 'Vaccine'
        }
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
