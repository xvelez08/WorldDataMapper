const { model, Schema, ObjectId } = require('mongoose');
const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
        capital: {
			type: String,
			required: true
		},
        leader: {
			type: String,
			required: true
		},	flag: {
			type: String,
			required: false
		},
        landmarks: {
			type: [String],
			required: false
		},
        subregions: {
            //Cannot make Region list here, instead maybe IDs of regions will suffice. 
			type: [String],
			required: false
		}
	},
	{ timestamps: true }
);
const Region = model('Region', regionSchema);
module.exports = Region;