import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./styles.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {pause, random, swap} from "../../utils";
import {Column} from "../ui/column/column";
import {ElementStates, NameSort} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export type TObj = {
  num: number
  status: ElementStates
}
export const SortingPage: React.FC = () => {
  
  const [nameSort, setNameSort] = useState<string>('select')
  const [startShow, setShow] = useState<boolean>(false)
  const [arr, setArr] = useState<TObj[]>([])
  const [descending, setDescending] = useState<boolean>(false)
  const [ascending, setAscending] = useState<boolean>(false)
  
  useEffect(() => {
    createNewObj()
  },[])
  
  const bubbleSort = async (type: string) => {
    type === "ascending"
        ? setAscending(true)
        : setDescending(true);
    setShow(true);
    const { length } = arr;
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
    setShow(false);
    type === "ascending"
        ? setAscending(false)
        : setDescending(false);
  };

  const selectSort = async (type: string) => {
    type === "ascending"
        ? setAscending(true)
        : setDescending(true);
    setShow(true);
    
    const { length } = arr;

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
    setShow(false);
    
    type === "ascending" ? setAscending(false) : setDescending(false);
  };

  const createNewObj = () => {
    const arr = random()
    const newColumnObj = arr.map((item, i) => {
      return {
        num: item,
        status: ElementStates.Default
      }
    })
    setArr(newColumnObj)
  }
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
            label="Выбор"
            checked={nameSort === NameSort.Selected}
            onChange={() => setNameSort(NameSort.Selected)}
        />
        <RadioInput
            label="Пузырёк"
            checked={nameSort === NameSort.Bubble}
            onChange={() => setNameSort(NameSort.Bubble)}
        />
        <Button 
            text="По возрастанию" 
            isLoader={ascending} 
            sorting={Direction.Ascending} 
            extraClass='ml-16' 
            onClick={()=> nameSort === NameSort.Bubble ? bubbleSort("ascending") : selectSort("ascending")}/>
        <Button 
            text="По убыванию" 
            isLoader={descending} 
            sorting={Direction.Descending} 
            extraClass='mr-16'
            onClick={()=> nameSort === NameSort.Bubble ? bubbleSort("descending") : selectSort("descending")}
        />
        <Button text="Новый массив" isLoader={startShow} extraClass='ml-16' onClick={createNewObj}/>
      </form>
      <div className={styles.column}>
        {arr.map((item, i) => {
          return <Column index={item.num} key={item.num} state={item.status}/> 
        })}
      </div>
    </SolutionLayout>
  );
};
