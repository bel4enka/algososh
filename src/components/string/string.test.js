
import {reversString} from "./utils";

describe('Тестирование алгоритма разворота строки', () => {
    it("с чётным количеством символов", async () => {
        const revers = await reversString(['a', 'b', 'c', 'd'], () => {})
        expect(revers).toEqual(['d', 'c', 'b', 'a'])
    });
    it("с нечетным количеством символов", async () => {
        const revers = await reversString(['a', 'b', 'c'], () => {})
        expect(revers).toEqual(['c', 'b', 'a'])
    });
    it("с одним символом", async () => {
        const revers = await reversString(['a'], () => {})
        expect(revers).toEqual(['a'])
    });
    it("пустую строку", async () => {
        const revers = await reversString([''], () => {})
        expect(revers).toEqual([''])
    });
})