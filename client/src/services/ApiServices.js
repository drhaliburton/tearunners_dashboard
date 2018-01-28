import Api from '@/services/Api'

export default {
  fetchShipments() {
    return Api().get('shipments')
  },
  getCratejoyShippingData() {
    return Api().get('/api/shipments')
  },
  getCratejoySubscriptionData() {
    return Api().get('/api/subscriptions')
  }
};