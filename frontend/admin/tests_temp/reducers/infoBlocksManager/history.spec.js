import { BLOCK_ID, PARENT_BLOCK_ID } from 'actions/infoBlocksManager';
import Immutable,{Map,List} from 'immutable';
import reducerCreator from 'reducers/infoBlocksManager/history';

describe('reducers', function () {
    describe('infoBlocksManager', function () {

        describe('history', function () {
            it('init', function () {
                let reducer = reducerCreator([()=> {
                    return {};
                }]);
                const newState = reducer();
                expect(newState).to.be.size(0);
            });
            it('Add new block to history, when action have property PARENT_BLOCK_ID', function () {
                const blockReducer = sinon.spy((state, action)=> {
                    return Map({
                        id: action.payload[BLOCK_ID],
                        parentId:action.payload[PARENT_BLOCK_ID]
                    });
                });
                const blockReducer2 = (state, action)=> {
                    return state;
                };
                let reducer = reducerCreator([blockReducer, blockReducer2]);

                const state = Immutable.fromJS([
                    {id:1}
                ]);
                const action = {
                    type: 'TEST_ACTION',
                    payload: {
                        [PARENT_BLOCK_ID]: 1,
                        [BLOCK_ID]: 2
                    }
                };
                const newState = reducer(state, action);
                expect(blockReducer).to.has.been.called;
                expect(newState).to.be.size(2);
                expect(newState.getIn([1, 'id'])).to.be.equal(action.payload[BLOCK_ID]);
            });
            it('Change block in history, when action have property BLOCK_ID and not have PARENT_BLOCK_ID', function () {
                const blockReducer = sinon.spy((state, action)=> {
                    return Map({
                        id: action.payload[BLOCK_ID],
                        type: 'after-test'
                    });
                });
                let reducer = reducerCreator([blockReducer]);

                const state = Immutable.fromJS([{
                    id: 1,
                    type: 'before-test'
                }]);
                const action = {
                    type: 'TEST_ACTION',
                    payload: {
                        [BLOCK_ID]: 1
                    }
                };
                const newState = reducer(state, action);
                expect(newState.getIn([0, 'type'])).to.be.equal('after-test');
            });
            it('Clear blocks without parent', function () {
                const blockReducer = sinon.spy((state, action)=> {
                    return Map({
                        id: action.payload[BLOCK_ID],
                        parentId: action.payload[PARENT_BLOCK_ID],
                        type: 'after-test'
                    });
                });
                let reducer = reducerCreator([blockReducer]);

                const state = Immutable.fromJS([{
                    id: 1
                }, {
                    id: 2,
                    parentId: 1
                }, {
                    id: 3,
                    parentId: 2
                }]);
                const action = {
                    type: 'TEST_ACTION',
                    payload: {
                        [BLOCK_ID]: 4,
                        [PARENT_BLOCK_ID]: 1
                    }
                };
                const newState = reducer(state, action);

                expect(newState.find((block)=> {
                    return block.id == 2;
                })).to.be.undefined;

                expect(newState).to.be.size(2);

                let currentBlock = undefined;
                newState.forEach((block)=> {
                    if (block.parentId) {
                        expect(block.get('parentId')).to.be.equal(currentBlock.id);
                    }
                    currentBlock = block;
                });

            });
            it('Delete block from history', function () {
                const blockReducer = sinon.spy((state, action)=> {
                    return null;
                });
                let reducer = reducerCreator([blockReducer]);

                const state = Immutable.fromJS([{
                    id: 1
                }, {
                    id: 2,
                    parentId: 1
                }, {
                    id: 3,
                    parentId: 2
                }]);
                const action = {
                    type: 'DELETE_ACTION',
                    payload: {
                        [BLOCK_ID]: 2,
                    }
                };
                const newState = reducer(state, action);

                expect(newState).to.be.size(1);
                expect(newState.getIn([0, 'id'])).to.equal(1);
            });

        });
    });
});
