import React from "react";

export class Stack<T> {
    private container: T[] = [];

    push = (item: T, setArr: React.Dispatch<React.SetStateAction<T[]>> ): void => {
        this.container.push(item)
        if (this.getSize() > 15) {
            console.log("Стэк переполнен!")
            this.container.length = 15;
        }
        setArr([...this.container])
    };
    pop = (setArr: React.Dispatch<React.SetStateAction<T[]>>): void => {
        this.container.pop()
        setArr([...this.container])
    };
    clear = (setArr: React.Dispatch<React.SetStateAction<T[]>>): void => {
        this.container = [];
        setArr([])
    }
    peak = ():number => {
        return this.container.length-1
    };

    getSize = () => this.container.length;

}