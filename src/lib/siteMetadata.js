export const siteUrl = 'https://manthanone.vercel.app';

const defaultDescription = 'Manthan Gadegone is a web developer and data analyst. Explore responsive web projects, data analysis work, internship experience, and Microsoft Fabric certifications.';

function normalizePathname(pathname = '/') {
  const path = pathname.split(/[?#]/, 1)[0] || '/';
  return path === '/' ? path : path.replace(/\/+$/, '');
}

function truncateDescription(description) {
  return description.length > 160
    ? `${description.slice(0, 157).trimEnd()}...`
    : description;
}

export function toAbsoluteUrl(pathname) {
  return new URL(pathname, siteUrl).toString();
}

export function getPageMetadata(pathname, portfolio) {
  const normalizedPathname = normalizePathname(pathname);
  const projectSlug = normalizedPathname.startsWith('/project/')
    ? normalizedPathname.split('/').filter(Boolean).at(-1)
    : null;
  const project = projectSlug
    ? portfolio.projects.find((item) => item.slug === projectSlug || item.id === projectSlug)
    : null;
  const shortName = portfolio.hero.name.split(' ')[0];
  const pageTitle = normalizedPathname === '/'
    ? `${shortName} | Portfolio`
    : project
      ? `${project.title} | ${shortName}`
      : normalizedPathname === '/projects'
        ? `Projects | ${shortName}`
        : normalizedPathname === '/playground'
          ? `Playground | ${shortName}`
          : `Page not found | ${shortName}`;
  const sourceDescription = project
    ? project.description
    : normalizedPathname === '/projects'
      ? 'Selected web development and data analysis projects by Manthan Gadegone.'
      : normalizedPathname === '/playground'
        ? 'Creative work and design explorations by Manthan Gadegone.'
        : defaultDescription;
  const knownRoute = normalizedPathname === '/' || normalizedPathname === '/projects'
    || normalizedPathname === '/playground' || Boolean(project);
  const image = project?.image || portfolio.hero.profileImage;

  return {
    canonicalUrl: toAbsoluteUrl(normalizedPathname),
    description: truncateDescription(sourceDescription),
    image: toAbsoluteUrl(image),
    imageAlt: project ? `${project.title} project preview` : portfolio.hero.name,
    knownRoute,
    pathname: normalizedPathname,
    project,
    title: pageTitle,
  };
}

export function getStaticRoutes(portfolio) {
  return [
    '/',
    '/projects',
    '/playground',
    ...portfolio.projects.map((project) => `/project/${project.slug || project.id}`),
  ];
}

export function getStructuredData(metadata, portfolio, { dateModified } = {}) {
  const personId = `${siteUrl}/#person`;
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: portfolio.hero.name,
    url: toAbsoluteUrl('/'),
    image: toAbsoluteUrl(portfolio.hero.profileImage),
    jobTitle: portfolio.hero.roles.join(' / '),
    sameAs: portfolio.hero.socials
      .map((social) => social.link)
      .filter((link) => link.startsWith('https://')),
  };

  if (!metadata.project) {
    return {
      '@context': 'https://schema.org',
      '@graph': [person],
    };
  }

  const creativeWork = {
    '@type': 'CreativeWork',
    name: metadata.project.title,
    description: metadata.project.fullDescription || metadata.description,
    author: { '@id': personId },
    image: metadata.image,
    url: metadata.canonicalUrl,
  };

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateModified || '')) {
    creativeWork.dateModified = dateModified;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      creativeWork,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: toAbsoluteUrl('/projects') },
          { '@type': 'ListItem', position: 3, name: metadata.project.title, item: metadata.canonicalUrl },
        ],
      },
    ],
  };
}
