const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name_pr: { type: String, required: true },
    category_pr_tag: { type: String, required: true },
    price_pr: { type: Number, required: true },
    image_pr_1: { type: String },
    description_pr: { type: String, required: true },
    description_pr_detail: { type: String, required: true },
    discount_pr: { type: Number },
    quantity_pr: { type: Number, required: true },
    view_pr: { type: Number },
    weight_pr: { type: Number, required: true },
    sale_pr: { type: Number },
    rating_pr: { type: Number },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    stoke_pr: { type: Number },
});

module.exports = mongoose.model('products', productsSchema);
