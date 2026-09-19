import { Category, MenuItem, BranchInfo } from '../types';

export const BRANCHES: BranchInfo[] = [
  {
    "name": "فرع الشطرة (الرئيسي)",
    "address": "الشطرة - شارع الشوملي تقاطع الإيطالي",
    "phone": "07813071487"
  },
  {
    "name": "فرع قلعة سكر",
    "address": "قلعة سكر - شارع المستشفى",
    "phone": "07852693334"
  },
  {
    "name": "فرع الرفاعي",
    "address": "الرفاعي - تقاطع الإيطالي",
    "phone": "07852693335"
  }
];

export const CATEGORIES: Category[] = [
  {
    "id": "ice-cream",
    "nameAr": "الايس كريم",
    "iconName": "IceCream",
    "description": "أقداح وبسكت الآيس كريم والجيلاتو الطبيعي السوفت والمشكل",
    "bannerImage": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "mix-soft",
    "nameAr": "مكس سوفت",
    "iconName": "Sparkles",
    "description": "طبقات آيس كريم سوفت مع خلطات صوصات عالمية ونكهات مميزة",
    "bannerImage": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "asbari",
    "nameAr": "الازبري",
    "iconName": "Snowflake",
    "description": "سلاش فواكه ثلجي بارد وقدح الإيطالي وازبري أصيل",
    "bannerImage": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "signature-dishes",
    "nameAr": "الاطباق المميزة",
    "iconName": "Award",
    "description": "أطباق خاصة حصرية بمثلجات وحلويات الإيطالي",
    "bannerImage": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "takeaway",
    "nameAr": "السفري",
    "iconName": "Package",
    "description": "آيس كريم وجيلاتو بالوزن للجمعات والمناسبات العائلية",
    "bannerImage": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "waffles",
    "nameAr": "وافل",
    "iconName": "Grid",
    "description": "وافل مقرمش ومخبوز طازجاً بأشهى الإضافات والشوكولاتة الفاخرة",
    "bannerImage": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "cookies",
    "nameAr": "الكوكيز",
    "iconName": "Cookie",
    "description": "كوكيز مخبوز بحرارة ومذاق لا يقاوم",
    "bannerImage": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "crepes",
    "nameAr": "كريب",
    "iconName": "Layers",
    "description": "كريب رقيق محشو ومغطى بالشوكولاتة والمكسرات والفواكه",
    "bannerImage": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "pancakes",
    "nameAr": "بان كيك",
    "iconName": "Disc",
    "description": "طبقات البان كيك الذهبية الهشة مع ألذ أنواع الصوص",
    "bannerImage": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "mini-pancakes",
    "nameAr": "ميني بان كيك",
    "iconName": "Coins",
    "description": "حبات ميني بان كيك هشة مغطاة بأشهى الصوصات",
    "bannerImage": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "special-cake",
    "nameAr": "سبشل كيك",
    "iconName": "Cake",
    "description": "تشكيلة فاخرة من الكيك، تشيز كيك، كيكة دبي، وكليجة عراقية",
    "bannerImage": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "sweets",
    "nameAr": "الحلويات",
    "iconName": "Flame",
    "description": "أطباق كنافة، زنود الست، وحلويات شرقية فاخرة",
    "bannerImage": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "signature-cocktails",
    "nameAr": "الكوكتيلات المميزة",
    "iconName": "Wine",
    "description": "خلطات عصائر طبيعية مبتكرة بطبقات الفواكه والمنكهات",
    "bannerImage": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "milkshakes",
    "nameAr": "ميلك شيك",
    "iconName": "CupSoda",
    "description": "ميلك شيك غني وكريمي بأشهر النكهات العالمية",
    "bannerImage": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "smoothies",
    "nameAr": "سموذي",
    "iconName": "GlassWater",
    "description": "سموذي فواكه مثلجة ومنعشة محببة في كل الأوقات",
    "bannerImage": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "energy-drinks",
    "nameAr": "مشروبات الطاقة",
    "iconName": "Zap",
    "description": "مشروبات طاقة بنكهات الفواكه، التوت، وبلو سكاي المنعش",
    "bannerImage": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "fresh-juices",
    "nameAr": "عصائر طبيعية",
    "iconName": "Apple",
    "description": "عصائر طازجة 100% معصورة من أجود الفواكه الطبيعية",
    "bannerImage": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "mojito",
    "nameAr": "موهيتو",
    "iconName": "Citrus",
    "description": "موهيتو منعش بالنعناع والليمون ونكهات مثلجة",
    "bannerImage": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "ice-coffee",
    "nameAr": "آيس كافيه",
    "iconName": "Coffee",
    "description": "قهوة باردة فاخرة، فرابتشينو، وسبانش لاتيه منعش",
    "bannerImage": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "hot-drinks",
    "nameAr": "المشروبات الساخنة",
    "iconName": "FlameKindling",
    "description": "قهوة عربية، تركية، كابتشينو، جكليتية، وشاي عراقي",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "id": "ic-1",
    "nameAr": "قدح مشكل - صغير",
    "price": 1500,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=ic1",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-2",
    "nameAr": "قدح مشكل - كبير",
    "price": 2500,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=ic2",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-3",
    "nameAr": "قدح فستق - صغير",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ic3",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-4",
    "nameAr": "قدح فستق - كبير",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ic4",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-5",
    "nameAr": "قدح دايت - صغير",
    "price": 2500,
    "image": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&auto=format&fit=crop&q=80&sig=ic5",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-6",
    "nameAr": "قدح دايت - كبير",
    "price": 3500,
    "image": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&auto=format&fit=crop&q=80&sig=ic6",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-7",
    "nameAr": "قدح سوفت - صغير",
    "price": 1000,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ic7",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-8",
    "nameAr": "قدح سوفت - كبير",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ic8",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-9",
    "nameAr": "بسكت سوفت",
    "price": 1000,
    "image": "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600&auto=format&fit=crop&q=80&sig=ic9",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-10",
    "nameAr": "بسكت مشكل",
    "price": 1500,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80&sig=ic10",
    "categoryId": "ice-cream"
  },
  {
    "id": "ic-11",
    "nameAr": "بسكت فستق",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=600&auto=format&fit=crop&q=80&sig=ic11",
    "categoryId": "ice-cream"
  },
  {
    "id": "ms-1",
    "nameAr": "بستاشيو - لوتس - نوتيلا",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ms1",
    "categoryId": "mix-soft"
  },
  {
    "id": "ms-2",
    "nameAr": "اوريو - كندر - كت كت",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80&sig=ms2",
    "categoryId": "mix-soft"
  },
  {
    "id": "ms-3",
    "nameAr": "منكا - فراولة - مارشميلو",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&auto=format&fit=crop&q=80&sig=ms3",
    "categoryId": "mix-soft"
  },
  {
    "id": "as-1",
    "nameAr": "ازبري",
    "price": 1000,
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80&sig=as1",
    "categoryId": "asbari"
  },
  {
    "id": "as-2",
    "nameAr": "ازبري سلاش",
    "price": 1500,
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=as2",
    "categoryId": "asbari"
  },
  {
    "id": "as-3",
    "nameAr": "ازبري سلاش فواكه",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=as3",
    "categoryId": "asbari"
  },
  {
    "id": "as-4",
    "nameAr": "سلاش قهوة بالحليب",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=as4",
    "categoryId": "asbari"
  },
  {
    "id": "as-5",
    "nameAr": "سلاش موز بالحليب",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=as5",
    "categoryId": "asbari"
  },
  {
    "id": "as-6",
    "nameAr": "سلاش مشمش",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=as6",
    "categoryId": "asbari"
  },
  {
    "id": "as-7",
    "nameAr": "سلاش زبيب",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80&sig=as7",
    "categoryId": "asbari"
  },
  {
    "id": "as-8",
    "nameAr": "قدح الايطالي",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=as8",
    "categoryId": "asbari"
  },
  {
    "id": "sd-1",
    "nameAr": "طبق ايس كريم مشكل",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=sd1",
    "categoryId": "signature-dishes"
  },
  {
    "id": "sd-2",
    "nameAr": "طبق جيلاتو صغير",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=sd2",
    "categoryId": "signature-dishes"
  },
  {
    "id": "sd-3",
    "nameAr": "طبق جيلاتو كبير",
    "price": 11000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=sd3",
    "categoryId": "signature-dishes"
  },
  {
    "id": "sd-4",
    "nameAr": "طبق دوند رمه التركي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80&sig=sd4",
    "categoryId": "signature-dishes"
  },
  {
    "id": "sd-5",
    "nameAr": "عش السعادة",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sd5",
    "categoryId": "signature-dishes"
  },
  {
    "id": "sd-6",
    "nameAr": "طبق كيكة ايس كريم (منكا - فراولة - نستلة)",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80&sig=sd6",
    "categoryId": "signature-dishes"
  },
  {
    "id": "ta-1",
    "nameAr": "آيس كريم مشكل - ربع كيلو",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ta1",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-2",
    "nameAr": "آيس كريم مشكل - نصف كيلو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ta2",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-3",
    "nameAr": "آيس كريم مشكل - كيلو",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ta3",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-4",
    "nameAr": "آيس كريم بالفستق - ربع كيلو",
    "price": 3500,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=ta4",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-5",
    "nameAr": "آيس كريم بالفستق - نصف كيلو",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=ta5",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-6",
    "nameAr": "آيس كريم بالفستق - كيلو",
    "price": 14000,
    "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&auto=format&fit=crop&q=80&sig=ta6",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-7",
    "nameAr": "آيس كريم سوفت - ربع كيلو",
    "price": 2500,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ta7",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-8",
    "nameAr": "آيس كريم سوفت - نصف كيلو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ta8",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-9",
    "nameAr": "آيس كريم سوفت - كيلو",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=80&sig=ta9",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-10",
    "nameAr": "آيس كريم دايت - ربع كيلو",
    "price": 3500,
    "image": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&auto=format&fit=crop&q=80&sig=ta10",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-11",
    "nameAr": "آيس كريم دايت - نصف كيلو",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&auto=format&fit=crop&q=80&sig=ta11",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-12",
    "nameAr": "آيس كريم دايت - كيلو",
    "price": 14000,
    "image": "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&auto=format&fit=crop&q=80&sig=ta12",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-13",
    "nameAr": "جيلاتو الايطالي - نصف كيلو",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ta13",
    "categoryId": "takeaway"
  },
  {
    "id": "ta-14",
    "nameAr": "جيلاتو الايطالي - كيلو",
    "price": 14000,
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80&sig=ta14",
    "categoryId": "takeaway"
  },
  {
    "id": "wf-1",
    "nameAr": "وافل الايطالي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80&sig=wf1",
    "categoryId": "waffles"
  },
  {
    "id": "wf-2",
    "nameAr": "وافل بستاشيو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop&q=80&sig=wf2",
    "categoryId": "waffles"
  },
  {
    "id": "wf-3",
    "nameAr": "وافل نوتيلا",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=wf3",
    "categoryId": "waffles"
  },
  {
    "id": "wf-4",
    "nameAr": "وافل لوتس",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80&sig=wf4",
    "categoryId": "waffles"
  },
  {
    "id": "wf-5",
    "nameAr": "وافل فواكه",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80&sig=wf5",
    "categoryId": "waffles"
  },
  {
    "id": "wf-6",
    "nameAr": "وافل شوكولاته بلجيكي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop&q=80&sig=wf6",
    "categoryId": "waffles"
  },
  {
    "id": "wf-7",
    "nameAr": "وافل اوريو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=wf7",
    "categoryId": "waffles"
  },
  {
    "id": "wf-8",
    "nameAr": "وافل كندر",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80&sig=wf8",
    "categoryId": "waffles"
  },
  {
    "id": "wf-9",
    "nameAr": "وافل كت كات",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=600&auto=format&fit=crop&q=80&sig=wf9",
    "categoryId": "waffles"
  },
  {
    "id": "wf-10",
    "nameAr": "وافل مكس صوص",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80&sig=wf10",
    "categoryId": "waffles"
  },
  {
    "id": "ck-1",
    "nameAr": "كوكيز لوتس",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80&sig=ck1",
    "categoryId": "cookies"
  },
  {
    "id": "ck-2",
    "nameAr": "كوكيز بلجيكي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80&sig=ck2",
    "categoryId": "cookies"
  },
  {
    "id": "ck-3",
    "nameAr": "كوكيز بستاشيو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80&sig=ck3",
    "categoryId": "cookies"
  },
  {
    "id": "ck-4",
    "nameAr": "كوكيز ايطالي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80&sig=ck4",
    "categoryId": "cookies"
  },
  {
    "id": "cr-1",
    "nameAr": "كريب الايطالي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr1",
    "categoryId": "crepes"
  },
  {
    "id": "cr-2",
    "nameAr": "كريب نوتيلا",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr2",
    "categoryId": "crepes"
  },
  {
    "id": "cr-3",
    "nameAr": "كريب كندر",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr3",
    "categoryId": "crepes"
  },
  {
    "id": "cr-4",
    "nameAr": "كريب اوريو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr4",
    "categoryId": "crepes"
  },
  {
    "id": "cr-5",
    "nameAr": "كريب لوتس",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr5",
    "categoryId": "crepes"
  },
  {
    "id": "cr-6",
    "nameAr": "كريب غلاكسي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr6",
    "categoryId": "crepes"
  },
  {
    "id": "cr-7",
    "nameAr": "كريب كت كات",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr7",
    "categoryId": "crepes"
  },
  {
    "id": "cr-8",
    "nameAr": "كريب بستاشيو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr8",
    "categoryId": "crepes"
  },
  {
    "id": "cr-9",
    "nameAr": "كريب مكس صوص",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr9",
    "categoryId": "crepes"
  },
  {
    "id": "cr-10",
    "nameAr": "كريب مكسرات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr10",
    "categoryId": "crepes"
  },
  {
    "id": "cr-11",
    "nameAr": "كريب بالفواكه",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr11",
    "categoryId": "crepes"
  },
  {
    "id": "cr-12",
    "nameAr": "كريب رول موز",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr12",
    "categoryId": "crepes"
  },
  {
    "id": "cr-13",
    "nameAr": "كريب رول محشي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr13",
    "categoryId": "crepes"
  },
  {
    "id": "cr-14",
    "nameAr": "كريب لغم",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr14",
    "categoryId": "crepes"
  },
  {
    "id": "cr-15",
    "nameAr": "كريب دبي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr15",
    "categoryId": "crepes"
  },
  {
    "id": "cr-16",
    "nameAr": "كريب مارشميلو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr16",
    "categoryId": "crepes"
  },
  {
    "id": "cr-17",
    "nameAr": "كريب بلجيكي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80&sig=cr17",
    "categoryId": "crepes"
  },
  {
    "id": "cr-18",
    "nameAr": "باستا كريب",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=80&sig=cr18",
    "categoryId": "crepes"
  },
  {
    "id": "pc-1",
    "nameAr": "بان كيك إيطالي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=pc1",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-2",
    "nameAr": "بان كيك بستاشيو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=pc2",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-3",
    "nameAr": "بان كيك نوتيلا",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=pc3",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-4",
    "nameAr": "بان كيك لوتس",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=pc4",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-5",
    "nameAr": "بان كيك كت كات",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=pc5",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-6",
    "nameAr": "بان كيك مكس صوص",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=pc6",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-7",
    "nameAr": "بان كيك فواكه",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=pc7",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-8",
    "nameAr": "بان كيك كندر",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=pc8",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-9",
    "nameAr": "بان كيك اوريو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=pc9",
    "categoryId": "pancakes"
  },
  {
    "id": "pc-10",
    "nameAr": "بان كيك بلجيكي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=pc10",
    "categoryId": "pancakes"
  },
  {
    "id": "mp-1",
    "nameAr": "ميني بان كيك ايطالي",
    "price": 6000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=mp1",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-2",
    "nameAr": "ميني بان كيك بستاشيو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=mp2",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-3",
    "nameAr": "ميني بان كيك نوتيلا",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=mp3",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-4",
    "nameAr": "ميني بان كيك لوتس",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=mp4",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-5",
    "nameAr": "ميني بان كيك مكس صوص",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=mp5",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-6",
    "nameAr": "ميني بان كيك كندر",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=mp6",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-7",
    "nameAr": "ميني بان كيك اوريو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80&sig=mp7",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "mp-8",
    "nameAr": "ميني بان كيك بلجيكي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80&sig=mp8",
    "categoryId": "mini-pancakes"
  },
  {
    "id": "sc-1",
    "nameAr": "جيز كيك (نوتيلا - لوتس - فستق - فراولة)",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80&sig=sc1",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-2",
    "nameAr": "كيك بالحليب",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc2",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-3",
    "nameAr": "كيك براوني",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80&sig=sc3",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-4",
    "nameAr": "كيك سويس رول",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc4",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-5",
    "nameAr": "كيك نوتيلا",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80&sig=sc5",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-6",
    "nameAr": "كيك أسفنجي",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc6",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-7",
    "nameAr": "كيك دبي",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80&sig=sc7",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-8",
    "nameAr": "شوكلاه دبي تركي",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80&sig=sc8",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-9",
    "nameAr": "شوكلاه دبي بلجيكي",
    "price": 7000,
    "image": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80&sig=sc9",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-10",
    "nameAr": "تراب الملوك",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc10",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-11",
    "nameAr": "سان سباستيان",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80&sig=sc11",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-12",
    "nameAr": "موس كيك",
    "price": 2500,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc12",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-13",
    "nameAr": "قطعه كيك",
    "price": 1000,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80&sig=sc13",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-14",
    "nameAr": "كليجة عراقية (تمر - حلقوم) كغم",
    "price": 8000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sc14",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-15",
    "nameAr": "كليجة عراقية (تمر - حلقوم) نصف كيلو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sc15",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-16",
    "nameAr": "كليجة عراقية (جوز) كغم",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sc16",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-17",
    "nameAr": "كليجة عراقية (جوز) نصف كيلو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sc17",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-18",
    "nameAr": "قالب كيك كبير",
    "price": 20000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc18",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-19",
    "nameAr": "قالب كيك وسط",
    "price": 15000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc19",
    "categoryId": "special-cake"
  },
  {
    "id": "sc-20",
    "nameAr": "قالب كيك صغير",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80&sig=sc20",
    "categoryId": "special-cake"
  },
  {
    "id": "sw-1",
    "nameAr": "طبق كنافة (جبن - نوتيلا - قشطة - لوتس) - صغير",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw1",
    "categoryId": "sweets"
  },
  {
    "id": "sw-2",
    "nameAr": "طبق كنافة (جبن - نوتيلا - قشطة - لوتس) - كبير",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw2",
    "categoryId": "sweets"
  },
  {
    "id": "sw-3",
    "nameAr": "طبق زنود",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw3",
    "categoryId": "sweets"
  },
  {
    "id": "sw-4",
    "nameAr": "كنافة نوتيلا - ربع كيلو",
    "price": 3000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw4",
    "categoryId": "sweets"
  },
  {
    "id": "sw-5",
    "nameAr": "كنافة نوتيلا - نصف كيلو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw5",
    "categoryId": "sweets"
  },
  {
    "id": "sw-6",
    "nameAr": "كنافة نوتيلا - كيلو",
    "price": 10000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw6",
    "categoryId": "sweets"
  },
  {
    "id": "sw-7",
    "nameAr": "كنافة قشطة - ربع كيلو",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw7",
    "categoryId": "sweets"
  },
  {
    "id": "sw-8",
    "nameAr": "كنافة قشطة - نصف كيلو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw8",
    "categoryId": "sweets"
  },
  {
    "id": "sw-9",
    "nameAr": "كنافة قشطة - كيلو",
    "price": 8000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw9",
    "categoryId": "sweets"
  },
  {
    "id": "sw-10",
    "nameAr": "زنود الست - ربع كيلو",
    "price": 2000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw10",
    "categoryId": "sweets"
  },
  {
    "id": "sw-11",
    "nameAr": "زنود الست - نصف كيلو",
    "price": 4000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw11",
    "categoryId": "sweets"
  },
  {
    "id": "sw-12",
    "nameAr": "زنود الست - كيلو",
    "price": 8000,
    "image": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80&sig=sw12",
    "categoryId": "sweets"
  },
  {
    "id": "c-1",
    "nameAr": "الإيطالي",
    "description": "طبقات الموز مع التوت والفراولة والمانجو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=c1",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-2",
    "nameAr": "كنگ درنك",
    "description": "موز + فراولة + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=c2",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-3",
    "nameAr": "منكاوي",
    "description": "مانجو + موز + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=c3",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-4",
    "nameAr": "بينا كولادا",
    "description": "أناناس + جوز الهند + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=c4",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-5",
    "nameAr": "الايطالي توت أزرق",
    "description": "توت أزرق + فراولة + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=c5",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-6",
    "nameAr": "نصف القمر",
    "description": "برتقال + فراولة + موز + المنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=c6",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-7",
    "nameAr": "الدب المحبوب",
    "description": "فراولة + أيس كريم + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=c7",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-8",
    "nameAr": "السلطان",
    "description": "أفوكادو + مكسرات + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=c8",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-9",
    "nameAr": "الباشا",
    "description": "بطيخ + مكسرات + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=c9",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-10",
    "nameAr": "الامبراطور",
    "description": "مانجو صوص الشوكلاتة + الحليب والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=c10",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-11",
    "nameAr": "البركان",
    "description": "أفوكادو + حبيبات الفراولة والمنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=c11",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-12",
    "nameAr": "كوكتيل طبقات",
    "description": "فراولة + موز + مانجو",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=c12",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-13",
    "nameAr": "كوكتيل حمضيات",
    "description": "فراولة + أناناس + ليمون + برتقال + المنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80&sig=c13",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "c-14",
    "nameAr": "كوكتيل جامايكا",
    "description": "برتقال + رمان + موز + المنكهات",
    "price": 5000,
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80&sig=c14",
    "categoryId": "signature-cocktails"
  },
  {
    "id": "msk-1",
    "nameAr": "الايطالي",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "msk-2",
    "nameAr": "فانيلا",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "msk-3",
    "nameAr": "فراولة",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "msk-4",
    "nameAr": "نوتيلا",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "msk-5",
    "nameAr": "كندر",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "msk-6",
    "nameAr": "لوتس",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "msk-7",
    "nameAr": "اوريو",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "msk-8",
    "nameAr": "كت كات",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "msk-9",
    "nameAr": "كلاكسي",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "msk-10",
    "nameAr": "سنيكرز",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "msk-11",
    "nameAr": "كراميل",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "msk-12",
    "nameAr": "راشي",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=11"
  },
  {
    "id": "msk-13",
    "nameAr": "سيريلاك",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=12"
  },
  {
    "id": "msk-14",
    "nameAr": "بستاشيو",
    "price": 5000,
    "categoryId": "milkshakes",
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80&sig=13"
  },
  {
    "id": "sm-1",
    "nameAr": "الايطالي",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "sm-2",
    "nameAr": "توت",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "sm-3",
    "nameAr": "توت بري",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "sm-4",
    "nameAr": "بطيخ",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "sm-5",
    "nameAr": "اناناس",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "sm-6",
    "nameAr": "فراولة",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "sm-7",
    "nameAr": "منكا",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "sm-8",
    "nameAr": "مشمش",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "sm-9",
    "nameAr": "بلاك بيري",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "sm-10",
    "nameAr": "خوخ",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "sm-11",
    "nameAr": "برتقال",
    "price": 5000,
    "categoryId": "smoothies",
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "en-1",
    "nameAr": "توت أزرق",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "en-2",
    "nameAr": "توت أحمر",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "en-3",
    "nameAr": "توت بري",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "en-4",
    "nameAr": "رمان",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "en-5",
    "nameAr": "فراولة",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "en-6",
    "nameAr": "منكا",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "en-7",
    "nameAr": "كرز",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "en-8",
    "nameAr": "أناناس",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "en-9",
    "nameAr": "علك",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "en-10",
    "nameAr": "بلو سكاي",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "en-11",
    "nameAr": "ليمون أصفر",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "en-12",
    "nameAr": "نعناع مثلج",
    "price": 5000,
    "categoryId": "energy-drinks",
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80&sig=11"
  },
  {
    "id": "fj-1",
    "nameAr": "فراولة",
    "price": 4000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "fj-2",
    "nameAr": "موز",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "fj-3",
    "nameAr": "موز وفراولة",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "fj-4",
    "nameAr": "موز وحليب",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "fj-5",
    "nameAr": "فراولة وحليب",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "fj-6",
    "nameAr": "ليمون ونعناع",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "fj-7",
    "nameAr": "ليمون وبرتقال",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "fj-8",
    "nameAr": "برتقال",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "fj-9",
    "nameAr": "ليمون",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "fj-10",
    "nameAr": "رمان",
    "price": 4000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "fj-11",
    "nameAr": "منكا",
    "price": 4000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "fj-12",
    "nameAr": "بطيخ",
    "price": 3000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=11"
  },
  {
    "id": "fj-13",
    "nameAr": "اناناس",
    "price": 4000,
    "categoryId": "fresh-juices",
    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&auto=format&fit=crop&q=80&sig=12"
  },
  {
    "id": "mo-1",
    "nameAr": "توت ازرق",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "mo-2",
    "nameAr": "توت احمر",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "mo-3",
    "nameAr": "اناناس",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "mo-4",
    "nameAr": "رمان",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "mo-5",
    "nameAr": "كرز",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "mo-6",
    "nameAr": "خوخ",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "mo-7",
    "nameAr": "فراولة",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "mo-8",
    "nameAr": "بلو سكاي",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "mo-9",
    "nameAr": "ليمون اصفر",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "mo-10",
    "nameAr": "ليمون اخضر",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "mo-11",
    "nameAr": "نعناع مثلج",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "mo-12",
    "nameAr": "علك",
    "price": 4000,
    "categoryId": "mojito",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80&sig=11"
  },
  {
    "id": "ico-1",
    "nameAr": "آيس لاتيه",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "ico-2",
    "nameAr": "آيس موكا",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "ico-3",
    "nameAr": "آيس لاتيه كراميل",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "ico-4",
    "nameAr": "آيس فرابتشينو",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "ico-5",
    "nameAr": "آيس لاتيه نوتيلا",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "ico-6",
    "nameAr": "آيس كراميل فرابتشينو",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "ico-7",
    "nameAr": "آيس لاتيه بندق",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "ico-8",
    "nameAr": "آيس سبانش لاتيه",
    "price": 4000,
    "categoryId": "ice-coffee",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "hd-1",
    "nameAr": "اسبريسو سنكل",
    "price": 2500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=0"
  },
  {
    "id": "hd-2",
    "nameAr": "اسبريسو دبل",
    "price": 3500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=1"
  },
  {
    "id": "hd-3",
    "nameAr": "اسبريسو ماكيتو كراميل",
    "price": 3000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=2"
  },
  {
    "id": "hd-4",
    "nameAr": "امريكانو كافيه",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=3"
  },
  {
    "id": "hd-5",
    "nameAr": "موكا كافيه ( فانيلا - كراميل - بندق )",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=4"
  },
  {
    "id": "hd-6",
    "nameAr": "لاتيه كافيه ( فانيلا - كراميل - بندق )",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=5"
  },
  {
    "id": "hd-7",
    "nameAr": "شاي عراقي",
    "price": 1000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=6"
  },
  {
    "id": "hd-8",
    "nameAr": "شاي ( ليمون - اخضر - نعناع )",
    "price": 2000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=7"
  },
  {
    "id": "hd-9",
    "nameAr": "شاي كرك",
    "price": 2000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=8"
  },
  {
    "id": "hd-10",
    "nameAr": "قهوة عربية",
    "price": 2500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=9"
  },
  {
    "id": "hd-11",
    "nameAr": "قهوة تركية",
    "price": 2500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=10"
  },
  {
    "id": "hd-12",
    "nameAr": "قهوة جكليتية",
    "price": 2500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=11"
  },
  {
    "id": "hd-13",
    "nameAr": "قهوة جكليتية فستق",
    "price": 3000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=12"
  },
  {
    "id": "hd-14",
    "nameAr": "هوت جكليت",
    "price": 3000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=13"
  },
  {
    "id": "hd-15",
    "nameAr": "نيسكافيه",
    "price": 3000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=14"
  },
  {
    "id": "hd-16",
    "nameAr": "كابتشينو",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=15"
  },
  {
    "id": "hd-17",
    "nameAr": "كاكاو",
    "price": 3000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=16"
  },
  {
    "id": "hd-18",
    "nameAr": "سبانش لاتيه",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=17"
  },
  {
    "id": "hd-19",
    "nameAr": "قهوة عثمانية",
    "price": 2500,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=18"
  },
  {
    "id": "hd-20",
    "nameAr": "هوت لوتس",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=19"
  },
  {
    "id": "hd-21",
    "nameAr": "هوت بستاشيو",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=20"
  },
  {
    "id": "hd-22",
    "nameAr": "سحلب",
    "price": 4000,
    "categoryId": "hot-drinks",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80&sig=21"
  }
];
