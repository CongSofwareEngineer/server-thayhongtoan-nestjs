export enum DB_COLLECTION {
  Register = 'Register',
  Class = 'Class',
  Student = 'Student',
  Attendance = 'Attendance',
  Teacher = 'Teacher',
}

export enum PATH_IMG {
  MyService = 'my-services',
  Users = 'users',
  Comment = 'comment',
  Products = 'products',
  ContactMe = 'contact-me',
  Category = 'category',
  FanPage = 'FanPage',
}

export const DB_NAME = 'thay-hong-toan'

export enum MATH_DB {
  $all = '$all',
  $in = '$in',
  $gt = '$gt',
  // >=
  $gte = '$gte',
  // <=
  $lte = '$lte',
  $lt = '$lt',
  $nor = '$nor',
  $and = '$and',
  $or = '$or',
  $where = '$where',
  $MergeObjects = '$mergeObjects',
  $regex = '$regex',
  $elemMatch = '$elemMatch',
}

const FILTER_BASE_DB = {
  id: 'id',
  sdt: 'sdt',
}

export enum KEY_OPTION_FILTER_DB {
  Product = 'Product',
  Bill = 'Bill',
  Revenue = 'Revenue',
  User = 'User',
  Cart = 'Cart',
  Comment = 'Comment',
  Voucher = 'Voucher',
}

export const OPTION_FILTER_DB = {
  [KEY_OPTION_FILTER_DB.Product]: {
    ...FILTER_BASE_DB,
    keyName: 'keyName',
  },
  [KEY_OPTION_FILTER_DB.Bill]: {
    ...FILTER_BASE_DB,
    type: 'type',
    date: 'date',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    status: 'status',
    idUser: 'idUser',
    sdt: 'sdt',
    name: 'name',
  },
  [KEY_OPTION_FILTER_DB.User]: {
    ...FILTER_BASE_DB,
    isAdmin: 'isAdmin',
  },
  [KEY_OPTION_FILTER_DB.Cart]: {
    ...FILTER_BASE_DB,
    date: 'date',
  },
  [KEY_OPTION_FILTER_DB.Comment]: {
    ...FILTER_BASE_DB,
    date: 'date',
    idProduct: 'idProduct',
  },
  [KEY_OPTION_FILTER_DB.Revenue]: {
    ...FILTER_BASE_DB,
    date: 'date',
    dateStart: 'dateStart',
    dateEnd: 'dateEnd',
    category: 'category',
    status: 'status',
  },
  [KEY_OPTION_FILTER_DB.Voucher]: {
    ...FILTER_BASE_DB,
    type: 'type',
    date: 'date',
    expired: 'expired',
    name: 'name',
  },
}

export const DEFAULT_SIZE_SHOES = {
  Shoes: {
    minSize: 29,
    maxSize: 45,
  },
  Price: {
    min: 100000,
    max: 5000000,
  },
}
