import {selectSort} from "./selectSorting";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {bubbleSort} from "./bubbleSorting";


const arr = [{num: 5, status: "default"},
    {num: 84, status: ElementStates.Default},
    {num: 35, status: ElementStates.Default},
    {num: 25, status: ElementStates.Default}]

const resultArrAscending = [{num: 5, status: ElementStates.Modified},
    {num: 25, status: ElementStates.Modified},
    {num: 35, status: ElementStates.Modified},
    {num: 84, status: ElementStates.Modified}]

const resultArrDescending = [{num: 84, status: ElementStates.Modified},
    {num: 35, status: ElementStates.Modified},
    {num: 25, status: ElementStates.Modified},
    {num: 5, status: ElementStates.Modified}]


describe('Тестирование сортировки выбором', () => {
    
    it('Корректно сортирует по возрастанию', async () => {
        const sorting = await selectSort(Direction.Ascending, arr,  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual(resultArrAscending);
    }, 30000)

    it('Корректно сортирует по убыванию', async () => {
        const sorting = await selectSort(Direction.Descending, arr,  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual(resultArrDescending);
    }, 30000)

    it("Корректно сортирует пустой массив", async () => {
        const sorting = await selectSort(Direction.Ascending,[],  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual([]);
    })
    it("Корректно сортирует один элемент", async () => {
        const sorting = await selectSort(Direction.Ascending,[{num: 25, status: ElementStates.Default}],  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual([{num: 25, status: ElementStates.Modified}]);
    })
})

describe('Тестирование сортировки пузырьком', () => {

    it('Корректно сортирует по возрастанию', async () => {
        const sorting = await bubbleSort(Direction.Ascending, arr,  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual(resultArrAscending);
    }, 30000)

    it('Корректно сортирует по убыванию', async () => {
        const sorting = await bubbleSort(Direction.Descending, arr,  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual(resultArrDescending);
    }, 30000)

    it("Корректно сортирует пустой массив", async () => {
        const sorting = await bubbleSort(Direction.Ascending,[],  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual([]);
    })
    it("Корректно сортирует один элемент", async () => {
        const sorting = await bubbleSort(Direction.Ascending,[{num: 25, status: ElementStates.Default}],  ()=>{}, ()=>{}, ()=>{})
        expect(sorting).toEqual([{num: 25, status: ElementStates.Modified}]);
    })
})