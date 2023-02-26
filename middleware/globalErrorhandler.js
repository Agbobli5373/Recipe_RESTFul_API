//glaba error handler
const errorhandler = (err, req, res, next) => {
  //status
  const status = err.status ? err.status : "Failed";
  //massage
  const message = err.message;
  //stack
  const stack = err.stack;
  //status code
  const statusCode = err.status ? err.statusCode : 500;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

//page not found error
const notFound = (req,res,next) =>{
    const err = new Error(`Cant't find ${req.OriginalUrl} on the server`);
    next(err)
}


module.exports = { errorhandler , notFound};
