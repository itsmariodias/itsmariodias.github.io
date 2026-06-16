/**
 * Turns a ```mermaid fenced code block into `<pre class="mermaid">…</pre>` (raw
 * HTML) so Shiki leaves it alone and the diagram source survives verbatim for
 * the client-side renderer in src/pages/blog/[...slug].astro.
 *
 *   ```mermaid
 *   graph TD; A --> B;
 *   ```
 *
 * Styling lives in src/styles/global.css under `pre.mermaid`.
 */
export default function remarkMermaid() {
  const escape = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'code' && child.lang === 'mermaid') {
          return {
            type: 'html',
            value: `<pre class="mermaid not-prose">${escape(child.value)}</pre>`,
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
