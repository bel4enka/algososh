import React, {SyntheticEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./style.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {fibArr, pause} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputString, setInputString] = useState<number>(0)
  const [startShow, setShow] = useState<boolean>(false)
  const [arr, setArr] = useState<number[]>([])

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputString(+e.currentTarget.value)
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      setShow(true)
      const arr = []
      
      for (let i = 1; i <= inputString + 1; i++) {
        arr.push(fibArr(i))
        setArr([...arr])
        
        await pause(SHORT_DELAY_IN_MS)
      }

      setShow(false)
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
            placeholder={'Введите число'}
            onChange={(e) => handleInput(e) }
            isLimitText={true}
            type="number"
            max={19}
        />
        <Button text="Рассчитать" type="submit" isLoader={startShow} disabled={inputString < 0}/>
      </form>
      <div className={styles.circle}>
        {arr.map((item, i) => {
          return <Circle key={i} letter={""+item} index={i}/>
        })}
      </div>
    </SolutionLayout>
  );
};
