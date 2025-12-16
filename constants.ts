import { MenuItem, Category, LocalizedString } from './types';

export const APP_NAME = "Na-Ta-Ya";

// --- TELEGRAM CONFIGURATION ---
export const TELEGRAM_BOT_TOKEN = "8301181591:AAFb9X44xMWmMoTNJodZtNIvxHS_frU8qII";
export const TELEGRAM_CHAT_ID = "-4898638625"; 

// --- ADMIN CREDENTIALS ---
export const ADMIN_USER = "natayaadmin";
export const ADMIN_PASS = "!nataya2025menuchange";

export const UI_LABELS: Record<string, LocalizedString> = {
  menu: { th: 'เมนู', en: 'Menu', ru: 'Меню', zh: '菜单' },
  cart: { th: 'ตะกร้า', en: 'Cart', ru: 'Корзина', zh: '购物车' },
  add: { th: 'เพิ่ม', en: 'Add', ru: 'Добавить', zh: '添加' },
  added: { th: 'เพิ่มแล้ว', en: 'Added', ru: 'Добавлено', zh: '已添加' },
  total: { th: 'รวมทั้งหมด', en: 'Total', ru: 'Итого', zh: '总计' },
  checkout: { th: 'สั่งอาหาร', en: 'Order Now', ru: 'Заказать', zh: '下单' },
  spicy: { th: 'เผ็ด', en: 'Spicy', ru: 'Острое', zh: '辣' },
  admin: { th: 'จัดการเมนู', en: 'Menu Admin', ru: 'Админ', zh: '管理' },
  view_only: { th: 'โหมดดูเมนู (สแกน QR ที่โต๊ะเพื่อสั่ง)', en: 'View Only (Scan QR at table to order)', ru: 'Только просмотр (Сканируйте QR для заказа)', zh: '仅供参考（扫描桌上二维码点餐）' },
  table: { th: 'โต๊ะ', en: 'Table', ru: 'Стол', zh: '桌号' },
  order_sent: { th: 'คำสั่งซื้อของคุณถูกส่งแล้ว', en: 'Your order has been sent', ru: 'Ваш заказ отправлен', zh: '您的订单已发送' }
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'crab', name: { th: 'เมนูปู', en: 'Crab', ru: 'Краб', zh: '螃蟹' } },
  { id: 'isan', name: { th: 'อีสาน/ส้มตำ', en: 'Isan/Som Tum', ru: 'Исан/Салаты', zh: '伊森/沙拉' } },
  { id: 'southern', name: { th: 'อาหารปักษ์ใต้', en: 'Southern Food', ru: 'Южная кухня', zh: '南部菜' } },
  { id: 'general', name: { th: 'เมนูทั่วไป', en: 'General Dishes', ru: 'Общие блюда', zh: '一般菜肴' } },
  { id: 'one_dish', name: { th: 'จานเดียว', en: 'One Dish', ru: 'Блюда', zh: '简餐' } },
  { id: 'fried', name: { th: 'ของทอด', en: 'Fried', ru: 'Жареное', zh: '炸物' } },
];

