import {ElementStates} from "../../types/element-states";
import {pause, swap} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {TObj} from "./sorting-page";
import {Direction} from "../../types/direction";

interface IChangeState {
  (arg: boolean): void
}
export const bubbleSort = async (type: Direction, arr: TObj[], setAscending: IChangeState, setDescending: IChangeState, setArr: (arg: TObj[]) => void) => {
  type === "ascending"
    ? setAscending(true)
    : setDescending(true);
  const { length } = arr;

  if(!length) {
    return []
  }
  
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {

      arr[j].status = ElementStates.Changing;
      arr[j + 1].status = ElementStates.Changing;
      setArr([...arr]);

      await pause(SHORT_DELAY_IN_MS);

      if (
        (type === "ascending" ? arr[j].num : arr[j + 1].num) >
        (type === "ascending" ? arr[j + 1].num : arr[j].num)
      ) {
        swap(arr, j, j + 1);

        setArr([...arr]);
      }
      await pause(SHORT_DELAY_IN_MS);

      arr[j].status = ElementStates.Default;
      arr[j + 1].status = ElementStates.Default;

      if (j === length - i - 2) {
        arr[j + 1].status = ElementStates.Modified;
      }
      setArr([...arr]);

      await pause(SHORT_DELAY_IN_MS);
    }
  }
  arr.forEach((el) => (el.status = ElementStates.Modified));
  type === "ascending"
    ? setAscending(false)
    : setDescending(false);

  return arr
};