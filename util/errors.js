exports.BadRequest = function(){
  return {
    httpCode: 400,
    message: 'Bad Request'
  }
}


exports.NotFoundError = function(){
  return {
    httpCode: 404,
    message: 'Not Found'
  }
}

exports.Unknown = function(message){
  return {
    httpCode: 500,
    message: message
  }
}
