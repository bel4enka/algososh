import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import {pause} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import styles from "../stack-page/styles.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Queue} from "./queue";

const queue = new Queue(7)

export type TValueObj = {
  name: string
  status: ElementStates
  tail: boolean
  head: boolean
}

export const QueuePage: React.FC = () => {
  const initialArr: TValueObj[] = Array.from(
    { length: 7 },
    () => ({
      name: "",
      status: ElementStates.Default,
      tail: false,
      head: false
    })
  );
  const [inputValue, setInputValue] = useState<string>('')
  const [startChange, setChange] = useState<string>('')
  const [arr, setArr] = useState<TValueObj[]>(initialArr);

  
  const addElement = async () => {
    
    queue.enqueue(inputValue)
    setInputValue('')
    setChange('addElement')
    
    arr[queue.getHead()].head = true;

    if (queue.getTail() > 0) {
      arr[queue.getTail() - 1].tail = false
    }
    
    arr[queue.getTail()].name = inputValue;
    arr[queue.getTail()].tail = true;
    arr[queue.getTail()].status = ElementStates.Changing;
    
    await pause(SHORT_DELAY_IN_MS);
    
    arr[queue.getTail()].status = ElementStates.Default;
    setChange('');
  }

  const deleteElement = async () => {
    setChange('deleteElement')
    
    if (queue.getHead() === queue.getTail()) {
       deleteAll();
    } else {
      queue.dequeue();
      arr[queue.getHead() - 1].status = ElementStates.Changing;
      
      await pause(SHORT_DELAY_IN_MS);
      
      arr[queue.getHead() - 1].status = ElementStates.Default;
      
      if (queue.getHead() > 0) {
        arr[queue.getHead() - 1].head = false
        arr[queue.getHead() - 1].name = "";
      }
      arr[queue.getHead()].head = true;
    }

    setChange('')
  }

  const deleteAll = () => {
    setChange('deleteAll')
    
    queue.clear()
    setArr([...initialArr]);
    setInputValue('')
    setChange('')
  }
  return (
      <SolutionLayout title="Очередь">
        <form className={styles.form}>
          <Input
              onChange={(e) => setInputValue(e.currentTarget.value)}
              value={inputValue}
              isLimitText={true}
              maxLength={4}
              extraClass={styles.input}
          />
          <Button text="Добавить"
                  isLoader={startChange === 'addElement'}
                  onClick={addElement}
                  disabled={inputValue === ''}
          />
          <Button text="Удалить"
                  isLoader={startChange === 'deleteElement'}
                  extraClass='mr-16'
                  onClick={deleteElement}
                  disabled={queue.getHead() === 9 || startChange === 'addElement' || startChange === 'deleteAll'}
          />
          <Button text="Очистить"
                  isLoader={startChange === 'deleteAll'}
                  onClick={() => deleteAll()}
                  disabled={queue.getHead() === 9 || startChange === 'addElement' || startChange === 'deleteElement'}
          />
        </form>
        <div className={styles.circle}>
          {arr.map((item, i) => {
            return <Circle key={i}
                           letter={item.name}
                           index={i}
                           head={item.head ? 'head' : ''}
                           tail={item.tail ? 'tail' : ''}
                           state={item.status} /> })}
        </div>
      </SolutionLayout>
  );
};

