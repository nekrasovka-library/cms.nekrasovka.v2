function getGroupedPages(project) {
  const pages = project.toJSON().pages;

  const groupedPages = pages.reduce((acc, page) => {
    const groupIndex = acc.findIndex((group) => group.url === page.url);

    if (acc[groupIndex]) {
      if (!acc[groupIndex].data) {
        const firstPage = { ...acc[groupIndex] };
        acc[groupIndex] = {
          id: firstPage.id,
          name: firstPage.name,
          url: firstPage.url,
          settings: firstPage.settings,
          projectId: firstPage.projectId,
          type: firstPage.type,
          data: [firstPage],
        };
      }

      acc[groupIndex].data.push(page);
    } else {
      acc.push(page);
    }

    return acc;
  }, []);

  const groupedPagesChecked = groupedPages.map((page) => {
    if (page.type && !page.data) {
      return {
        id: page.id,
        name: page.name,
        url: page.url,
        settings: page.settings,
        projectId: page.projectId,
        type: page.type,
        data: [page],
      };
    }
    return page;
  });

  const projectResponse = project.toJSON();
  projectResponse.pages = groupedPagesChecked;

  return projectResponse;
}

module.exports = { getGroupedPages };
