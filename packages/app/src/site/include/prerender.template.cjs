function prerenderTemplate({pages}) {
  const prerenderUrls = pages.filter((page) => page.url != false && page.data.ignorePrerendering !== true).map((page) => page.url);
  const prerenderScript = {
    prerender: [
      {
        source: 'list',
        urls: prerenderUrls,
      },
    ],
  };
  return `<script type="speculationrules">${JSON.stringify(prerenderScript)}</script>`;
}

module.exports = prerenderTemplate;
