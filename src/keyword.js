const createKeywords = (name, resultArr) => {
    function containsNonLatinCodepoints(s) {
      return /[^\u0000-\u00ff]/.test(s);
    }
    if (name === undefined || name === null) { name = "" }
    name = String(name);
    let curName = '';
    let temp = name;
    let len = name.split(' ').length;
    for (let i = 0; i < len; i++) {
      for (let k = 0; k < temp.split('').length; k++) {
      let  letter = temp[k]
        curName += letter.toLowerCase();
        if (!resultArr.includes(curName) && !containsNonLatinCodepoints(curName)) {
          resultArr.push(curName);
        }
      }
      temp = temp.split(' ')
      temp.splice(0, 1);
      temp = temp.join(" ")
      curName = '';
    }
  }

  export default createKeywords;