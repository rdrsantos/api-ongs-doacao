module.exports = new class Helpers{
  firstLetterUppercase(str){
    let string = str.trim().toLowerCase();
    return string[0].toUpperCase() + string.substr(1);
  }
}