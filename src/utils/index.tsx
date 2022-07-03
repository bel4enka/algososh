
export const swap = (arr: any[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    
}

export const pause = (delay:number) => {
    return new Promise(resolve => setTimeout(resolve, delay));
}

export const fibArr = (n: number, memo: Record<number, number> = {}): number => {

    if (n in memo) {
        return memo[n];
    }
    if (n <= 2) {
        return 1;
    }
    memo[n] = fibArr(n - 1, memo) + fibArr(n - 2, memo);
    return memo[n];
}

export const random = () => {

    const getRandomArbitrary = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const lengthArr = getRandomArbitrary(3, 17)
    const maxNum = getRandomArbitrary(30, 100)

    const randomArr = (lengthArr:number, maxNum:number): number[] => {
        const arr = Array.from({length: lengthArr}, () => Math.floor(Math.random() * maxNum))
        return Array.from(new Set(arr))
    }
    return randomArr(lengthArr, maxNum)
}