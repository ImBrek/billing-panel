import { SEARCH_SHOW,SEARCH_REQUEST,SEARCH_SUCCESS,searchShow } from 'actions/infoBlocks/search';
import { BLOCK_ID, ENTITY_SELECT } from 'actions/infoBlocksManager';
import {Map,List} from 'immutable';
import reducer from 'reducers/infoBlocksManager/blocks/search';

describe('reducers', function () {
    describe('infoBlocksManager', function () {

        describe('search', function () {

            it('SHOW_SEARCH, create new search block', function () {
                const newState = reducer(null, searchShow());
                expect(newState.get('type')).to.be.equal('search');
                expect(newState).to.be.contain.all.keys('id', 'entities');
            });

            it('SEARCH_SUCCESS, add entities from response result to entities', function () {
                let state = Map({
                    type: 'search',
                    entities: []
                });
                const action = {
                    type: SEARCH_SUCCESS,
                    payload: {
                        response: {
                            entities: {
                                entities: {}
                            },
                            result: [1, 2, 3]
                        }
                    }
                };
                expect(reducer(state, action)).to.equal(Map({
                    type: 'search',
                    entities: List([1, 2, 3])
                }));
            });

            it('ENTITY_SELECT, set selectedEntity', function () {
                let state = Map({
                    type: 'search',
                    id: 1,
                    entities: [1, 2, 109]
                });
                const action = {
                    type: ENTITY_SELECT,
                    payload: {
                        entity: {
                            id: 109
                        }
                    }
                };
                expect(reducer(state, action)).to.contain.keys('selectedEntity');
                expect(reducer(state, action).get('selectedEntity')).to.be.equal(109);
            });

        });
    });
});
