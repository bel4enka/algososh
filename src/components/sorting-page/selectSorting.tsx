import {ElementStates} from "../../types/element-states";
import {pause, swap} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {TObj} from "./sorting-page";
import {Direction} from "../../types/direction";

interface IChangeState {
  (arg: boolean): void
}

export const selectSort = async (type: Direction, arr: TObj[], setAscending: IChangeState, setDescending: IChangeState, setArr: (arg: TObj[]) => void) => {
  type === "ascending"
    ? setAscending(true)
    : setDescending(true);

  const { length } = arr;
  
  if(!length) {
    return []
  }

  for (let i = 0; i < length - 1; i++) {
    let compareInd = i;
    arr[compareInd].status = ElementStates.Changing;

    for (let j = i + 1; j < length; j++) {

      arr[j].status = ElementStates.Changing;
      setArr([...arr]);

      await pause(SHORT_DELAY_IN_MS);

      if ((type === "ascending" ? arr[compareInd].num : arr[j].num) >
        (type === "ascending" ? arr[j].num : arr[compareInd].num)) {
        arr[compareInd].status = i === compareInd ? ElementStates.Changing : ElementStates.Default;
        compareInd = j;
        setArr([...arr]);

        await pause(SHORT_DELAY_IN_MS);
      }
      if (j !== compareInd) {
        arr[j].status = ElementStates.Default;
        setArr([...arr]);

        await pause(SHORT_DELAY_IN_MS);
      }
    }
    if (i === compareInd) {
      arr[i].status = ElementStates.Modified;
      setArr([...arr]);

      await pause(SHORT_DELAY_IN_MS);

    } else {
      swap(arr, compareInd, i);
      arr[i].status = ElementStates.Modified;
      setArr([...arr]);

      await pause(SHORT_DELAY_IN_MS);
    }
  }
  arr[length -1].status = ElementStates.Modified

  type === "ascending" ? setAscending(false) : setDescending(false);
  return arr
};