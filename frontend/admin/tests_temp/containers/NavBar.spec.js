import React, { Component, PropTypes,cloneElement  } from 'react';
import {NavBar,selector} from 'containers/NavBar';
import Immutable, {Map,List} from 'immutable';
import TestUtils,{Simulate} from 'react-addons-test-utils';

function setup() {
    let props = {
        blocks: {
            possibleCount:1,
            requestedCount:1,
            mainWidth:600
        },
        requestedCountChange:sinon.spy(),
        searchShow:sinon.spy()
    };

    let component = TestUtils.renderIntoDocument(<NavBar {...props}/>);

    return {
        props,
        component,
    };
}

describe('containers', function () {
    describe('NavBar', function () {
        it('selector return blocks info', function () {
            const state = Immutable.fromJS({
                infoBlocksManager:{
                    blocks:{
                        possibleCount:1,
                        requestedCount:1,
                        mainWidth:600
                    }
                }
            });
            const result = selector(state);

            expect(result).to.be.have.contain.all.keys('blocks');
        });

        it('changing requestedCount input value, calls action', function () {
            const {component,props} = setup();
            Simulate.change(component.refs.requestedCount, {target:{value:10}});
            expect(props.requestedCountChange).to.be.calledWith(10);
        });

        it('click search start, calls action', function () {
            const {component,props} = setup();
            Simulate.click(component.refs.searchStart);
            expect(props.searchShow).to.be.called;
        });
    });
});
