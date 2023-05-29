
const notfounduser=(req,resp,next)=>{
  const error= new Error(`Not found- ${req.originalUrl}`)
  resp.status(404)
  next(error)
}

module.exports=notfounduser


