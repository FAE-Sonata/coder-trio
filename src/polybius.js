const polybiusModule = (function () {
  const BEGIN_DIGIT = "0".charCodeAt(0);
  const BEGIN_LOWER = "a".charCodeAt(0);
  const SQ_LEN = 5;
  const FUSED_CHAR = "i";
  const EN_LETTERS = 26;

  function isLowerAlpha(asciiCode) {
    return (asciiCode >= BEGIN_LOWER) && (asciiCode < BEGIN_LOWER + EN_LETTERS);
  }

  function reverseString(s) {
    return s.split("").reverse().join("");
  }

  /**
   * 
   * @param {String} s One character of input to be encoded
   */
  function getGrid(s) {
    const thisAscii = s.charCodeAt(0);
    // ignore non-alpha characters
    if(!isLowerAlpha(thisAscii)) return s;

    let offset = thisAscii - BEGIN_LOWER;
    let res = [];
    if(s <= FUSED_CHAR) {
      res.push(offset % SQ_LEN + 1);
      res.push(Math.ceil((offset + 1) / SQ_LEN));
    }
    else  {
      let mod = offset % SQ_LEN;
      if(!mod) mod = SQ_LEN;
      res.push(mod);
      res.push(Math.ceil(offset / SQ_LEN));
    }
    return res.join("");
  }

  function polybius(input, encode = true) {
    if(!encode) {
      // check malformed
      const noSpaces = input.replace(/\s/, "");
      if(noSpaces.length % 2 != 0) return false;
      const words = input.split(/\s/);
      for(let k = 0; k < words.length; k++)
        if(words[k].length % 2 != 0) return false;

      let uniqueChars = [...new Set(noSpaces)];
      for(let s of uniqueChars) {
        let thisAscii = s.charCodeAt(0);
        if(!(thisAscii > BEGIN_DIGIT && thisAscii <= BEGIN_DIGIT + SQ_LEN))
          return false;
      }
      // now valid
      const FUSED_GRID = getGrid(FUSED_CHAR);
      const REV_GRID = parseInt(reverseString(FUSED_GRID));
      const SECOND_FUSED = String.fromCharCode(FUSED_CHAR.charCodeAt(0) + 1);

      let decodedWords = [];
      for(let k = 0; k < words.length; k++) {
        const thisWord = words[k];
        let decoded = "";
        for(let j = 0; j < thisWord.length / 2; j++)  {
          const thisPair = thisWord.substr(2 * j, 2);
          if(thisPair == FUSED_GRID)  {
            decoded += "(" + FUSED_CHAR + "/" + SECOND_FUSED + ")";
            continue;
          }

          const y = parseInt(thisPair.charAt(1));
          const x = parseInt(thisPair.charAt(0));
          let offset = (y-1) * SQ_LEN + x;

          const pairReversed = parseInt(reverseString(thisPair));
          if(pairReversed < REV_GRID)
            offset--;
          decoded += String.fromCharCode(BEGIN_LOWER + offset);
        }
        decodedWords.push(decoded);
      }
      return decodedWords.join(" ");
    }
    else  {
      const lowered = input.toLowerCase();
      const arrLowered = [...lowered]; // converts to array
      const arrGrid = arrLowered.map(s => getGrid(s));
      return arrGrid.join("");
    }
  }

  return {
    polybius,
  };
})();

module.exports = polybiusModule.polybius;