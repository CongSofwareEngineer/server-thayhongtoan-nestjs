import { FILTER_BILL } from './app'

export const TYPE_NOTIFICATION = {
  myCart: 'myCart',
  myBill: 'myBill',
  shoesShop: 'shoesShop',
  gift: 'gift',
  event: 'event',
  newChatMessages: 'newChatMessages',
}

export const DATA_SEND_NOTI = {
  [FILTER_BILL.DeliverySuccess]: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.myBill,
      type: TYPE_NOTIFICATION.myBill,
    },
    notification: {
      title: 'Đã giao hàng thành công',
      body: 'Đơn hàng đã giao thành công',
    },
  },
  [FILTER_BILL.Delivering]: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.myBill,
      type: TYPE_NOTIFICATION.myBill,
    },
    notification: {
      title: 'Đã xác nhận đơn hàng',
      body: 'Đơn hàng đang được vận chuyển. Mong bạn chú ý điện thoại để nhận hàng',
    },
  },
  [FILTER_BILL.Canceled]: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.myBill,
      type: TYPE_NOTIFICATION.myBill,
    },
    notification: {
      title: 'Giao hàng thất bại',
      body: 'Đơn hàng giao không thành công. Có thể bạn đã bỏ lỡ cuộc gọi shipper',
    },
  },
  [FILTER_BILL.Processing]: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.myBill,
      type: TYPE_NOTIFICATION.myBill,
    },
    notification: {
      title: 'Có người mua hàng',
      body: 'Đơn hàng giao không thành công. Có thể bạn đã bỏ lỡ cuộc gọi shipper',
    },
  },
  [FILTER_BILL.DeliveryFail]: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.myBill,
      type: TYPE_NOTIFICATION.myBill,
    },
    notification: {
      title: 'Người mua ko nhận hàng',
      body: 'Đơn hàng giao không thành công. Khách hàng boom hàng',
    },
  },
  NewChatMessages: {
    data: {
      id: '1',
      name: TYPE_NOTIFICATION.newChatMessages,
      type: TYPE_NOTIFICATION.newChatMessages,
    },
    notification: {
      title: 'Có khách hàng cần tư vấn',
      body: 'Khách hàng cần tư vấn',
    },
  },
}
