const substitutionModule = (function () {
  const BEGIN_LOWER = "a".charCodeAt(0);
  const EN_LETTERS = 26;

  function isLowerAlpha(asciiCode) {
    return (asciiCode >= BEGIN_LOWER) && (asciiCode < BEGIN_LOWER + EN_LETTERS);
  }

  /**
   * 
   * @param {string} standard character using standard Latin encoding
   * @param {string} alphabet the same alphabet that was passed into substitution()
   */
  function convertChar(standard, alphabet)  {
    const asciiCode = standard.charCodeAt(0);
    if(!isLowerAlpha(asciiCode)) return standard;
    return alphabet.charAt(asciiCode - BEGIN_LOWER);
  }

  /**
   * 
   * @param {string} s character using the encoding provided by alphabet
   * @param {string} alphabet the same alphabet that was passed into substitution()
   */
  function decode(s, alphabet)  {
    const idx = alphabet.lastIndexOf(s);
    if(idx < 0) return s; // not found in provided alphabet; accounts for spaces
    else return String.fromCharCode(BEGIN_LOWER + idx);
  }

  function substitution(input, alphabet, encode = true) {
    /** check malformed alphabet **/
    // spaces preserved during encoding / decoding, so should be ignored in alphabet
    if(alphabet === null || typeof(alphabet) != "string") return false;
    const noSpaces = alphabet.replace(/\s/, "");
    let uniqueChars = [...new Set(noSpaces)];
    if(noSpaces.length != EN_LETTERS || uniqueChars.length != EN_LETTERS)
      return false;
    const lower = input.toLowerCase();
    const lowerArr = [...lower];
    let res = [];
    if(encode) res = lowerArr.map(s => convertChar(s, alphabet));
    else res = lowerArr.map(s => decode(s, alphabet));
    return res.join("");
  }

  return {
    substitution,
  };
})();

module.exports = substitutionModule.substitution;