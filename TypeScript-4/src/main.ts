const textData: string[] = [
    "hello",
    "Frontend Develpment",
    "I live in georgia",
    "college college college"
];


//===================================================================================================

function countWordsInSentences(sentences: string[]): number[] {
    const wordCount: number[] = [];  //თითოეული წინადადების სიტყვების რაოდენობის შესანახად;
    for (let i = 0; i < sentences.length; i++) {
        wordCount.push(sentences[i].split(" ").length);  // words counting.
    }
    return wordCount;
}

//=============================================================================================================

function filterSentences(sentences: string[], isLong: boolean, limit: number): string[] {
    const wordCount: number[] = countWordsInSentences(sentences);  //სიტყვების რაოდენობა;
    const filtered: string[] = [];  //ფიტლრში ჩასავარდნი წინადადებებისთვის -[]

    for (let i = 0; i < sentences.length; i++) {
        if (isLong) {
            if (wordCount[i] >= limit) {         //index >=limit
                filtered.push(sentences[i]);
            }
        }
        else {
            if (wordCount[i] < limit) {         ///index < limit
                filtered.push(sentences[i]);
            }
        }
    }
    return filtered;
}

//========================================================================================================


const result: number[] = countWordsInSentences(textData);
console.log("word count -", result);


const longResult: string[] = filterSentences(textData, true, 3);
console.log("longs -", longResult);


const shortResult: string[] = filterSentences(textData, false, 3);
console.log("shorts -", shortResult);





