import {graphql} from 'react-apollo';
import STREAM_QUERY from './streamQuery.graphql';
import LOAD_MORE from './loadMore.graphql';
import loadMoreUpdate from '../updateQueries/LoadMore';
import MY_COMMENT_HISTORY from './myCommentHistory.graphql';

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  // If no query is included, return a default string for development
  return 'http://localhost/default/stream';
}

export const queryStream = graphql(STREAM_QUERY, {
  options: () => ({
    variables: {
      asset_url: getQueryVariable('asset_url')
    }
  }),
  props: ({data}) => ({
    data,
    loadMore: ({limit, cursor, parent_id, asset_id, sort}) => {
      return data.fetchMore({
        query: LOAD_MORE,
        variables: {
          limit,
          cursor,
          parent_id,
          asset_id,
          sort
        },
        updateQuery: loadMoreUpdate(parent_id)
      });
    }
  })
});

export const myCommentHistory = graphql(MY_COMMENT_HISTORY, {});
