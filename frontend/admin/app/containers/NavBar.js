import React, { Component, PropTypes,cloneElement  } from 'react';
import { connect } from 'react-redux';

import {requestedCountChange} from 'actions/infoBlocksManager';
import { searchShow,searchStart } from 'actions/infoBlocks/search';
import { createSelector } from 'reselect';

export class NavBar extends Component {
    constructor (props) {
        super(props);
        this.render.bind(this);
    }

    render () {
        return <nav className="navbar navbar-dark bg-inverse">
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <button className="btn btn-secondary-outline" title="Новый девайс"><i
                        className="fa fa-plus"></i></button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-secondary-outline"
                            ref="searchStart"
                            onClick={this.props.searchShow}
                            title="Новый поиск">
                            <i className="fa fa-search"></i>
                    </button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-secondary-outline"
                            onClick={this.props.searchShow}
                            title="Отмена"><i
                        className="fa fa-arrow-left"></i></button>
                </li>
                <li className="nav-item">
                    <button className="btn btn-secondary-outline" title="Отмена отмены)"><i
                        className="fa fa-arrow-right"></i></button>
                </li>
            </ul>
            <form className="form-inline pull-xs-right">
                <div className="form-group">
                    <label>Блоки {this.props.blocks.requestedCount} / {this.props.blocks.possibleCount} </label>
                    <input ref="requestedCount" className="form-control" value={this.props.blocks.requestedCount} type="number" min="1" max={this.props.blocks.possibleCount} onChange={e => {
                        this.props.requestedCountChange(e.target.value);
                    }}/>
                </div>
            </form>
        </nav>;
    }
}
export const selector = createSelector(
    state => state.getIn(['infoBlocksManager','blocks']),
    blocks=>{return {
        blocks:blocks.toJS()
    };}
);;

export default connect(selector, {
    requestedCountChange,
    searchShow,
})(NavBar);
