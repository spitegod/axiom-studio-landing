import { Fragment, type ReactNode } from 'react';

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function isInternal(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));

    const label = match[1] ?? '';
    const href = match[2] ?? '';
    if (isInternal(href)) {
      nodes.push(
        <a key={`${href}-${index}`} className={className} href={href}>
          {label}
        </a>,
      );
    } else {
      nodes.push(<Fragment key={`text-${index}`}>{label}</Fragment>);
    }

    last = index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
