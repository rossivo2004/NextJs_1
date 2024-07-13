const mongoose = require('mongoose');
const productsModel = require('../model/productsModel');
const productsService = require('../services/products.service');

// Hàm lấy tất cả sản phẩm
async function getAllProduct(query) {
    let limit = parseInt(query.limit) || 9;
    let page = parseInt(query.page) || 1;
    let sortField = query.sortField || 'name_pr'; // Mặc định sắp xếp theo tên
    let sortOrder = query.sortOrder === 'desc' ? -1 : 1; // Mặc định sắp xếp tăng dần

    try {
        let queries = {};

        if (query.keyword) {
            queries.name_pr = { $regex: new RegExp(query.keyword, 'i') };
        }

        if (query.tagname) {
            queries.category_pr_tag = query.tagname;
        }

        if (query.minPrice || query.maxPrice) {
            queries.price_pr = {};
            if (query.minPrice) {
                queries.price_pr.$gte = parseInt(query.minPrice);
            }
            if (query.maxPrice) {
                queries.price_pr.$lte = parseInt(query.maxPrice);
            }
        }

        const products = await productsModel.find(queries)
            .sort({ [sortField]: sortOrder }) // Thêm sắp xếp
            .limit(limit)
            .skip((page - 1) * limit);

        const totalProducts = await productsModel.countDocuments(queries);
        const totalPages = Math.ceil(totalProducts / limit);

        const startPage = Math.max(1, page - 1);
        const endPage = Math.min(totalPages, page + 1);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return {
            products,
            currentPage: page,
            totalPages,
            totalProducts,
            pages
        };
    } catch (error) {
        console.log('Lỗi:', error);
        throw error;
    }
}



// Hàm lấy sản phẩm nổi bật
async function getProductsHot() {
    try {
        const result = await productsModel.find().sort({ view_pr: -1 }).limit(8);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// Hàm lấy sản phẩm theo id
async function getProductById(id) {
    try {
        const result = await productsModel.findById(id);

        if (!result) {
            throw new Error('Sản phẩm không tồn tại');
        }
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// Hàm lấy sản phẩm giảm giá bất kỳ
async function getDiscountedProducts() {
    try {
        const discountedProducts = await productsModel.aggregate([
            { $match: { discount_pr: { $gt: 0 } } },
            // { $sample: { size: 4 } }
        ]);
        return discountedProducts;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// Hàm lấy sản phẩm theo tag category
async function getProductByCategoryTag(categoryTag) {
    try {
        const result = await productsModel.find({ "category_pr_tag": categoryTag });
        return result;
    } catch (error) {
        console.log('Lỗi khi lấy sản phẩm theo category tag:', error);
        throw error;
    }
}

// Hàm lấy sản phẩm liên quan
async function getRelatedProducts(productId) {
    try {
        const product = await productsModel.findById(productId);
        if (!product) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        const relatedProducts = await productsModel.find({ 'category_pr_tag': product.category_pr_tag, _id: { $ne: productId } }).limit(4).lean();
        return relatedProducts;
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm liên quan:', error);
        throw error;
    }
}

// Hàm thêm sản phẩm
async function insertProduct(body) {
    try {
        const { name_pr, description_pr, description_pr_detail, image_pr_1, price_pr, discount_pr, quantity_pr, view_pr, weight_pr, sale_pr, rating_pr, category_pr_tag } = body;

        const productData = {
            name_pr,
            category_pr_tag,
            price_pr: price_pr || 0,
            image_pr_1,
            description_pr,
            description_pr_detail,
            discount_pr: discount_pr || 0,
            quantity_pr: quantity_pr || 0,
            view_pr: view_pr || 0,
            weight_pr: weight_pr || 0,
            sale_pr: sale_pr || 0,
            rating_pr: rating_pr || 0
        };

        const proNew = new productsModel(productData);

        const result = await proNew.save();
        return result;
    } catch (error) {
        console.log('Lỗi insert product: ', error);
        throw error;
    }
}

// Hàm xóa sản phẩm theo id
async function removeProduct(id) {
    try {
        const result = await productsModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// Hàm cập nhật sản phẩm theo id
async function updateByIdProduct(id, body) {
    try {
        const pro = await productsModel.findById(id);
        if (!pro) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        const { name_pr, description_pr, description_pr_detail, price_pr, discount_pr, quantity_pr, view_pr, weight_pr, sale_pr, rating_pr, category_pr_tag, image_pr_1 } = body;

        pro.name_pr = name_pr;
        pro.description_pr = description_pr;
        pro.description_pr_detail = description_pr_detail;
        pro.price_pr = price_pr;
        pro.discount_pr = discount_pr;
        pro.quantity_pr = quantity_pr;
        pro.view_pr = view_pr;
        pro.weight_pr = weight_pr;
        pro.sale_pr = sale_pr;
        pro.rating_pr = rating_pr;
        pro.category_pr_tag = category_pr_tag;
        pro.image_pr_1 = image_pr_1;

        const result = await pro.save();
        return result;
    } catch (error) {
        console.log('Lỗi: ', error);
        throw error;
    }
}

// Hàm tìm kiếm sản phẩm
async function searchProduct(keyword) {
    try {
        const result = await productsModel.find({ $text: { $search: keyword } });
        return result;
    } catch (error) {
        console.log('Lỗi: ', error);
        throw error;
    }
}

// Hàm tăng số lượt xem sản phẩm theo id
async function incrementProductView(productId) {
    try {
        const product = await productsModel.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        product.view_pr = (product.view_pr || 0) + 1;
        await product.save();
        return product;
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượt xem:', error);
        throw error;
    }
}

// Hàm đếm số lượng sản phẩm theo tag category
async function countProductsByCategoryTag(categoryTag) {
    try {
        const count = await productsModel.countDocuments({ category_pr_tag: categoryTag });
        return count;
    } catch (error) {
        console.error('Error counting products by category tag:', error);
        throw error;
    }
}

// Hàm lọc sản phẩm theo giá trong khoảng
async function getProductsByPriceRange(minPrice, maxPrice) {
    try {
        const query = {
            price_pr: {
                $gte: minPrice,
                $lte: maxPrice
            }
        };

        const products = await productsModel.find(query);
        return products;
    } catch (error) {
        console.error('Lỗi khi lọc sản phẩm theo giá:', error);
        throw error;
    }
}

module.exports = {
    getAllProduct, getProductsHot, getProductById, getProductByCategoryTag, getDiscountedProducts,
    getRelatedProducts, insertProduct, removeProduct, updateByIdProduct, searchProduct,
    incrementProductView, countProductsByCategoryTag, getProductsByPriceRange // Thêm hàm mới vào export
};
