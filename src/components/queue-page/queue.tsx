import {TValueObj} from "./queue-page";

export class Queue<T> {
    private readonly container:  string[] = [];
    private head: number = 0;
    private tail: number = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: string) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }

        this.container[this.tail] = item;
        this.tail++;
        this.length++;
        
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.head++;
        this.length--;


    };
    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    };

    getHead = (): number => {
        if (this.isEmpty()) {
            console.log('нет элементов');
            return 9
        }

        return this.head;
    };

    getTail = (): number => {
        if (this.isEmpty()) {
            console.log('нет элементов');
            return 9
        }
        return this.tail - 1
    };

    isEmpty = () => this.length === 0;
}