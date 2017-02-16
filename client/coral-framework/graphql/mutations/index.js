import {graphql} from 'react-apollo';
import POST_COMMENT from './postComment.graphql';
import POST_FLAG from './postFlag.graphql';
import POST_LIKE from './postLike.graphql';
import DELETE_ACTION from './deleteAction.graphql';
import postActionUpdate from '../updateQueries/postAction';

import commentView from '../fragments/commentView.graphql';

export const postComment = graphql(POST_COMMENT, {
  options: () => ({
    fragments: commentView
  }),
  props: ({mutate}) => ({
    postItem: ({asset_id, body, parent_id} /* , type */ ) => {
      return mutate({
        variables: {
          asset_id,
          body,
          parent_id
        }
      });
    }}),
});

export const postLike = graphql(POST_LIKE, {
  props: ({mutate}) => ({
    postLike: (like, parentId) => mutate({
      variables: {
        like
      },
      optimisticResponse: {
        createLike: {
          like: {
            id: `${Date.now()}_temp_id`
          }
        }
      },
      updateQueries: postActionUpdate(parentId, like.item_id, 'LikeAction')
    })
  }),
});

export const postFlag = graphql(POST_FLAG, {
  props: ({mutate}) => ({
    postFlag: (flag) => {
      return mutate({
        variables: {
          flag
        }
      });
    }}),
});

export const deleteAction = graphql(DELETE_ACTION, {
  props: ({mutate}) => ({
    deleteAction: (id) => {
      return mutate({
        variables: {
          id
        }
      });
    }}),
});
