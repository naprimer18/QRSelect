import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class InputDropdown extends Component {
    getHeaderTitle() {
        const { options, selectedId, placeHolder } = this.props;
        if (!options || !selectedId || !selectedId.length) {
            return placeHolder;
        }
        const _item = options.find(item => item.id === selectedId[selectedId.length - 1]);
        if (!_item) {
            return placeHolder;
        }
        return _item.title;
    }

    render() {
        const {filterList, listOpen, toggleList, _inputRef } = this.props;
        return (

            <div className="dd-header" onClick={ () => { toggleList() }} ref={inputRef => { _inputRef(inputRef) }}>
                <div className="dd-header-title"></div>
                <input type="text" className="form-control form-control-lg" placeholder={this.getHeaderTitle()} onChange={(event) => {filterList(event)}} />
                {listOpen ? <FontAwesome name="angle-up" size="2x"/> : <FontAwesome name="angle-down" size="2x"/> }     
            </div>
        );
    };
}
 