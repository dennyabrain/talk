module.exports = (parent_id) => (oldData, {fetchMoreResult:{data:{new_top_level_comments}}}) =>

  // If loading more replies
  parent_id ? {
    ...oldData,
    asset: {
      ...oldData.asset,
      comments: oldData.asset.comments.map((comment) =>
        comment.id === parent_id
        ? {...comment, replies: [...comment.replies, ...new_top_level_comments]}
        : comment)
    }
  }

  // If loading more top-level comments
  : {
    ...oldData,
    asset: {
      ...oldData.asset,
      comments: [...oldData.asset.comments, ...new_top_level_comments]
    }
  };
