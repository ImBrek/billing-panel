import React, { Component, PropTypes,cloneElement  } from 'react';
import {InfoBlocksManager,selector} from 'containers/InfoBlocksManager';
import Immutable, {Map,List} from 'immutable';
import TestUtils,{Simulate} from 'react-addons-test-utils';

function setup () {
    let props = {
        blocks: {
            possibleCount: 1,
            requestedCount: 1,
            mainWidth: 600
        },
        requestedCountChange: sinon.spy(),
        searchShow: sinon.spy()
    };

    let component = TestUtils.renderIntoDocument(<InfoBlocksManager {...props}/>);

    return {
        props,
        component,
    };
}

describe('containers', function () {
    describe('InfoBlocksManager', function () {
        describe('selector', function () {
            const commonState = Immutable.fromJS({
                infoBlocksManager: {
                    blocks: {
                        possibleCount: 1,
                        requestedCount: 1,
                        mainWidth: 600
                    },
                    history: []
                },
                entities: {
                    entities: {},
                    endpoints: {}
                }
            });
            it('for search', function () {
                const result = selector(commonState);
                expect(result).to.be.have.contain.all.keys('blocks', 'history');
            });
            it('for switch', function () {
                const state = commonState.mergeDeep({
                    infoBlocksManager: {
                        history: [{
                            id: 1,
                            type: 'entity-switch',
                            entity: {
                                id: 1,
                                endpoints: [1, 2]
                            }
                        }]
                    },
                    entities: {
                        entities: {1: {id: 1, title: '12345'}},
                        endpoints: {1: {id: 1}, 2: {id: 2}}
                    }
                });
                const result = selector(state);
                expect(result.history[0]).to.be.contain.keys('id', 'type', 'entity');
                expect(result.history[0].entity).to.be.contain.keys('id', 'endpoints', 'title');
                expect(result.history[0].entity.endpoints).to.be.length(2);
                expect(result.history[0].entity.endpoints[0]).to.be.contain.keys('id');
            });
        });
    });
});
