import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class InputDropdown extends Component {
    getHeaderTitle() {
        const { valueKey } = this.props;
        const { data, selectedId, placeHolder } = this.props;
        if (!data || !selectedId || !selectedId.length) {
            return placeHolder;
        }
        const _item = data.find(item => item[valueKey] === selectedId[selectedId.length - 1]);
        if (!_item) {
            return placeHolder;
        }
        return _item.title;
    }

    render() {
<<<<<<< HEAD
        const {filterList, listOpen, toggleList, _inputRef , inputClassName  , valueKey , labelKey, isFilterable} = this.props;
=======
        const {filterList, listOpen, toggleList, _inputRef , inputClassName } = this.props;
>>>>>>> d888f04bfe2cf017125a8a5b8e9640637d8982b7
        return (

            <div className={`dd-header${inputClassName   ? " " + inputClassName   : ''}`}
                 onClick={ () => { toggleList() }}
                 ref={inputRef => { _inputRef(inputRef) }}>
                    <div className="dd-header-title">{isFilterable ? null : this.getHeaderTitle()}</div>
                    {isFilterable ?<input type="text" className="form-control form-control-lg" placeholder={this.getHeaderTitle()} onChange={(event) => { event.preventDefault(); filterList(event)}} />:null}
                    {listOpen ? <FontAwesome name="angle-up" size="2x"/> : <FontAwesome name="angle-down" size="2x"/> }     
            </div>
        );
    };
}
 