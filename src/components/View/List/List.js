import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class ListDropdown extends Component {

    getListPosition = () => {
        const { inputRef, calculatePosition , maxListHeight} = this.props;
        if (inputRef && calculatePosition) {
            const coordinates = inputRef.getBoundingClientRect();
            return {
                'width': coordinates.width,
                'left': coordinates.left,
                'top': coordinates.top + coordinates.height,
                'maxHeight': maxListHeight
            };
        } else {
            return null;
        }
    };

    render() {

    const {options, filterItems , listOpen, wrapperRef, inputRef, selectedId, focusedId, selectItem, _listRef , valueKey, labelKey, classNameByList , maxListHeight} = this.props;
        if ( !inputRef || !listOpen ) {
            return null;
        }

        return ReactDOM.createPortal(
            <div className={"listWrapper"}  /*className={classNameByList ? classNameByList : "listWrapper"}*/
                style={ this.getListPosition() }>  
                {<ul className="dd-list" onClick={ e => e.stopPropagation() } >

                    {options.filter(item => { return item[labelKey].toLowerCase().indexOf(filterItems) >= 0 }).map((item, id) => (
                        <div
                            ref={ list => { if (id === 0) _listRef(list) } }
                            className={ ( focusedId === item[valueKey] ? "dd-list-item-on-focus" : "dd-list-item" ) + ( selectedId.includes(item[valueKey]) ? " selected-item" : "" ) }
                            key={ item[valueKey] }
                            onMouseDown={ (e) => { e.preventDefault() }}
                            onClick={ (e) => {
                                selectItem(e, item)
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
