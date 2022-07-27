import React, {SyntheticEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {pause} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {reversString} from "./utils";

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
    const handleClick = async () => {
        const inputStringArr = inputString.split('').map((item, i) => {
            return {
                index: i,
                name: item,
                status: ElementStates.Default
            }
        })
        
        await moveElement(inputStringArr)
    }
    
    const changeStatus = async (arr: TInputStringArr[], status: ElementStates, startIndex: number, endIndex: number) => {
        arr[startIndex].status = status
        
        if(endIndex) {
            arr[endIndex].status = status
        }
        setArr([...arr])
        await pause(DELAY_IN_MS)
    }
    
    async function moveElement(arr: TInputStringArr[]) {
        setMove(true)
        await reversString(arr, changeStatus, ElementStates.Changing, ElementStates.Modified)
        setMove(false)
    }
    
  return (
    <SolutionLayout title="Строка">
        <form className={styles.form} >
            <Input
                onChange={(e) => handleInput(e) }
                isLimitText={true} 
                maxLength={11} 
            />
            <Button text="Развернуть" 
                    type="button" 
                    isLoader={startMove}
                    disabled={inputString === ''}
                    onClick={handleClick}
            />
        </form>
        <div className={styles.circle}>
            {arr.map((item, i) => {
               return <Circle key={item.index} letter={item.name} state={item.status}/>
            })}
        </div>
    </SolutionLayout>
  );
};
