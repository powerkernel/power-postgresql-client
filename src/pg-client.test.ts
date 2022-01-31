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

it('connects to the DB server', () => {
  const spyConnect = jest.spyOn(PgClient, 'connect').mockImplementation();
  PgClient.connect({
    host: 'localhost',
    port: 4532,
    user: 'postgres',
    password: 'YOUR_PASSWORD',
  });

  expect(spyConnect).toHaveBeenCalledTimes(1);
});

it('closes the connection', () => {
  const spyClose = jest.spyOn(PgClient, 'close').mockImplementation();

  PgClient.close();

  expect(spyClose).toHaveBeenCalledTimes(1);
});
