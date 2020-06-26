import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_ITEM_FOR_LIST_ACTION_ID
 } from '../../../config';

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-left: 1em;
  background: #4AA5D4;
  border-radius: 30px;
  font-size: 18px;
  line-height: 21px;
  height: 21px;
  /* identical to box height */
  color: #FFFFFF;
`;

function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [ itemValue, updateItemValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);








    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);

    


    updateItemValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor="item-value">
        <input
          id="item-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ itemValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        +
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createItem' }),
  
)(ItemCreationForm);
