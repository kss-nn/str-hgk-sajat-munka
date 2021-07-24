const mongoose = require('mongoose');
const vaccineSchema = require('./vaccine.schema');
		
const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    vaccine: {
        count: Number,
        vaccine: {
            type: mongoose.Schema.Types.ObjectId,
            reference: vaccineSchema
        }
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);
