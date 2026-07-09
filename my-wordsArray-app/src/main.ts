const sentencesLists: string[] = [
  "ტაიპსკრიპტი კარგია გამარჯობა",
  "ტაიპსკრიპტი კარგია",
  "გამარჯობა",
  "სიტყვებზე სავარჯიშო დავალების შესრულება",
  "სიტყვების დამთვლელი აპლიკაციის პროგრამის პროტოტიპი"
]
console.log(sentencesLists)
function countWordsInSentences(sentences: string[]): number[] {
  return sentences.map((sentence) => {
    const wordsArray = sentence.trim().split(" ");
    return wordsArray.length
  })
};

const wordCounts = countWordsInSentences(sentencesLists);
console.log(wordCounts);

function filterSentences(sentences: string[], isLong: boolean, limit: number): string[] {
  const wordCounts = countWordsInSentences(sentences);
  return sentences.filter((sentence, i) => {
    const currentWordCount: number = wordCounts[i];
    if (isLong) {
      return currentWordCount >= limit;
    } else {
      return currentWordCount < limit;
    }
  })
};


const longResult: string[] = filterSentences(sentencesLists, true, 4);
console.log("გრძელი წინადადებები:", longResult);

const shortResult: string[] = filterSentences(sentencesLists, false, 4);
console.log("მოკლე წინადადებები:", shortResult);