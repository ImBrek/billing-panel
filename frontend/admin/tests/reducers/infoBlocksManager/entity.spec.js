import { BLOCK_ID, PARENT_BLOCK_ID } from 'actions/infoBlocksManager';
import { ENTITY_REQUEST,ENTITY_SUCCESS} from 'actions/infoBlocks/entity';
import {Map,List} from 'immutable';
import reducer from 'reducers/infoBlocksManager/blocks/entity';
describe('reducers', function () {
    describe('infoBlocksManager', function () {
        describe('entity', function () {
            it('ENTITY_REQUEST, generate entity loading block', function () {
                const action = {
                    type: ENTITY_REQUEST,
                    payload: {
                        [BLOCK_ID]: 2,
                        [PARENT_BLOCK_ID]: 1
                    }
                };
                const newState = reducer(null, action);

                expect(newState.get('parentId')).to.equal(1);
                expect(newState.get('id')).to.equal(2);
                expect(newState.get('type')).to.equal('entity-loading');

            });

            it('ENTITY_SUCCESS, generate entity block', function () {
                const action = {
                    type: ENTITY_SUCCESS,
                    payload: {
                        [BLOCK_ID]: 2,
                        response: {
                            entities: {
                                entities: {
                                    1: {
                                        type: 'switch',
                                        title: 'Свитч 1 этажа'
                                    }
                                }
                            },
                            result: [1]
                        }
                    }
                };
                const state = Map({
                    id: 2,
                    parentId: 1,
                    type: 'entity-loading'
                });
                const newState = reducer(state, action);

                expect(newState.get('type')).to.equal('entity-switch');
                expect(newState).to.contain.key(['id', 'parentId']);
            });
        });
    });
});
