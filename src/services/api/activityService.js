import activitiesData from '../mockData/activity.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activitiesData]

const activityService = {
  async getAll() {
    await delay(250)
    return [...activities]
  },

  async getById(id) {
    await delay(200)
    const activity = activities.find(activity => activity.id === id)
    if (!activity) {
      throw new Error('Activity not found')
    }
    return { ...activity }
  },

  async create(activityData) {
    await delay(300)
    const newActivity = {
      ...activityData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }
    activities.unshift(newActivity)
    return { ...newActivity }
  },

  async update(id, activityData) {
    await delay(300)
    const index = activities.findIndex(activity => activity.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    activities[index] = { ...activities[index], ...activityData }
    return { ...activities[index] }
  },

  async delete(id) {
    await delay(250)
    const index = activities.findIndex(activity => activity.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    const deletedActivity = activities.splice(index, 1)[0]
    return { ...deletedActivity }
  }
}

export default activityService