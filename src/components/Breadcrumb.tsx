// components/Breadcrumb.tsx
// Semantic breadcrumb navigation with Schema.org microdata annotations.
// Used on all inner pages (/work, /services, /about, /contact, /privacy, /terms, /world-live).

interface BreadcrumbProps {
  currentPageName: string;
  currentPagePath: string;
}

export default function Breadcrumb({ currentPageName, currentPagePath }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto px-4 pt-32 pb-0"
    >
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex items-center gap-2 text-xs text-[var(--muted-fg)] font-medium"
      >
        <li
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
          className="flex items-center gap-2"
        >
          <a
            itemProp="item"
            href="https://www.creatiancy.com"
            className="hover:text-[var(--ruby-red)] transition-colors duration-200"
          >
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
          <span className="text-[var(--muted-fg)]/40 select-none" aria-hidden="true">/</span>
        </li>
        <li
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
          className="flex items-center"
        >
          <a
            itemProp="item"
            href={`https://www.creatiancy.com${currentPagePath}`}
            className="text-[var(--text)]/70"
            aria-current="page"
          >
            <span itemProp="name">{currentPageName}</span>
          </a>
          <meta itemProp="position" content="2" />
        </li>
      </ol>
    </nav>
  );
}
