import dealsData from '../mockData/deal.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let deals = [...dealsData]

const dealService = {
  async getAll() {
    await delay(350)
    return [...deals]
  },

  async getById(id) {
    await delay(200)
    const deal = deals.find(deal => deal.id === id)
    if (!deal) {
      throw new Error('Deal not found')
    }
    return { ...deal }
  },

  async create(dealData) {
    await delay(400)
    const newDeal = {
      ...dealData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    deals.push(newDeal)
    return { ...newDeal }
  },

  async update(id, dealData) {
    await delay(300)
    const index = deals.findIndex(deal => deal.id === id)
    if (index === -1) {
      throw new Error('Deal not found')
    }
    deals[index] = { ...deals[index], ...dealData }
    return { ...deals[index] }
  },

  async delete(id) {
    await delay(250)
    const index = deals.findIndex(deal => deal.id === id)
    if (index === -1) {
      throw new Error('Deal not found')
    }
    const deletedDeal = deals.splice(index, 1)[0]
    return { ...deletedDeal }
  }
}

export default dealService