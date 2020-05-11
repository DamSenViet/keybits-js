module.exports = {
  title: "KLS",
  description: "",
  themeConfig: {
    searchPlaceholder: 'Search...',
    // logo: ''
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Documentation", link: "/documentation/" }
    ],
    sidebarDepth: 1,
    activeHeaderLinks: false,
    sidebar: {
      '/guide/': [
        '',
        // 'getting-started'
      ]
    },
    displayAllHeaders: true,
  }
};