import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FocusableItem, FocusableItemProps, Menu, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import { ReactComponent as MoreIcon } from '@r2/assets/icons/more.svg';
import { ReactComponent as AddIcon } from '@r2/assets/icons/add.svg';

const paths = [
  {
    to: '/community/create',
    children: (
      <>
        <AddIcon className="icon fill-current -ml-1" />
        <span>Criar comunidade</span>
      </>
    ),
  },
];

export interface FeedMenuProps {}

export function FeedMenu(props: FeedMenuProps) {
  return (
    <Menu
      portal
      align="end"
      direction="bottom"
      offsetX={12}
      offsetY={12}
      className="rounded-xl p-0 divide-y divide-gray-200"
      menuButton={
        <MenuButton className="text-gray-600 ring-gray-600 icon-button">
          <span className="sr-only">Menu</span>
          <MoreIcon className="icon fill-current" />
        </MenuButton>
      }
    >
      {paths.map((path) => (
        <FocusableItem className={feedMenuItemClasses} key={path.to}>
          {({ ref, closeMenu }) => (
            <Link
              to={path.to}
              ref={ref}
              onClick={({ detail }) => closeMenu(detail === 0 ? 'Enter' : undefined)}
              className="flex items-center space-x-2 px-4 py-3"
            >
              {path.children}
            </Link>
          )}
        </FocusableItem>
      ))}
    </Menu>
  );
}

const feedMenuItemClasses: FocusableItemProps['className'] = ({ hover }) =>
  clsx('bg-transparent p-0 text-gray-600 text-sm font-medium', {
    'text-brand bg-transparent': hover,
  });
