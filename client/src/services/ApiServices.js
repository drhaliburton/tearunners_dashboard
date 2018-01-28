import Api from '@/services/Api'

export default {
  fetchSubscriptions() {
    return Api().get('subscriptions')
  },
  fetchShipments() {
    return Api().get('shipments')
  },
  updateShippingData(params) {
    return Api().post('shipments', params)
  },
  getCratejoyShippingData(params) {
    return Api().get('/api/shipments')
  },
  getCratejoySubscriptionData(params) {
    return Api().get('/api/subscriptions')
  }
};