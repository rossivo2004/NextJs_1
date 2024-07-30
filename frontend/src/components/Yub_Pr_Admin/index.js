import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name_pr: Yup.string().required('Tên sản phẩm không được để trống'),
  category_pr_tag: Yup.string().required('Danh mục sản phẩm không được để trống'),
  price_pr: Yup.number().min(1000, 'Giá sản phẩm phải lớn hơn 1000').required('Giá sản phẩm không được để trống'),
  quantity_pr: Yup.number().min(1, 'Số lượng sản phẩm phải lớn hơn 0').required('Số lượng sản phẩm không được để trống'),
  discount_pr: Yup.number().min(0, 'Giảm giá sản phẩm không được nhỏ hơn 0'),
  description_pr: Yup.string().required('Mô tả sản phẩm không được để trống'),
  description_pr_detail: Yup.string().required('Chi tiết mô tả sản phẩm không được để trống'),
});

export default validationSchema;
