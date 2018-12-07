import actionSplitterMiddleware from '../actionSplitter';

import mockMiddleware from 'tests/__mocks__/mockMiddleware';

const create = mockMiddleware(actionSplitterMiddleware);
let next, invoke;

beforeEach(() => {
    const res = create();
    next = res.next;
    invoke = res.invoke;
});

describe('actionSplitterMiddleware', () => {
    it('should pass through any action object', () => {
        const action = { type: 'TEST' };

        invoke(action);

        expect(next).toBeCalledWith(action);
    });

    it('should pass through list actions', () => {
        const actions = [ { type: 'TEST 1' }, { type: 'TEST 2' }, { type: 'TEST 3' } ];

        invoke(actions);

        expect(next).toBeCalledTimes(actions.length);

        actions.forEach(action => {
            expect(next).toBeCalledWith(action);
        })
    })
});
