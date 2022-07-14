import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./styles.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {customAlphabet, nanoid} from 'nanoid'
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {LinkedList} from "./LinkedList";
import {pause} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

export type TValueObjList = {
  name: string
  status: ElementStates
  tail?: boolean
  head?: boolean
  add?: boolean
  dell?: boolean
  miniCircle?: {
    name: string
  }
}
export const ListPage: React.FC = () => {
   
  const nano = customAlphabet('1234567890', 2)

  const initialArr: TValueObjList[] = Array.from(
    { length: 4 },
    () => ({
      name: nano(),
      status: ElementStates.Default,
      tail: false,
      head: false,
      add: false,
      dell: false,
    })
  );
  const linkedList =  new LinkedList<any>(initialArr)
  const maxLengthArr = 10
  const minLengthArr = 1
  
  const [inputValue, setInputValue] = useState<string>('')
  const [inputIndex, setInputIndex] = useState<number>(0)
  const [arr, setArr] = useState<TValueObjList[]>(initialArr)
  const [startChange, setChange] = useState<string>('')
  
  useEffect(() => {
    arr[0].head = true
    arr[arr.length-1].tail = true
    setArr([...arr])
  },[])
  
  
  const addElementHead = async () => {
    setChange('addHead')
    linkedList.prepend(inputValue);
    arr[0] = {
      ...arr[0],
      add: true,
      head: false,
      miniCircle: {
        name: inputValue,
      },
    };
    setArr([...arr])
    
    await pause(DELAY_IN_MS)

    arr[0] = {
      ...arr[0],
      add: false,
      miniCircle: undefined,
      head: false
    };
    setArr([...arr])
    
    await pause(DELAY_IN_MS)

    arr.unshift({
      name: inputValue,
      status: ElementStates.Modified,
    });
    setArr([...arr]);
    

    await pause(DELAY_IN_MS)
    
    arr[0] = {
      ...arr[0],
      status: ElementStates.Default,
      head: true
    }
    setArr([...arr]);
    setChange('')
    setInputValue('')
  }
  
  const addElementTail = async () => {
    setChange('addTail')

    linkedList.append(inputValue)
    arr[arr.length-1] = {
      ...arr[arr.length-1],
      tail: false,
      add: true,
      miniCircle: {
        name: inputValue,
      },
    };
    setArr([...arr])

    await pause(DELAY_IN_MS)

    arr[arr.length-1] = {
      ...arr[arr.length-1],
      add: false,
      miniCircle: undefined,
      tail: false
    };
    setArr([...arr])

    await pause(DELAY_IN_MS)

    arr.push({
      name: inputValue,
      status: ElementStates.Modified,
    });
    setArr([...arr]);


    await pause(DELAY_IN_MS)

    arr[arr.length-1] = {
      ...arr[arr.length-1],
      status: ElementStates.Default,
      tail: true
    }
    setArr([...arr])

    arr[arr.length-2] = {
      ...arr[arr.length-2],
      tail: false
    }
    setArr([...arr])
    
    setChange('')
    setInputValue('')
  }
  
  const deleteElementHead = async () => {
    setChange('deleteElementHead')
    arr[0] = {
      ...arr[0],
      head: false,
      name: '',
      dell: true,
      miniCircle: { name: arr[0].name},
    };
    setArr([...arr]);
    
    await pause(DELAY_IN_MS);
    
    arr.shift();
    arr[0].status = ElementStates.Modified;
    setArr([...arr]);
    
    await pause(DELAY_IN_MS);

    arr[0] = {
      ...arr[0],
      status: ElementStates.Default,
      head: true,
    };
    setArr([...arr]);
    
    setChange('')
  }
  
  const deleteElementTail = async () => {
    setChange('deleteElementTail')
    arr[arr.length-1] = {...arr[arr.length-1],
      tail: false,
      name: '',
      dell: true,
      miniCircle: {
        name: arr[arr.length-1].name,
      },
    };
    setArr([...arr]);
    await pause(DELAY_IN_MS);
    arr.pop(); 
    
    arr[arr.length-1].status = ElementStates.Modified;
    setArr([...arr]);
    
    await pause(DELAY_IN_MS);
    
    arr[arr.length-1].status = ElementStates.Default;
    setArr([...arr])
    
    arr[arr.length-1].tail = true
    
    setArr([...arr])
    setChange('')
  }
  
  const addElementIndex = async () => {
    if (inputIndex < 0 || inputIndex > linkedList.getSize()) {
      console.log('Enter a valid index');
      return;
    }
    setChange('addElementIndex')
    
    if(inputIndex === 0) {
      arr[0] = {
        ...arr[0],
        add: true,
        head: false,
        miniCircle: {
          name: inputValue,
        },
      };
      setArr([...arr])

      await pause(DELAY_IN_MS)

      arr[0] = {
        ...arr[0],
        add: false,
        miniCircle: undefined,
        head: false
      };
      setArr([...arr])

      await pause(DELAY_IN_MS)

      arr.unshift({
        name: inputValue,
        status: ElementStates.Modified,
      });
      setArr([...arr]);


      await pause(DELAY_IN_MS)

      arr[0] = {
        ...arr[0],
        status: ElementStates.Default,
        head: true
      }
    } else {

        linkedList.insertAt(inputValue, inputIndex!);
        for (let i = 0; i <= inputIndex; i++) {
          arr[i] = {
            ...arr[i], 
            add: true,
            miniCircle: {
              name: linkedList.getNodeByIndex(inputIndex),
            },
          };
          if (i > 0) {
            arr[i - 1] = {
              ...arr[i - 1], 
              add: false,
              miniCircle: undefined,
              status: ElementStates.Changing,
            }
          }
          setArr([...arr]);
          await pause(DELAY_IN_MS);
        }
        arr[inputIndex!] = {
          ...arr[inputIndex!], 
          add: false,
          miniCircle: undefined,
        };
        arr.splice(inputIndex, 0, {
          name: linkedList.getNodeByIndex(inputIndex!),
          status: ElementStates.Modified,
        });
        setArr([...arr]);
        
        await pause(DELAY_IN_MS);
        
        arr.forEach((el) => (el.status = ElementStates.Default));
        setArr([...arr])
    
        arr[1].head = false
        arr[0].head = true
    }
    setArr([...arr])
    setInputValue('')
    setChange('')
  }
  
  const deleteElementIndex = async () => {
    
    setChange('deleteElementIndex')
    for (let i = 0; i<= inputIndex; i++) {
      arr[i].status = ElementStates.Changing;
      if (i === inputIndex) {
      }
      setArr([...arr]);
      await pause(DELAY_IN_MS);
    }
    arr[inputIndex] = {
      ...arr[inputIndex], 
      name: '', 
      dell: true,
      miniCircle: {
        name: String(inputIndex),
      },
    };
    setArr([...arr]);
    
    await pause(DELAY_IN_MS);
    
    arr.splice(inputIndex, 1);
    setArr([...arr]);
    
    await pause(DELAY_IN_MS);
    
    arr.forEach((el, i) => (el.status = ElementStates.Default));
    setArr([...arr])
    
    arr[arr.length-1].tail = true
    arr[0].head = true
    setArr([...arr])
    setChange('')
  }
  
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.value}>
          <Input
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button text="Добавить в head"
                  isLoader={startChange === 'addHead'}
                  onClick={addElementHead}
                  disabled={inputValue === '' || arr.length === maxLengthArr 
                    || startChange === 'addTail' || startChange === 'deleteElementHead'
                    || startChange === 'deleteElementTail' || startChange === 'addElementIndex'
                    || startChange === 'deleteElementIndex' }
          />
          <Button text="Добавить в tail"
                  isLoader={startChange === 'addTail'}
                  onClick={addElementTail}
                  disabled={inputValue === '' || arr.length === maxLengthArr
                    || startChange === 'addHead' || startChange === 'deleteElementHead'
                    || startChange === 'deleteElementTail' || startChange === 'addElementIndex'
                    || startChange === 'deleteElementIndex' }
          />
          <Button text="Удалить из head"
                  isLoader={startChange === 'deleteElementHead'}
                  onClick={deleteElementHead}
                  disabled={arr.length === minLengthArr
                    || startChange === 'addTail' || startChange === 'addHead'
                    || startChange === 'deleteElementTail' || startChange === 'addElementIndex'
                    || startChange === 'deleteElementIndex' }
          />
          <Button text="Удалить из tail"
                  isLoader={startChange === 'deleteElementTail'}
                  onClick={deleteElementTail}
                  disabled={arr.length === minLengthArr
                    || startChange === 'addTail' || startChange === 'addHead'
                    || startChange === 'deleteElementHead' || startChange === 'addElementIndex'
                    || startChange === 'deleteElementIndex' }
          />
        </div>
        <div className={styles.index}>
          <Input
            onChange={(e) => setInputIndex(Number(e.currentTarget.value))}
            type='number'
            placeholder='Введите индекс'
            value={inputIndex}
            extraClass={styles.input}
          />
          
          <Button text="Добавить по индексу"
                  isLoader={startChange === 'addElementIndex'}
                  onClick={addElementIndex}
                  disabled={inputValue === '' || arr.length === maxLengthArr
                    || startChange === 'addHead' || startChange === 'deleteElementHead'
                    || startChange === 'deleteElementTail' || startChange === 'addTail'
                    || startChange === 'deleteElementIndex' }
                  extraClass={styles.big_input}
          />
          <Button text="Удалить по индексу"
                  isLoader={startChange === 'deleteElementIndex'}
                  onClick={deleteElementIndex}
                  disabled={inputIndex < 0 || arr.length === minLengthArr 
                    || startChange === 'addHead' || startChange === 'deleteElementHead'
                    || startChange === 'deleteElementTail' || startChange === 'addTail'
                    || startChange === 'addElementIndex' }
                  extraClass={styles.big_input}
          />
        </div>
      </form>
        <div className={styles.circle_wrap}>
        {arr.map((item, i) =>
          (<div key={nanoid()} className={styles.circle}>
              <Circle key={i}
                      letter={item.name}
                      index={i}
                      head={item.head ? 'head' : ''}
                      tail={item.tail ? 'tail' : ''}
                      state={item.status}/>

              {i !== arr.length - 1 &&
                  <ArrowIcon
                      fill={item.status === ElementStates.Changing ? "#d252e1" : "#0032FF"}/>}

              {item.add && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle?.name}
                  extraClass={styles.after_minicirlce}
                />)}

              {item.dell && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle?.name}
                  extraClass={styles.before_minicirlce}
                />
              )}
            </div>
          )
        )}
        </div>
    </SolutionLayout>
  );
};


