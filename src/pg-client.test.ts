/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import { PgClient } from '.';

it('should throw error if not connected to the DB server', () => {
  expect(() => {
    PgClient.client;
  }).toThrow();
});
