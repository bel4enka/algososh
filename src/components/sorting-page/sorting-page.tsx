import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./styles.module.css";
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {random} from "../../utils";
import {Column} from "../ui/column/column";
import {ElementStates, NameSort} from "../../types/element-states";
import {bubbleSort} from './bubbleSorting'
import {selectSort} from "./selectSorting";

export type TObj = {
  num: number
  status?: ElementStates
}

export const SortingPage: React.FC = () => {
  
  const [nameSort, setNameSort] = useState<string>('select')
  const [arr, setArr] = useState<TObj[]>([])
  const [descending, setDescending] = useState<boolean>(false)
  const [ascending, setAscending] = useState<boolean>(false)
  
  useEffect(() => {
    createNewObj()
  },[])

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
            disabled={descending}
            sorting={Direction.Ascending} 
            extraClass='ml-16' 
            onClick={()=> nameSort === NameSort.Bubble 
              ? bubbleSort(Direction.Ascending, arr, setAscending, setDescending, setArr) 
              : selectSort(Direction.Ascending, arr, setAscending, setDescending, setArr)}/>
        <Button 
            text="По убыванию" 
            isLoader={descending}
            disabled={ascending}
            sorting={Direction.Descending} 
            extraClass='mr-16'
            onClick={()=> nameSort === NameSort.Bubble 
              ? bubbleSort(Direction.Descending, arr, setAscending, setDescending,  setArr) 
              : selectSort(Direction.Descending, arr, setAscending, setDescending, setArr)}
        />
        <Button text="Новый массив" 
                disabled={ascending || descending} 
                extraClass='ml-16' 
                onClick={createNewObj}/>
      </form>
      <div className={styles.column}>
        {arr.map((item, i) => {
          return <Column index={item.num} key={item.num} state={item.status}/> 
        })}
      </div>
    </SolutionLayout>
  );
};
