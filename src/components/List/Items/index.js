import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import ItemCreationForm from '../ItemCreationForm';
import Item from '../Item';

import { SOURCE_LIST_ID } from '../../../config';
import { LIST_RELATIONSHIPS, SOURCE_LIST_QUERY } from '../../source-props/list';

// np__added_start unit: list, comp: Items, loc: styling

// add styling here
const ItemsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px #DCE6EF;
  border-radius: 4px;
`;

const NoActiveTasks = styled.div`
  padding: 5px 5px 5px 10px;
  stext-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */
  color: #B0BABF;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px #DCE6EF;
  border-radius: 4px;
  height: 90px;
`;

const AddTaskButton = styled.div`
  margin-top: 20px;
  background: #4AA5D4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  height: 22px;
  /* identical to box height */
  color: #FFFFFF;
`;

const ActiveLabel = styled.div`
  padding: 5px 5px 5px 15px;
  text-align: left;
  line-height: 25px;
  height: 25px;
  /* identical to box height */
  color: #6AA5FE;
`;

const StyledUl = styled.ul`
  text-align: left;
`;
// np__added_end unit: list, comp: Items, loc: styling

class Items extends Component {
// np__added_start unit: list, comp: Items, loc: beginning
// np__added_end unit: list, comp: Items, loc: beginning
  state = {
    selectedItemId: null,
    completed: {
      0: true,
      1: false,
    },
    showAdd: false,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }
  handleShowAdd = e => {
    console.log(e);
    this.setState({ showAdd: !this.state.showAdd });
  }
  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target &&
      !node.contains(e.target)
    ) {
      this.setState({ selectedItemId: null });
    }
  }

  handleSelect = id => this.setState({ selectedItemId: id });
  handleCheck = (index, event) => {
    console.log(index)
    // code to create line through completed item
    this.setState(state => ({
      completed: { ...state.completed, [index]: !state.completed[index] }
    }));
  }
  render() {
    const { userId } = this.props;
    const { selectedItemId } = this.state;

    const parameters = {
      currentUser: userId,
    };

    return (
      <Unit
        id={ SOURCE_LIST_ID }
        typeRelationships={ LIST_RELATIONSHIPS }
        query={ SOURCE_LIST_QUERY }
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`
          };

          const items = data.unitData.map(el => flattenData(el));
          return (
            <>
              {items.length ?
                <ItemsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                  <ActiveLabel>
                    Active Tasks
                  </ActiveLabel>
                  <StyledUl>
                  {items.map((item, index) => (
                    <li
                      style={{
                        listStyle: "none",
                        textDecoration: this.state.completed[index]
                          ? "line-through"
                          : ""
                      }}
                      key={index}
                    >
                      <Item
                        key={v4()}
                        parentId={ userId }
                        item={ item }
                        selected={ item.id === selectedItemId }
                        refetchQueries={refetchQueries}
                        onSelect={this.handleSelect}
                        onChange={this.handleCheck}
                        index={index}
                        completed={this.state.completed[index]}
                      />
                    </li>
                    ))
                  }
                  </StyledUl>
                  
                </ItemsStyleWrapper>
              : <NoActiveTasks>
                  No active tasks
                </NoActiveTasks>
              }
              {this.state.showAdd &&
                <ItemCreationForm userId={ userId } refetchQueries={refetchQueries}/>
              }
              <AddTaskButton
                onClick={this.handleShowAdd}
              >
                Add a Task +
              </AddTaskButton>
              {/* np__added_start unit: list, comp: Items, loc: renderEnding */}
              {/* np__added_end unit: list, comp: Items, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Items;
