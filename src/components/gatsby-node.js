exports.onCreatePages = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const crumb = {
    value: 'shitballs',
  };

  deletePage(page);
  createPage({
    ...page,
    context: {
      crumb,
    },
  });
};
