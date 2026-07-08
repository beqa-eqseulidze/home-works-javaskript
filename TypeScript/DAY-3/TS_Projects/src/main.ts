// 1. სიტყვების რაოდენობის დათვლის ფუნქცია
function countWords(sentences: string[]): number[] {
  return sentences.map(sentence => sentence.split(" ").length);
}

// მთავარი ფილტრაციის ფუნქცია
function filter(
  sentences: string[],
  isLong: boolean,
  limit: number
): string[] {
  const wordCounts = countWords(sentences);

  // 'sentence' ჩანაცვლდა '_'-ით, რადგან მისი მნიშვნელობა არ გამოიყენება
  return sentences.filter((_, index) => {
    if (isLong) {
      return wordCounts[index] >= limit;
    } else {
      return wordCounts[index] < limit;
    }
  });
}

const textData: string[] = [
  "ტაიპსკრიპტი კარგია",
  "მე დღეს ბევრი ვივარჯიშე კოდის წერაში",
  "სალამი"
];

// 3 ან მეტი სიტყვის მქონე წინადადებები
const longResult = filter(textData, true, 3);
console.log(longResult);
// ["მე დღეს ბევრი ვივარჯიშე კოდის წერაში"]


// 3-ზე ნაკლები სიტყვის მქონე წინადადებები
const shortResult = filter(textData, false, 3);
console.log(shortResult);
// ["ტაიპსკრიპტი კარგია", "სალამი"]