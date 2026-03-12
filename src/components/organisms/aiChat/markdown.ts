export function renderMarkdown(text: string): string {
    let html = text
        // code blocks
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
        // inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // headings
        .replace(/^### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^## (.+)$/gm, '<h3>$1</h3>')
        .replace(/^# (.+)$/gm, '<h2>$1</h2>')
        // bold and italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // unordered lists
        .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
        // ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // blockquotes
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        // horizontal rules
        .replace(/^---$/gm, '<hr>')
        // line breaks (double newline = paragraph)
        .replace(/\n\n/g, '</p><p>')
        // single line breaks
        .replace(/\n/g, '<br>')

    // wrap consecutive <li> in <ul>
    html = html.replace(/((?:<li>.*?<\/li>(?:<br>)?)+)/g, '<ul>$1</ul>')
    html = html.replace(/<ul>([\s\S]*?)<\/ul>/g, (_, inner) =>
        '<ul>' + inner.replace(/<br>/g, '') + '</ul>'
    )

    // wrap in paragraph if not already block-level
    if (!html.startsWith('<h') && !html.startsWith('<pre') && !html.startsWith('<ul') && !html.startsWith('<blockquote')) {
        html = '<p>' + html + '</p>'
    }

    return html
}
