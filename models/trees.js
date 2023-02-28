import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名稱']
  },
  price: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少價格']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少上架狀態']
  },
  adopt: {
    type: Boolean,
    required: [true, '缺少認養狀態']
  },
  kid: {
    type: Boolean,
    required: [true, '缺少樹苗狀態']
  },
  flower: {
    type: Boolean,
    required: [true, '缺少開花狀態']
  },
  harvest: {
    type: Boolean,
    required: [true, '缺少收成狀態']
  },
  area: {
    type: String,
    required: [true, '缺少園區'],
    enum: {
      values: ['A園區', 'B園區', 'C園區'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('trees', schema)
