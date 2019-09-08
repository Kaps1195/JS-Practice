var readline = require("readline");
var request = require("request");

// Fetching the entire list here
const bohotBadaListKaPromise = new Promise((resolve, reject) => {
  const url = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";

  request.get(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      resolve(body.split("\n"));
    } else {
      reject("Failed to fetch list.");
    }
  });
});

// Taking the user input here
const userInputPromise = new Promise((resolve, reject) => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt("Enter string to search > ");
  rl.prompt();
  rl.on("line", line => {
  rl.close();

    if (!line.length) {
      reject("Invalid search term.");
    }

    resolve(line);
  });
});

// Calculating the similarity score
const stringSimilarityScore = (str1, str2) => {
  const dp = [];
  const m = str1.length;
  const n = str2.length;
  const min = (x, y, z) => {
    if (x <= y && x <= z) return x;
    if (y <= x && y <= z) return y;
    else return z;
  };

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i == 0) dp[i][j] = j;
      else if (j == 0) dp[i][j] = i;
      else if (str1.charAt(i - 1) == str2.charAt(j - 1))
        dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
};

const main = async () => {

  // Resolving both the promises here
  try {
    const [bohotBadaList, searchString] = await Promise.all([
      bohotBadaListKaPromise,
      userInputPromise
    ]);
    
    // Taking care of edge cases here
    let indexOfClosestMatchingString = -1;
    let lowestScore = Infinity;
    
    const startTime = Date.now();

    const matchedString = bohotBadaList.find((element, index) => {
      const score = stringSimilarityScore(element, searchString);
      if (score === 0) return true;

      if (score < lowestScore) {
        lowestScore = score;
        indexOfClosestMatchingString = index;
      }

      return false;
    });

    const endTime = Date.now();
    
    if (!matchedString) {
      console.log(
        "\nNo perfect match found. Closest matching string is: ",
        '"', bohotBadaList[indexOfClosestMatchingString], '"',
        ' with a similarity score of:',
        lowestScore,
        '(lower score indicates closer match).'
      );
    } else {
      console.log('\nPerfect match: ', matchedString);
    }
    console.log("Time taken by the algorithm: ", (endTime - startTime)/1000, "s")
    process.exit(0);
  } catch (error) {
    console.error("\n\n", error, " Exiting...");
    process.exit(1);
  }
};

main();