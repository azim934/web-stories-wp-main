/*
 * Copyright 2022 Google LLC
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

/**
 * Internal dependencies
 */
import { STORYBOOK_PAGE_SIZE } from '../../../storybookUtils';
import { CardGrid, CardGridItem } from '../..';

export default {
  title: 'Dashboard/Components/CardGridItem',
  component: CardGridItem,
  args: {
    message: 'Sample grid item - anything can go here',
  },
};

const Card = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 20px;
  background-color: orange;
`;

export const _default = {
  render: function Render(args) {
    return (
      <CardGrid pageSize={STORYBOOK_PAGE_SIZE}>
        <CardGridItem>
          <Card>{args.message}</Card>
        </CardGridItem>
      </CardGrid>
    );
  },
};
