import myplants from '../models/myplants.js'
import users from '../models/users.js'

export const createMyplant = async (req, res) => {
  try {
    // 檢查購物車是不是空的
    if (req.user.plantCart.length === 0) {
      res.status(400).json({ success: false, message: '茶樹願望清單是空的' })
      return
    }
    // 檢查是否有下架商品
    let result = await users.findById(req.user._id, 'plantCart').populate('plantCart.t_id')
    // every 針對function跑迴圈，看是否每個東西都return true
    const treeCanCheckout = result.plantCart.every(plantCart => {
      return plantCart.t_id.sell
    })
    if (!treeCanCheckout) {
      res.status(400).json({ success: false, message: '包含下架茶樹' })
      return
    }
    // 建立訂單
    result = await myplants.create({ u_id: req.user._id, trees: req.user.plantCart })
    // 清空購物車
    req.user.plantCart = []
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getMyPlants = async (req, res) => {
  try {
    const result = await myplants.find({ u_id: req.user._id }).populate('trees.t_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllMyPlants = async (req, res) => {
  try {
    // .populate(關聯資料路徑, 取的欄位)
    const result = await myplants.find().populate('trees.t_id').populate('u_id', 'account')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
