import Api from '@/services/Api'

export default {
  fetchProducts() {
    return Api().get('products')
  },
  fetchShipments() {
    return Api().get('shipments')
  },
  updateShippingData(params) {
    return Api().post('shipments', params)
  },
  getCratejoyShippingData(params) {
    return Api().get('/api/shipments')
  }
};