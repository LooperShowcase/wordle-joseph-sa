const express = require("express");
const port = process.env.PORT || 3000
const app = express();

const ourWord = "HELLO";

app.get("/word/:guess", (req, res) => {
  const guess = req.params.guess;

  let ourWordMap = {};

  for (let letter of ourWord) {
    let count = occurrences(ourWord, letter);
    ourWordMap[letter] = count;
  }

  // for (let letter of guess) {
  //   resultsMap[letter] = 0;
  // }
  let responseMap = [];
  for (let i = 0; i < guess.length; i++) {
    let letterInGuess = guess[i];
    if (ourWordMap[letterInGuess] !== undefined) {
      if (letterInGuess == ourWord[i] && ourWordMap[letterInGuess] !== 0) {
        responseMap.push("green");
        ourWordMap[letterInGuess]--;
      } else if (ourWordMap[letterInGuess] !== 0) {
        responseMap.push("yellow");
        ourWordMap[letterInGuess]--;
      }
    } else {
      responseMap.push("gray");
    }
  }
  console.log(responseMap);
  res.send(responseMap);
});

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see https://stackoverflow.com/a/7924240/938822
 */
function occurrences(string, subString, allowOverlapping) {
  string += "";
  subString += "";
  if (subString.length <= 0) return string.length + 1;

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

app.get("/check", (req, res) => {});
app.use(express.static("public"));
app.listen(port, () => console.log("Server running on port " + 3000));
