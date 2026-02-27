/**
 * Chuyển đổi Tiêu đề tiếng Việt thành Slug
 * Ví dụ: "Thứ Hai Vui Vẻ - Đồng giá 45k" -> "thu-hai-vui-ve-dong-gia-45k"
 */
export const createSlug = (str: string): string => {
  if (!str) return '';

  return str
    .toLowerCase()
    .normalize('NFD') // Chuyển về dạng tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
    .replace(/[đĐ]/g, 'd') // Thay chữ đ/Đ thành d
    .replace(/([^0-9a-z-\s])/g, '') // Xóa ký tự đặc biệt
    .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng dấu -
    .replace(/-+/g, '-') // Thay nhiều dấu - liên tiếp bằng 1 dấu -
    .replace(/^-+|-+$/g, ''); // Xóa dấu - ở đầu và cuối chuỗi
};