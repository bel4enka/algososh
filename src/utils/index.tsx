import {TInputStringArr} from "../components/string/string";
import {DELAY_IN_MS} from "../constants/delays";

export const swap = (arr: TInputStringArr[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    firstIndex++
    secondIndex--
}

export const pause = (delay:number) => {
    return new Promise(resolve => setTimeout(resolve, delay));
}