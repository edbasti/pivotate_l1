import React, { useState } from 'react';
import styled from 'styled-components';

import { withNoStack } from '@nostack/no-stack';

import ForgotPasswordButton from '../ForgotPasswordButton';

const Wrapper = styled.div`
  width: 250px;

  padding: 1em 0;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 10px 10px 8px -1px rgba(0, 0, 0, 0.6);
`;

const Row = styled.div`
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;

  input {
    display: block;
    margin: 0.5em auto;
    width: 80%;
  }
`;

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading || currentUser) {
    return null;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      setError(
        error.message ||
        (error.graphQLErrors &&
          error.graphQLErrors.length &&
          error.graphQLErrors[0]) ||
        error,
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Row>
          <label htmlFor="nostack-username">
            Username:
            <input
              id="nostack-username"
              type="text"
              name="username"
              disabled={isSubmitting}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
        </Row>
        <Row>
          <label htmlFor="nostack-password">
            Password:
            <input
              id="nostack-password"
              type="password"
              name="password"
              disabled={isSubmitting}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </Row>
        <Row>
          <button
            type="submit"
            disabled={isSubmitting || !username || !password}
          >
            Log In
          </button>
        </Row>
        {error && <Row>{error}</Row>}
      </form>
      <Row>
        <ForgotPasswordButton />
      </Row>
    </Wrapper>
  );
}

export default withNoStack(LoginForm);
