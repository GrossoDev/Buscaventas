import React from 'react';
import Query from './Query';

function Queries({ queries, onFilter, onRemove }) {
  return (
    <div>
      {queries?.map(
        (query) => <Query key={query.id} query={query} onFilter={onFilter} onRemove={onRemove} />
      )}
    </div>
  );
}

export default Queries;
