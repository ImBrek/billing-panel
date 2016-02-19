import reducer from 'reducers/entities';
import Immutable,{Map,List} from 'immutable';

describe('reducers', function () {
    describe('entities', function () {
        it('merge entities from responses', function () {
            const action = {
                type: 'TEST_ACTION',
                payload: {
                    response: {
                        entities: {
                            entities: {
                                1: {
                                    id: 1,
                                    title: 'switch'
                                },
                                2: {
                                    id: 2,
                                    title: 'router'
                                }
                            }
                        }
                    }
                }
            };
            const state = Immutable.fromJS({
                entities: {
                    2: {
                        id: 2,
                        title: 'server'
                    }
                }

            });

            const newState = reducer(state, action);

            expect(newState.get('entities')).to.be.size(2);
            expect(newState.getIn(['entities', '2', 'title'])).to.be.equal('router');
        });

    });
});
