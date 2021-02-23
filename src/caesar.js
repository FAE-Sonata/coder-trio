const caesarModule = (function () {
  const EN_LETTERS = 26;
  // const BEGIN_CAPITALS = "A".charCodeAt(0);
  const BEGIN_LOWER = "a".charCodeAt(0);
  function isLowerAlpha(asciiCode) {
    return (asciiCode >= BEGIN_LOWER) && (asciiCode < BEGIN_LOWER + EN_LETTERS);
  }

  function processShift(asciiCode, shiftBy) {
    if(!isLowerAlpha(asciiCode)) return String.fromCharCode(asciiCode);

    const offset = asciiCode - BEGIN_LOWER;
    const prelimOffset = offset + shiftBy;
    let finalOffset = prelimOffset;
    if(prelimOffset < 0) finalOffset += EN_LETTERS;
    else if(prelimOffset >= EN_LETTERS) finalOffset -= EN_LETTERS;
    return String.fromCharCode(BEGIN_LOWER + finalOffset);
  }

  function caesar(input, shift, encode = true) {
    // shift == 0 or shift is null / undefined
    if(!shift || Math.abs(shift) >= EN_LETTERS) return false;
    const lowered = input.toLowerCase();
    const rangeNumChars = [...Array(input.length).keys()];
    const loweredAscii = rangeNumChars.map(x => lowered.charCodeAt(x));
    let res = [];
    if(encode)
      res = loweredAscii.map(x => processShift(x, shift));
    else
      res = loweredAscii.map(x => processShift(x, -shift));
    return res.join("");
  }

  return {
    caesar,
  };
})();

module.exports = caesarModule.caesar;