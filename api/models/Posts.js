const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: {type: String}, 
    value: {type: String},
    cover: {type: String},
    likes: {
        count: { type: Number, default: 0 },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      },
    author: {type:Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true
});

const PostModel = model('Post', PostSchema); 

module.exports = PostModel;