import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class InputDropdown extends Component {
    getHeaderTitle() {
        const { valueKey } = this.props;
        const { options, selectedId, placeHolder } = this.props;
        if (!options || !selectedId || !selectedId.length) {
            return placeHolder;
        }
        const _item = options.find(item => item[valueKey] === selectedId[selectedId.length - 1]);
        if (!_item) {
            return placeHolder;
        }
        return _item.title;
    }

    render() {
        const {filterList, listOpen, toggleList, _inputRef , classNameByInput , valueKey , labelKey } = this.props;
        return (

            <div className="dd-header"  /*className={classNameByInput ? classNameByInput : "dd-header"}*/ 
                 onClick={ () => { toggleList() }}
                 ref={inputRef => { _inputRef(inputRef) }}> 
                    <div className="dd-header-title"></div> 
                    <input type="text" className="form-control form-control-lg" placeholder={this.getHeaderTitle()} onChange={(event) => {filterList(event)}} />
                    {listOpen ? <FontAwesome name="angle-up" size="2x"/> : <FontAwesome name="angle-down" size="2x"/> }     
            </div>
        );
    };
}
 