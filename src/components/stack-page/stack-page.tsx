import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./styles.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Stack} from "./stack";
import {pause} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>()

export const StackPage: React.FC = () => {
        
  const [inputString, setInputString] = useState<string>('')
  const [startChange, setChange] = useState<string>('')
  const [arr, setArr] = useState<Array<string>>([]);
  const [color, setColor] = useState<ElementStates>(ElementStates.Default)
  
    const addElement = async () => {
        stack.push(inputString, setArr)
        setInputString('')
        
        setChange('addElement')
        setColor(ElementStates.Changing)
        
        await pause(SHORT_DELAY_IN_MS)
        
        setChange('')
        setColor(ElementStates.Default)
    }
    
    const deleteElement = async () => {
      setChange('deleteElement')
      setInputString('')
      setColor(ElementStates.Changing)
        
      await pause(SHORT_DELAY_IN_MS)
        
      setColor(ElementStates.Default)
      stack.pop(setArr)
        
      await pause(SHORT_DELAY_IN_MS)

      setChange('')
    }
    
    const deleteAll = async () => {
      setChange('deleteAll')
      
      await pause(SHORT_DELAY_IN_MS)
        
      stack.clear(setArr)
      setInputString('')
      setChange('')
    }
    

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input
            onChange={(e) => setInputString(e.currentTarget.value) }
            value={inputString}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
        />
        <Button text="Добавить" 
                isLoader={startChange === 'addElement'} 
                onClick={addElement}
                disabled={inputString === ''}
        />
        <Button text="Удалить" 
                isLoader={startChange === 'deleteElement'} 
                extraClass='mr-16' 
                onClick={deleteElement}
                disabled={!(stack.getSize() > 0) || startChange === 'addElement' || startChange === 'deleteAll'}
        />
        <Button text="Очистить" 
                isLoader={startChange === 'deleteAll'} 
                onClick={() => deleteAll()}
                disabled={!(stack.getSize() > 0) || startChange === 'addElement' || startChange === 'deleteElement'}
        />
      </form>
      <div className={styles.circle}>
        {arr.map((item, i) => {
          return <Circle key={i} 
                     letter={item} 
                     index={i} 
                     head={stack.peak() === i ? 'top' : ''} 
                     state={stack.peak() === i ? color : undefined} /> })}
      </div>
    </SolutionLayout>
  );
};
