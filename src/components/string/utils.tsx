import {swap} from "../../utils";
import {TInputStringArr} from "./string";
import {ElementStates} from "../../types/element-states";

interface IChangeStatusFunc {
  (arr: TInputStringArr[],
   change: ElementStates,
   start: number,
   end: number): Promise<void>
}

export const reversString = async (arr: TInputStringArr[], changeStatus: IChangeStatusFunc, change: ElementStates, modified: ElementStates) => {
  let start = 0;
  let end = arr.length - 1
  
  while (start <= end) {
    await changeStatus(arr, change, start, end)
    swap(arr, start, end);
    await changeStatus(arr, modified, start, end)
    start++;
    end--;
  }

  return arr;
}