// Migrated to array categories
export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- CRAB MENU ---
  {
    id: 'c1',
    categoryIds: ['crab'],
    name: { th: 'ปูผัดพริกขี้หนู', en: 'Stir-fried Crab with Bird Eye Chili', ru: 'Жареный краб с чили', zh: '鸟眼辣椒炒蟹' },
    description: { th: 'เนื้อปูสดผัดพริกขี้หนูรสจัดจ้าน', en: 'Fresh crab stir-fried with spicy chili.', ru: 'Свежий краб с острым перцем.', zh: '辣味鲜蟹肉。' },
    price: 300,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'c2',
    categoryIds: ['crab', 'southern'],
    name: { th: 'แกงคั่วปูชะอม', en: 'Crab Curry with Cha-om', ru: 'Карри из краба с Ча-ом', zh: '查姆叶蟹肉咖喱' },
    description: { th: 'แกงกะทิปูใบชะอม', en: 'Coconut curry with crab and acacia.', ru: 'Кокосовое карри с крабом.', zh: '椰奶咖喱配蟹肉。' },
    price: 350,
    image: 'https://images.unsplash.com/photo-1626804475297-411d863b67a6?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'c3',
    categoryIds: ['crab', 'one_dish'],
    name: { th: 'ข้าวผัดปู', en: 'Crab Fried Rice', ru: 'Жареный рис с крабом', zh: '蟹肉炒饭' },
    description: { th: 'ข้าวผัดเนื้อปูหอมกลิ่นกระทะ', en: 'Classic fried rice with crab meat.', ru: 'Рис с мясом краба.', zh: '经典蟹肉炒饭。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'c4',
    categoryIds: ['crab', 'fried'],
    name: { th: 'ไข่เจียวปู', en: 'Crab Omelet', ru: 'Омлет с крабом', zh: '蟹肉煎蛋' },
    description: { th: 'ไข่เจียวฟูใส่เนื้อปู', en: 'Fluffy omelet with crab chunks.', ru: 'Пышный омлет с крабом.', zh: '蟹肉蓬松煎蛋。' },
    price: 200,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },

  // --- ISAN MENU ---
  {
    id: 'i1',
    categoryIds: ['isan'],
    name: { th: 'ส้มตำไทย', en: 'Som Tum Thai', ru: 'Сом Там Тай', zh: '泰式青木瓜沙拉' },
    description: { th: 'ส้มตำรสเปรี้ยวหวานถั่วลิสง', en: 'Papaya salad with peanuts.', ru: 'Салат из папайи с арахисом.', zh: '花生青木瓜沙拉。' },
    price: 60,
    image: 'https://images.unsplash.com/photo-1601666495147-380d0d421d09?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i2',
    categoryIds: ['isan'],
    name: { th: 'ส้มตำไทยไข่เค็ม', en: 'Som Tum Thai with Salted Egg', ru: 'Сом Там с соленым яйцом', zh: '咸蛋青木瓜沙拉' },
    description: { th: 'ส้มตำไทยใส่ไข่เค็ม', en: 'Papaya salad with salted egg.', ru: 'Салат из папайи с соленым яйцом.', zh: '咸蛋木瓜沙拉。' },
    price: 80,
    image: 'https://plus.unsplash.com/premium_photo-1664472679634-97216d55230c?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i3',
    categoryIds: ['isan', 'crab'],
    name: { th: 'ส้มตำไทย-ปู', en: 'Som Tum Thai with Crab', ru: 'Сом Там с крабом', zh: '蟹肉青木瓜沙拉' },
    description: { th: 'ส้มตำไทยใส่ปูเค็ม', en: 'Papaya salad with salted crab.', ru: 'Салат с соленым крабом.', zh: '咸蟹木瓜沙拉。' },
    price: 70,
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i4',
    categoryIds: ['isan'],
    name: { th: 'ส้มตำปูปลาร้า', en: 'Som Tum Pu Pla Ra', ru: 'Сом Там Пу Пла Ра', zh: '发酵鱼露青木瓜沙拉' },
    description: { th: 'ส้มตำลาวใส่ปลาร้า', en: 'Papaya salad with fermented fish.', ru: 'Салат с рыбным соусом.', zh: '发酵鱼露沙拉。' },
    price: 70,
    image: 'https://images.unsplash.com/photo-1553531087-b25a0b9a68ab?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i5',
    categoryIds: ['isan'],
    name: { th: 'ส้มตำกุ้งสด', en: 'Som Tum with Fresh Shrimp', ru: 'Сом Там с креветками', zh: '鲜虾青木瓜沙拉' },
    description: { th: 'ส้มตำใส่กุ้งสด', en: 'Papaya salad with raw shrimp.', ru: 'Салат с сырыми креветками.', zh: '生虾沙拉。' },
    price: 90,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i6',
    categoryIds: ['isan', 'general'],
    name: { th: 'ส้มตำทะเล', en: 'Seafood Som Tum', ru: 'Сом Там с морепродуктами', zh: '海鲜青木瓜沙拉' },
    description: { th: 'ส้มตำรวมมิตรทะเล', en: 'Papaya salad with mixed seafood.', ru: 'Салат с морепродуктами.', zh: '海鲜沙拉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1626804475315-1874d173663a?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i7',
    categoryIds: ['isan'],
    name: { th: 'ลาบปลาหมึก', en: 'Spicy Squid Salad (Larb)', ru: 'Ларб с кальмаром', zh: '辣味鱿鱼沙拉' },
    description: { th: 'ลาบปลาหมึกรสจัด', en: 'Spicy minced squid salad.', ru: 'Острый салат из кальмара.', zh: '辣味鱿鱼沙拉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1549203538-232cb9d36359?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i8',
    categoryIds: ['isan', 'one_dish'],
    name: { th: 'ผัดหมี่โคราช', en: 'Pad Mee Korat', ru: 'Пад Ми Корат', zh: '呵叻炒面' },
    description: { th: 'ผัดหมี่รสเข้มข้น', en: 'Stir-fried spicy noodles.', ru: 'Острая жареная лапша.', zh: '辣味炒面。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'i9',
    categoryIds: ['isan'],
    name: { th: 'ยำวุ้นเส้นโบราณ', en: 'Spicy Glass Noodle Salad', ru: 'Ям Вун Сен', zh: '泰式粉丝沙拉' },
    description: { th: 'ยำวุ้นเส้นเครื่องแน่น', en: 'Spicy glass noodle salad with pork.', ru: 'Салат из стеклянной лапши.', zh: '粉丝沙拉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1548590623-149b01518b52?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },

  // --- SOUTHERN MENU ---
  {
    id: 's1',
    categoryIds: ['southern'],
    name: { th: 'คั่วกลิ้งหมู', en: 'Kua Kling Pork', ru: 'Куа Клинг (Свинина)', zh: '干咖喱猪肉' },
    description: { th: 'หมูคั่วพริกแกงใต้รสจัด', en: 'Dry spicy southern curry pork.', ru: 'Острое сухое карри.', zh: '干辣咖喱猪肉。' },
    price: 130,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 's2',
    categoryIds: ['southern', 'general'],
    name: { th: 'แกงส้มปลากะพง', en: 'Sour Curry with Sea Bass', ru: 'Кислый карри с окунем', zh: '酸咖喱鲈鱼' },
    description: { th: 'แกงเหลืองปลากะพง', en: 'Yellow sour curry with fish.', ru: 'Желтый кислый карри с рыбой.', zh: '黄酸咖喱鱼。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 's3',
    categoryIds: ['southern', 'fried'],
    name: { th: 'หมูสามชั้นกะปิ', en: 'Pork Belly with Shrimp Paste', ru: 'Грудинка с креветочной пастой', zh: '虾酱五花肉' },
    description: { th: 'หมูสามชั้นผัดกะปิหอมๆ', en: 'Stir-fried pork belly with shrimp paste.', ru: 'Свинина с креветочной пастой.', zh: '虾酱炒五花肉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 's4',
    categoryIds: ['southern'],
    name: { th: 'กุ้งกะปิสะตอ', en: 'Stir-fried Sator with Shrimp', ru: 'Сатор с креветками', zh: '臭豆炒虾' },
    description: { th: 'ผัดสะตอกะปิกุ้งสด', en: 'Stir-fried stink beans with shrimp.', ru: 'Жареные бобы с креветками.', zh: '臭豆炒虾仁。' },
    price: 180,
    image: 'https://images.unsplash.com/photo-1603083656608-4171618a8f89?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 's5',
    categoryIds: ['southern', 'general'],
    name: { th: 'ฉู่ฉี่กุ้ง', en: 'Chu-Chee Shrimp', ru: 'Чу-Чи с креветками', zh: '红咖喱虾' },
    description: { th: 'กุ้งราดพริกแกงฉู่ฉี่', en: 'Shrimp in thick red curry sauce.', ru: 'Креветки в красном карри.', zh: '红咖喱酱虾。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 's6',
    categoryIds: ['southern', 'fried'],
    name: { th: 'ปลากะพงทอดขมิ้น', en: 'Turmeric Fried Sea Bass', ru: 'Окунь жареный с куркумой', zh: '姜黄炸鲈鱼' },
    description: { th: 'ปลาทอดคลุกขมิ้นหอมกรุ่น', en: 'Fried fish marinated in turmeric.', ru: 'Рыба в куркуме.', zh: '姜黄腌制炸鱼。' },
    price: 380,
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },

  // --- GENERAL MENU ---
  {
    id: 'g1',
    categoryIds: ['general', 'fried'],
    name: { th: 'หมึกกระเทียม', en: 'Garlic Squid', ru: 'Кальмар с чесноком', zh: '大蒜鱿鱼' },
    description: { th: 'ปลาหมึกทอดกระเทียมพริกไทย', en: 'Stir-fried squid with garlic and pepper.', ru: 'Кальмар с чесноком и перцем.', zh: '大蒜胡椒炒鱿鱼。' },
    price: 180,
    image: 'https://images.unsplash.com/photo-1562967960-f5540324838e?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'g2',
    categoryIds: ['general'],
    name: { th: 'ต้มยำกุ้ง (หม้อไฟ)', en: 'Tom Yum Kung (Hot Pot)', ru: 'Том Ям Кунг', zh: '冬阴功汤' },
    description: { th: 'ต้มยำกุ้งน้ำข้นรสจัด', en: 'Spicy prawn soup hot pot.', ru: 'Острый суп с креветками.', zh: '酸辣虾汤火锅。' },
    price: 250,
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28d5a?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'g3',
    categoryIds: ['general', 'fried'],
    name: { th: 'สามชั้นทอดน้ำปลา', en: 'Fried Pork Belly with Fish Sauce', ru: 'Жареная грудинка', zh: '鱼露炸五花肉' },
    description: { th: 'หมูสามชั้นทอดกรอบเค็มๆ', en: 'Crispy fried pork belly.', ru: 'Хрустящая свиная грудинка.', zh: '脆皮炸五花肉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'g4',
    categoryIds: ['general', 'fried'],
    name: { th: 'ไข่เจียวหมูสับ', en: 'Minced Pork Omelet', ru: 'Омлет со свининой', zh: '肉末煎蛋' },
    description: { th: 'ไข่เจียวใส่หมูสับ', en: 'Thai omelet with minced pork.', ru: 'Тайский омлет со свининой.', zh: '肉末泰式煎蛋。' },
    price: 100,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'g5',
    categoryIds: ['general'],
    name: { th: 'ผัดผักรวมกุ้ง', en: 'Stir-fried Veggies with Shrimp', ru: 'Овощи с креветками', zh: '虾仁炒杂菜' },
    description: { th: 'ผัดผักรวมมิตรใส่กุ้ง', en: 'Mixed vegetables stir-fried with shrimp.', ru: 'Жареные овощи с креветками.', zh: '什锦蔬菜炒虾。' },
    price: 180,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },

  // --- ONE DISH ---
  {
    id: 'o1',
    categoryIds: ['one_dish'],
    name: { th: 'ผัดไทยกุ้งสด', en: 'Pad Thai with Fresh Shrimp', ru: 'Пад Тай с креветками', zh: '鲜虾泰式炒粉' },
    description: { th: 'ผัดไทยรสกลมกล่อมใส่กุ้ง', en: 'Classic Pad Thai with shrimp.', ru: 'Классический Пад Тай.', zh: '经典鲜虾泰式炒粉。' },
    price: 100,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'o2',
    categoryIds: ['one_dish'],
    name: { th: 'ข้าวกะเพราหมูสับ', en: 'Basil Pork with Rice', ru: 'Свинина с базиликом и рисом', zh: '罗勒猪肉饭' },
    description: { th: 'ผัดกะเพราหมูสับราดข้าว', en: 'Spicy stir-fried basil with minced pork.', ru: 'Острая свинина с базиликом.', zh: '辣味罗勒炒肉末。' },
    price: 80,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    isSpicy: true
  },
  {
    id: 'o3',
    categoryIds: ['one_dish'],
    name: { th: 'ข้าวผัดกุ้ง', en: 'Fried Rice with Shrimp', ru: 'Жареный рис с креветками', zh: '虾仁炒饭' },
    description: { th: 'ข้าวผัดใส่กุ้ง', en: 'Fried rice with shrimp.', ru: 'Жареный рис с креветками.', zh: '虾仁炒饭。' },
    price: 90,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb74b?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'o4',
    categoryIds: ['one_dish', 'fried'],
    name: { th: 'ไข่ดาว', en: 'Fried Egg', ru: 'Яичница', zh: '煎蛋' },
    description: { th: 'ไข่ดาว', en: 'Fried egg (add-on).', ru: 'Жареное яйцо.', zh: '煎蛋。' },
    price: 15,
    image: 'https://images.unsplash.com/photo-1525351453334-e57d5271a121?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },

  // --- FRIED ---
  {
    id: 'f1',
    categoryIds: ['fried'],
    name: { th: 'หมูแดดเดียว', en: 'Sun-dried Pork', ru: 'Вяленая свинина', zh: '晒干猪肉' },
    description: { th: 'หมูแดดเดียวทอด', en: 'Deep fried sun-dried pork.', ru: 'Жареная вяленая свинина.', zh: '油炸晒干猪肉。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'f2',
    categoryIds: ['fried'],
    name: { th: 'กุ้งกระเบื้อง', en: 'Shrimp Tiles', ru: 'Креветочные плитки', zh: '虾饼' },
    description: { th: 'กุ้งบดทอดแผ่นบางกรอบ', en: 'Crispy shrimp pancakes.', ru: 'Хрустящие блинчики с креветками.', zh: '脆皮虾饼。' },
    price: 150,
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  },
  {
    id: 'f3',
    categoryIds: ['fried'],
    name: { th: 'เฟรนฟรายทอด', en: 'French Fries', ru: 'Картофель фри', zh: '炸薯条' },
    description: { th: 'มันฝรั่งทอด', en: 'Crispy french fries.', ru: 'Картофель фри.', zh: '炸薯条。' },
    price: 70,
    image: 'https://images.unsplash.com/photo-1573080496987-aeb4d9170dff?auto=format&fit=crop&w=800&q=80',
    isSpicy: false
  }
];