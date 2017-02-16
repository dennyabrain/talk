import _ from 'lodash';

const addActionSummaryToComment = (comment, actionType, id) => {

  let actionSummaryType;
  switch(actionType) {
  case 'LikeAction':
    actionSummaryType = 'LikeActionSummary';
    break;
  case 'FlagAction':
    actionSummaryType = 'FlagActionSummary';
    break;
  default:
    actionSummaryType = '';
  }

  const current_user = {
    id,
    created_at: new Date(),
    __typename: actionType
  };

  const actionSummaryIndex = _.indexOf(comment.action_summaries, (({__typename}) => __typename === actionSummaryType));
  if (actionSummaryIndex === -1) {
    return comment.action_summaries.concat({
      __typename: actionSummaryType,
      count: 1,
      current_user
    });
  } else {
    const newActionSummaries = comment.action_summaries.slice();
    newActionSummaries[actionSummaryIndex].count++;
    newActionSummaries.current_user = current_user;
    return newActionSummaries;
  }
};

module.export = (parentId, itemId, actionType) => ({
  AssetQuery: (oldData, {mutationResult:{data:{createLike:{like:{id}}}}}) =>

    // If updating a reply
    parentId ? {
      ...oldData,
      asset: {
        ...oldData.asset,
        comments: oldData.asset.comments.map(comment =>
          comment.id === parentId
          ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                ...comment,
                action_summaries: addActionSummaryToComment(comment, actionType, id)
              }
            ]}
          : comment)
      }
    }

    // If updating a comment
    : {
      ...oldData,
      asset: {
        ...oldData.asset,
        comments: oldData.asset.comments.map(comment =>
          comment.id === itemId
          ? {
            ...comment,
            action_summaries: addActionSummaryToComment(comment, actionType, id)
          }
          : comment
        )
      }
    }
});
