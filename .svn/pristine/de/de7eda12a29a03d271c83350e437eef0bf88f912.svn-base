export default (value, oldtag, newtag) => {
  if (!value) return false;

  var reg = new RegExp(oldtag, "g"); //创建正则RegExp对象   
  var newValue = value.replace(reg, newtag);
  return newValue;
};
