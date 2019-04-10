import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class ListDropdown extends Component {

    getListPosition = () => {
        const { inputRef, calculatePosition , maxListHeight} = this.props;
        if (inputRef && calculatePosition) {
            const coordinates = inputRef.getBoundingClientRect();
            console.log(12);
            return {
                'width': coordinates.width,
                'left': coordinates.left,
                'top': coordinates.top + coordinates.height,
                'maxHeight': maxListHeight * 34
            };
        } else {
            return null;
        }
    };

    render() {
    const {data, filterItems , listOpen, wrapperRef, inputRef, selectedId, focusedId, selectItemOnClick, _listRef , valueKey, labelKey, listClassName} = this.props;
        if ( !inputRef || !listOpen ) {
            return null;
        }
        console.log('hui');
        return ReactDOM.createPortal(
            <div 
                className={`listWrapper${listClassName  ? " " + listClassName  : ''}`}
                style={ this.getListPosition() }
                ref={ list =>  _listRef(list) }
            >
                {<div className="dd-list" onClick={ e => e.stopPropagation() } >
                    {data.filter(item => { return item[labelKey].toLowerCase().indexOf(filterItems) >= 0 }).map((item, id) => (
                        <div
                            className={ ( focusedId === item[valueKey] ? "dd-list-item-on-focus" : "dd-list-item" ) + ( selectedId.includes(item[valueKey]) ? " selected-item" : "" ) }
                            key={ item[valueKey] }
                            onMouseDown={ (e) => { e.preventDefault() }}
                            onClick={ (e) => {
                                selectItemOnClick(e, item);
                            }}
                        >
                            {item[labelKey]}
                        </div>
                    ))}
                </div>}
                <div className="not-found-options">
                   not found
                </div>
            </div>,
            wrapperRef
        );
    }
}
