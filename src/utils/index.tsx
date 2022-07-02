import {TInputStringArr} from "../components/string/string";

export const swap = (arr: TInputStringArr[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    firstIndex++
    secondIndex--
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