import React, {SyntheticEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {pause, swap} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

export type TInputStringArr = {
    index: number
    name: string
    status: ElementStates
}

export const StringComponent: React.FC = () => {
    const [inputString, setInputString] = useState<string>('')
    const [startMove, setMove] = useState<boolean>(false)
    const [arr, setArr] = useState<TInputStringArr[]>([])
    
    const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
        setInputString(e.currentTarget.value)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inputStringArr = inputString.split('').map((item, i) => {
            return {
                index: i,
                name: item,
                status: ElementStates.Default
            }
        })
        await moveElement(inputStringArr)
    }
    
    async function moveElement(arr: TInputStringArr[]) {
        setMove(true)
  
        for (let start = 0, end = arr.length - 1; start <= end; start++, end--) {
            if (end === start) {
                arr[start].status = ElementStates.Modified;
                setArr([...arr]);
                
                await pause(DELAY_IN_MS);
                
                setMove(false);
            }
            else {
                setArr([...arr]);
                await pause(DELAY_IN_MS);
                
                arr[start].status = ElementStates.Changing;
                arr[end].status = ElementStates.Changing;
                setArr([...arr]);
                
                await pause(DELAY_IN_MS);
                
                swap(arr, start, end);
                arr[start].status = ElementStates.Modified;
                arr[end].status = ElementStates.Modified;
                setArr([...arr]);
                
                await pause(DELAY_IN_MS);
            }
        }
        setMove(false);
        
    }
    
  return (
    <SolutionLayout title="Строка">
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                onChange={(e) => handleInput(e) }
                isLimitText={true} 
                maxLength={11} 
            />
            <Button text="Развернуть" type="submit" isLoader={startMove}/>
        </form>
        <div className={styles.circle}>
            {arr.map((item, i) => {
               return <Circle key={item.index} letter={item.name} state={item.status}/>
            })}
        </div>
    </SolutionLayout>
  );
};
