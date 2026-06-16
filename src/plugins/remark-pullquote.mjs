/**
 * Maps the `:::pullquote` container directive to a
 * `<blockquote class="pullquote">`, so posts can use Medium's two quote
 * styles: a plain `> ...` blockquote, and a large highlighted pull quote.
 *
 *   :::pullquote
 *   Design is not just what it looks like. It is how it works.
 *   :::
 *
 * Styling lives in src/styles/global.css under `.prose blockquote.pullquote`.
 */
export default function remarkPullquote() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'containerDirective' && child.name === 'pullquote') {
          child.data = child.data || {};
          child.data.hName = 'blockquote';
          child.data.hProperties = { className: ['pullquote'] };
        }
        walk(child);
      }
    };
    walk(tree);
  };
}
