import { Menu, MenuButton, MenuProps } from '@szhsin/react-menu';

import { ReactComponent as MoreIcon } from '@r2/assets/icons/more-hor.svg';

import './DropdownMenu.css';

export interface DropdownMenuProps extends Omit<MenuProps, 'menuButton'> {
  menuButton?: MenuProps['menuButton'];
}

export function DropdownMenu({ children, menuButton, ...props }: DropdownMenuProps) {
  return (
    <Menu
      portal
      align="end"
      direction="bottom"
      offsetX={12}
      offsetY={12}
      className="rounded-xl p-0 divide-y divide-gray-200"
      menuButton={
        <MenuButton className="text-gray-400 ring-gray-400 icon-button text-sm">
          <span className="sr-only">Opções</span>
          <MoreIcon className="icon fill-current" />
        </MenuButton>
      }
      {...props}
    >
      {children}
    </Menu>
  );
}
