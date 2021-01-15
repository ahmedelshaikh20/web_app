module.exports = function () {
   let cookie = document.cookie
   if(cookie) { return true}
   return false;
 
}
