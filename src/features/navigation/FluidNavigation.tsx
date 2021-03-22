import clsx from 'clsx';
import { ReactNode } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { feedRoutes } from '../feed/routes';
import { communityRoutes } from '../community/routes';
import { postRoutes } from '../posts/routes';
import { NotFound } from '../../NotFound';

import { ReactComponent as FeedIcon } from './assets/feed.svg';
import { ReactComponent as SmileIcon } from './assets/smile.svg';
import styles from './FluidNavigation.module.css';

export function FluidNavigation() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <main className={styles.screen}>
          <Switch>
            {feedRoutes}
            {postRoutes}
            {communityRoutes}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <div className={styles.items}>
          <FluidNavItem to="/feed" label="Feed">
            <FeedIcon className="fill-current icon" />
          </FluidNavItem>
          <FluidNavItem to="/profile" label="Perfil">
            <SmileIcon className="fill-current icon" />
          </FluidNavItem>
        </div>
      </div>
    </div>
  );
}

interface FluidNavItemProps {
  to: string;
  children: ReactNode;
  label: ReactNode;
}

function FluidNavItem({ to, children, label }: FluidNavItemProps) {
  const match = useRouteMatch(to);

  return (
    <Link
      to={to}
      className={clsx(
        'flex flex-1 flex-col items-center justify-center rounded-xl',
        'md:flex-grow-0 md:flex-row md:justify-start md:py-2 md:px-4 md:space-x-4',
        'bg-transparent md:hover:bg-opacity-10 md:hover:bg-brand md:hover:text-brand',
        'transition-colors duration-200',
        {
          'text-gray-600': !match,
          'text-brand': match,
        },
      )}
    >
      {children}
      <span className="text-xs md:text-base">{label}</span>
    </Link>
  );
}
