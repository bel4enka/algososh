import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Тестирование компонента Circle', () => {
    it('Circle без буквы', () => {
        const circle = renderer
            .create(<Circle />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle c буквой', () => {
        const circle = renderer
            .create(<Circle letter='Test' />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с head', () => {
        const circle = renderer
            .create(<Circle head />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с tail', () => {
        const circle = renderer
            .create(<Circle tail />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с react-элементом в head', () => {
        const circle = renderer
            .create(<Circle head={<Circle />} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с react-элементом в tail', () => {
        const circle = renderer
            .create(<Circle tail={<Circle />} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с index', () => {
        const circle = renderer
            .create(<Circle index={0} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle с пропом isSmall ===  true', () => {
        const circle = renderer
            .create(<Circle isSmall />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle в состоянии default', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle в состоянии changing', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
    it('Circle в состоянии modified', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    })
})