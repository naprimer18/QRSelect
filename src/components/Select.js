import React, { Component } from 'react';
import ListDropdown from './View/List';
import InputDropdown from './View/Input';
import '../styles/global.css';

export default class Select extends Component{
  constructor(props) {
    super(props);
    this._wrapperRef = null;
    this._inputRef = null;
    this._listRef = null;
    this.state = {
      idFromWhichBeganSelection: 0,
      listOpen: null,
      selectedId: [],
      focusedId: null,
      menuOpened: null,
      firstVisibleItemOnScrollMenu: 0,
      lastVisibleItemOnScrollMenu: props.maxListHeight - 1,
      filterItems: ''
    };
  }
  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.close)
  };

  close = () => {
    const { data } = this.props;
    this.setState( previousState => {
      const { selectedId } = previousState;
      return{
        listOpen: false,
        focusedId: null,
        selectedId: selectedId.length !== 0 ? selectedId.filter( item => { return item !== -1 && item !== data.length }) : []
      }
    });
  };

  selectMultiValues = (id) => {
    this.setState(previousState => {
      return {
        idFromWhichBeganSelection: id,
        selectedId: previousState.selectedId.includes(id) ? previousState.selectedId.filter(_id => _id !== id) : [...previousState.selectedId, id],
        focusedId: id
       }},
      () => {
        this.props.onChange ? this.props.onChange(this.state.selectedId) : null;
    });
  };

  hoveredAndSelectedMultiValues = (id) => {
    const { data } = this.props;
    const { idFromWhichBeganSelection } = this.state;
    this.setState( () => {
      const allIds = [...data.map( item => item.id )];
      return {
        selectedId: id >= idFromWhichBeganSelection ?
            allIds.filter( item => (item <= id) && ( item >= idFromWhichBeganSelection ))
        :
            allIds.filter( item => (item >= id) && ( item <= idFromWhichBeganSelection )),
        focusedId: id
       }},
      () => {
        this.props.onChange? this.props.onChange(this.state.selectedId): null;
    });
  };

  selectSingleItem = (id) => {
    this.setState( previousState => {
      return {
        idFromWhichBeganSelection: id,
        listOpen: !previousState.listOpen,
        selectedId:  [id],
        focusedId: previousState.focusedId
      }},
      () => {
        this.props.onChange? this.props.onChange(this.state.selectedId): null;
    });
  };

  toggleList = (...rest) => {
    if ( !rest.length ){
      this.setState( prevState => ({
        listOpen: !prevState.listOpen,
        focusedId: null,
        idFromWhichBeganSelection: 0
      }),
          ()  => {
            if( !this.state.listOpen && this.props.onOpen )
              this.props.onOpen();
            if ( this.state.listOpen && this.props.onClose )
              this.props.onClose();
          });
    }
    if ( rest.length !== 0 && rest[0] === "clearSelectedId" ) {
       this.setState( prevState => ({
         focusedId: prevState.focusedId,
         selectedId: [],
         idFromWhichBeganSelection: 0
      }),
           () => {
             if( !this.state.listOpen && this.props.onOpen )
               this.props.onOpen();
             if ( this.state.listOpen && this.props.onClose )
               this.props.onClose();
           });
    }
  };

  selectItem = (e, item) => {
    const { isMulti, valueKey } = this.props;
    const id = item[valueKey];
    e.preventDefault();

    if (e.shiftKey && isMulti) {
      this.hoveredAndSelectedMultiValues(id);
      return;
    }

    if (e.ctrlKey && isMulti) {
      this.selectMultiValues(id);
    } else {
      this.selectSingleItem(id);
    }
  };

  keyDown = (e) => {
    const { data } = this.props;
    const { focusedId, listOpen, firstVisibleItemOnScrollMenu, lastVisibleItemOnScrollMenu } = this.state;
    const keyUp = 38;
    const keyDown = 40;

    if (e.which === 32 && !listOpen ) {
      this.toggleList();
      return;
    }

    if (e.key === "Escape" && listOpen && this.state.selectedId.length !== 0){
      this.toggleList('clearSelectedId');
      return;
    }

    if (e.key === "Escape" && listOpen && this.state.selectedId.length === 0){
      this.toggleList();
      return;
    }

    if (e.which === 32 && listOpen) {
      e.preventDefault();
      this.selectSingleItem(this.state.focusedId);
      return;
    }

    /**************************************  scrolling of menu  *************************/
    if ( focusedId === lastVisibleItemOnScrollMenu && e.which === keyDown ) {
      this._listRef.scrollBy(0, 34);
      (focusedId !== data.length - 1) && this.setState(previousState => {
        return{
          firstVisibleItemOnScrollMenu: previousState.firstVisibleItemOnScrollMenu + 1,
          lastVisibleItemOnScrollMenu: previousState.lastVisibleItemOnScrollMenu + 1
        }
      });
    } else if ( focusedId === firstVisibleItemOnScrollMenu && e.which === keyUp ) {
      this._listRef.scrollBy(0, -34);
      console.log(this._listRef);
      ( focusedId !== 0 ) && this.setState(previousState => {
        return{
          firstVisibleItemOnScrollMenu: previousState.firstVisibleItemOnScrollMenu - 1,
          lastVisibleItemOnScrollMenu: previousState.lastVisibleItemOnScrollMenu - 1
        }
      });
    }
    /***************************************************************************************/

    if (!e.shiftKey && !e.ctrlKey && e.which === keyUp && !listOpen) {
      this.setState(previousState => {
        if (previousState.focusedId === null && previousState.selectedId.length === 1) {
          return {
            focusedId: null,
            selectedId: []
          }
        } else return {
          focusedId: previousState.focusedId,
          selectedId: [...previousState.selectedId]
        }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
      return;
    }

    if (!e.shiftKey && !e.ctrlKey && e.which === keyUp && listOpen) {
      this.setState(previousState => {
        if (previousState.focusedId === null) {
          return {
            focusedId: null,
            selectedId: []
          }
        } else if ( previousState.focusedId === 0 ){
            return {
              focusedId: 0,
              selectedId: [0]
          }
        } else return {
            selectedId: [previousState.focusedId - 1],
            focusedId: previousState.focusedId - 1,
            idFromWhichBeganSelection: previousState.focusedId - 1
          }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
      return;
    }

    if (!e.shiftKey && !e.ctrlKey && e.which === keyDown && listOpen) {
      this.setState(previousState => {
        if ( previousState.listOpen && previousState.focusedId === null ){
          return {
            focusedId: 1,
            selectedId: [1],
            idFromWhichBeganSelection: 1
          }
        } else if (previousState.focusedId === data.length - 1) {
            return {
              focusedId: data.length - 1,
              selectedId: [data.length - 1]
            }
        } else return {
            selectedId: [previousState.focusedId + 1],
            focusedId: previousState.focusedId + 1,
            idFromWhichBeganSelection: previousState.focusedId + 1
          }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
      return;
    }

    if (e.ctrlKey && e.which === keyDown && listOpen){
      this.setState( previousState => {
        if ( previousState.listOpen && previousState.focusedId === null ){
          return {
            focusedId: 0,
            selectedId: [...previousState.selectedId]
          }
        } else if ( previousState.focusedId !== data.length - 1 ) {
            return {
              focusedId: previousState.focusedId + 1,
              selectedId: [...previousState.selectedId]
            }
        } else if (previousState.focusedId === data.length - 1 ) {
            return {
              focusedId: data.length - 1,
              selectedId: [...previousState.selectedId]
            }
        }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
      return;
    }

    if (e.ctrlKey && e.which === keyUp && listOpen) {
      this.setState( previousState => {
        if (previousState.focusedId === null) {
          return {
            focusedId: 0,
            selectedId: [...previousState.selectedId]
          }
          } else if ( previousState.focusedId !== 0 ){
            return {
              focusedId: previousState.focusedId - 1,
              selectedId: [...previousState.selectedId]
            };
        } else if ( previousState.focusedId === 0 ) {
            return {
              focusedId: previousState.focusedId,
              selectedId: [...previousState.selectedId]
            }
        }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
    }

    if (e.shiftKey && e.which === keyDown && listOpen) {
      this.setState( previousState => {
        const { focusedId, selectedId, idFromWhichBeganSelection } = previousState;
        if ( listOpen && focusedId === null ){
          return {
            focusedId: 1,
            selectedId: [...selectedId.filter(item => item !== 0 && item !== 1 && item < 2), 0, 1]
          }
        }
        if (focusedId >= data.length - 1) {
          return {
            focusedId: data.length - 1,
              selectedId: [...selectedId]
            }
        } else {
          const allIds = [...data.map( item => item.id )];
            return {
              selectedId: focusedId >= idFromWhichBeganSelection ?
                  [...allIds.filter( item => item >= idFromWhichBeganSelection && item <= focusedId + 1 )]
                :
                  [...allIds.filter( item => item <= idFromWhichBeganSelection && item >= focusedId + 1 )],
              focusedId: focusedId + 1
            };
        }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
    }

    if (e.shiftKey && e.which === keyUp && listOpen) {
      this.setState( previousState => {
        const { focusedId, selectedId, idFromWhichBeganSelection } = previousState;
        if (listOpen && focusedId === null) {
          return {
            focusedId: null,
            selectedId: []
          }
        }
        if (focusedId <= 0) {
            return {
              focusedId: 0,
              selectedId: [...selectedId]
            }
        } else {
          const allIds = [...data.map( item => item.id )];
            return {
              selectedId: focusedId <= idFromWhichBeganSelection ?
                  [...allIds.filter( item => item <= idFromWhichBeganSelection && item >= focusedId - 1 )]
              :
                  [...allIds.filter( item => item >= idFromWhichBeganSelection && item <= focusedId - 1 )],
              focusedId: focusedId - 1
            };
        }
      },
          () => {
            this.props.onChange? this.props.onChange(this.state.selectedId): null;
          });
    }
  };

  filterList = (e) => {
    this.setState({filterItems:e.target.value.toLowerCase()});
  };

  render(){
    const { listParent, data, placeHolder, isMulti , menuContainerStyle, className , inputClassName , listClassName   ,valueKey , labelKey , maxListHeight} = this.props;
    const { listOpen, selectedId, focusedId, filterItems, idFromWhichBeganSelection } = this.state;

    const inputDropdownProps = {
      filterItems,
      data,
      listOpen,
      toggleList: this.toggleList,
      filterList: this.filterList,
      _inputRef: ref => this._inputRef = ref,
      selectedId,
      placeHolder,
      valueKey,
      labelKey,
      inputClassName 
    };

    const listDropdownProps = {
      listClassName,
      valueKey,
      labelKey,
      maxListHeight,
      data,
      filterItems,
      listOpen,
      selectedId,
      focusedId,
      filterList: this.filterList,
      toggleList: this.toggleList,
      wrapperRef: this._wrapperRef,
      inputRef: this._inputRef,
      _listRef: ref => this._listRef = ref,
      calculatePosition: !!listParent,
      selectItem: this.selectItem,
      onMultiItemSelected: isMulti ? this.selectMultiValues : null,
      onSingleItemSelected: this.selectSingleItem,
      onMultiValuesHoveredAndSelected: this.hoveredAndSelectedMultiValues,
      menuContainerStyle: menuContainerStyle ? menuContainerStyle : null
    };

    // console.log(selectedId, idFromWhichBeganSelection);

    return (
      <div
          style={ menuContainerStyle ? menuContainerStyle : null}
          className={`dd-wrapper${className  ? " " + className  : ''}`}
          onFocus={ (e) => { e.preventDefault() }}
          tabIndex={1}
          onKeyDown={(e) => { this.keyDown(e); }}
          ref={ ref => this._wrapperRef = (listParent ? listParent : ref) }
      >
        <InputDropdown {...inputDropdownProps} />
        <ListDropdown {...listDropdownProps} />
      </div>
    );
  }
};