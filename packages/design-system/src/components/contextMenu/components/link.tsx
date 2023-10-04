/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from '@googleforcreators/react';
import type { ComponentPropsWithoutRef, SyntheticEvent } from 'react';
/**
 * Internal dependencies
 */
import { Link as BaseLink } from '../../typography/link';
import { useContextMenu } from '../contextMenuProvider';
import { menuItemStyles } from './styles';

const StyledLink = styled(BaseLink)`
  ${menuItemStyles};

  background-color: transparent;
  text-decoration: none;

  :active,
  :hover,
  :focus,
  :active *,
  :hover *,
  :focus * {
    /* Override the override to WordPress's common css */
    color: ${({ theme }) => theme.colors.fg.primary} !important;
  }

  :hover {
    background-color: ${({ theme }) =>
      theme.colors.interactiveBg.secondaryHover};
  }

  :active {
    background-color: ${({ theme }) =>
      theme.colors.interactiveBg.secondaryPress};
  }
`;

export interface MenuLinkProps
  extends ComponentPropsWithoutRef<typeof StyledLink> {
  id?: string;
  href: string;
  onClick?: (evt: SyntheticEvent<HTMLElement>) => void;
  onBlur?: (evt: SyntheticEvent<HTMLElement>) => void;
  onFocus?: (evt: SyntheticEvent<HTMLElement>) => void;
  openNewTab?: boolean;
}

/**
 * A styled link for use in the context menu.
 */
function Link({
  id,
  onBlur,
  onClick,
  onFocus,
  openNewTab,
  ...props
}: MenuLinkProps) {
  const { focusedId, onDismiss, onMenuItemBlur, onMenuItemFocus } =
    useContextMenu(({ state, actions }) => ({
      focusedId: state.focusedId,
      onDismiss: actions.onDismiss,
      onMenuItemBlur: actions.onMenuItemBlur,
      onMenuItemFocus: actions.onMenuItemFocus,
    }));
  const autoGeneratedId = useMemo(uuidv4, []);
  const elementId = id || autoGeneratedId;

  const handleBlur = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    onMenuItemBlur();
    onBlur?.(evt);
  };

  const handleClick = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    onClick?.(evt);
    onDismiss(evt.nativeEvent);
  };

  const handleFocus = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    onMenuItemFocus(elementId);
    onFocus?.(evt);
  };

  const newTabProps = openNewTab
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

  return (
    <StyledLink
      id={elementId}
      tabIndex={focusedId === elementId ? 0 : -1}
      role="menuitem"
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      {...newTabProps}
      {...props}
    />
  );
}

export default Link;