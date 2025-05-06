import DOMPurify from "isomorphic-dompurify";
import { useEffect } from 'react';
const SafeHtml = ({ html, className }: { html: string; className?: string }) => {
  // Configure DOMPurify to allow YouTube embeds
  useEffect(() => {
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      // Fix YouTube iframes
      if (node.tagName === 'IFRAME') {
        // Allow specific attributes needed for embeds
        const allowedAttributes = ['allowfullscreen', 'frameborder', 'allow'];
        allowedAttributes.forEach(attr => {
          if (node.hasAttribute(attr)) {
            node.setAttribute(attr, node.getAttribute(attr) || '');
          }
        });
        
        // Add some standard security attributes
        node.setAttribute('loading', 'lazy');
        
        // Only if it's a YouTube or other trusted source
        const iframeNode = node as HTMLIFrameElement;
        if (
          iframeNode.src && 
          (iframeNode.src.startsWith('https://www.youtube.com/') || 
           iframeNode.src.startsWith('https://youtube.com/') ||
           iframeNode.src.startsWith('https://player.vimeo.com/') ||
           iframeNode.src.startsWith('https://www.vimeo.com/'))
        ) {
          node.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-presentation');
        }
      }
    });
  }, []);

  const cleanHtml = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'frameborder',
      'allowfullscreen',
      'allow',
      'src',
      'width',
      'height',
      'style',
      'class'
    ]
  });

  return <div className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SafeHtml;