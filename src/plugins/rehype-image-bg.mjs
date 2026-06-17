/**
 * Opt-in white backdrop for transparent images. Authoring an image with a "bg"
 * title — `![alt](./diagram.png "bg")` — tags it so it renders on a padded
 * white card, which keeps dark-lined transparent diagrams readable in dark
 * mode. The marker title is removed so it doesn't surface as a tooltip.
 *
 * Styling lives in src/styles/global.css under `.prose img.img-bg`.
 */
export default function rehypeImageBg() {
  return (tree) => {
    const walk = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'img' &&
        node.properties &&
        node.properties.title === 'bg'
      ) {
        const cls = node.properties.className;
        node.properties.className = Array.isArray(cls) ? [...cls, 'img-bg'] : ['img-bg'];
        delete node.properties.title;
      }
      if (node.children) for (const child of node.children) walk(child);
    };
    walk(tree);
  };
}
