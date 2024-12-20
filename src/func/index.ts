export function getRandomIndex(len: number, max: number): number[] {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < len) {
        const randomNumber = Math.floor(Math.random() * max);
        uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers) as number[];
}

export function clearArray(arr:Array<any>){
    const len = arr.length;
    arr.splice(0,len)
    return arr
}