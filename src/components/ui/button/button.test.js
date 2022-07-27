import renderer from 'react-test-renderer';
import {Button} from "./button";
import {render, screen, fireEvent} from '@testing-library/react'

describe('Работа компонента - Button', () => {
    it('Кнопка с текстом', () => {
        const button = renderer
            .create(<Button text='Текст'/>)
            .toJSON()
        expect(button).toMatchSnapshot()
    })
    it('Кнопка без текста', () => {
        const button = renderer
            .create(<Button />)
            .toJSON()
        expect(button).toMatchSnapshot()
    })
    it('Заблокированная кнопка', () => {
        const button = renderer
            .create(<Button disabled={true}/>)
            .toJSON()
        expect(button).toMatchSnapshot()
    })
    it('Кнопка с индикацией загрузки', () => {
        const button = renderer
            .create(<Button isLoader={true}/>)
            .toJSON()
        expect(button).toMatchSnapshot()
    })
    it('Колбек кнопки', () => {
        window.alert = jest.fn();

        // Рендерим компонент
        render(<Button text="Рецепт пельменей" onClick={()=>{alert('Ура! Пельмени!')}}/>)

        // Находим элемент ссылки
        const link = screen.getByText("Рецепт пельменей");

        // Имитируем нажатие на ссылку
        fireEvent.click(link);

        // Проверяем, что alert сработал с правильным текстом предупреждения
        expect(window.alert).toHaveBeenCalledWith('Ура! Пельмени!');
    });
})