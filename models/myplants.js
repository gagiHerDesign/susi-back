import { Schema, model, ObjectId } from 'mongoose'

const myplantSchema = new Schema({
  t_id: {
    type: ObjectId,
    ref: 'trees',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  }
})

// 一年後的時間戳記
const now = new Date()
const oneYearLater = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000))
const finalDate = oneYearLater.toISOString()

const schema = new Schema({
  u_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  trees: {
    type: [myplantSchema],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  end: {
    type: Date,
    default: finalDate
  },
  send: {
    type: Number,
    // 0 = 贈品未出貨
    // 1 = 贈品已出貨
    default: 0
  }
}, { versionKey: false })

export default model('myplants', schema)
