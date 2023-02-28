export default (type) => {
  // next就是進到下一步的middleware
  return (req, res, next) => {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes(type)) {
      res.status(400).json({ success: false, message: '格式錯誤' })
      return
    }
    next()
  }
}
