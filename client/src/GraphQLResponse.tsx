import React from 'react';
import { useQuery } from '@apollo/client';
import { query } from './query';

function GraphQLResponse() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <p><pre>{JSON.stringify(data, null, 2)}</pre></p>;
}

export default GraphQLResponse;