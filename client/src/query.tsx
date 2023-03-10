import { gql } from '@apollo/client';

export const query = gql`
  query {
    users {
      id
    }
  }
`;