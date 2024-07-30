const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories.controller');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesController.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});

// router.put('/edit/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const body = req.body;
//         const result = await categoriesController.updateCategory(id, body);
//         return res.status(200).json(result);
//     } catch (error) {
//         console.log("Lỗi: ", error);
//         throw error;
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const checkImg = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/)) {
        return cb(new Error('Vui lòng nhập đúng định dạng'));
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: checkImg });

router.post('/add_ct', upload.single('image_ct'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.file);

        const body = req.body;
        const file = req.file;

        if (file) {
            body.image_ct = path.basename(file.filename);
            console.log(`File saved: ${body.image_ct}`);
        }

        await categoriesController.createCategory(body);

        res.status(200).json({ message: 'Thêm cate thành công', category: body });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoriesController.deleteCategory(id);
        const imagePath = path.join(__dirname, '../public/images/', result.image_ct);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
                return res.status(500).json({ message: 'Lỗi xóa tệp hình ảnh' });
            }

            res.status(200).json({ message: "Xóa sản phẩm thành công" });
        });
        if (result) {
            return res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).json({ mess: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cate = await categoriesController.getDetailCategory(id);
        return res.status(200).json(cate)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

router.put('/edit/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        if (req.file) {
            body.image_ct = req.file.path;  
        }
        const result = await categoriesController.edit_category(id, body);
        return res.status(200).json(result);
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;