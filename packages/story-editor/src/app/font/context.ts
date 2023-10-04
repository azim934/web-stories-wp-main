/*
 * Copyright 2020 Google LLC
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
import { createContext } from '@googleforcreators/react';

/**
 * Internal dependencies
 */
import { noop } from '../../utils/noop';
import type { FontProviderState } from './types';

export default createContext<FontProviderState>({
  state: {
    fonts: [],
    curatedFonts: [],
    customFonts: [],
    recentFonts: [],
  },
  actions: {
    getFontsBySearch: () => Promise.resolve([]),
    getFontByName: () => null,
    maybeEnqueueFontStyle: () => Promise.resolve(),
    getFontWeight: (name: string) => [{ name, value: 400 }],
    getFontFallback: () => [''],
    ensureMenuFontsLoaded: noop,
    ensureCustomFontsLoaded: noop,
    addRecentFont: noop,
    loadCustomFonts: () => Promise.resolve(),
    loadCuratedFonts: () => Promise.resolve(),
  },
});