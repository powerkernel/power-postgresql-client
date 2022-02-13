/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import { PgClient } from '.';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

it('should throw error if not connected to the DB server', async () => {
  expect(() => {
    PgClient.client;
  }).toThrow();
});

it('should return the Client instance', async () => {
  await PgClient.connect({
    host: 'localhost',
    port: 4532,
    user: 'postgres',
    password: 'YOUR_PASSWORD',
  });
  expect(PgClient.client);
});

it('should connect to the DB server', async () => {
  const spyConnect = jest.spyOn(PgClient, 'connect');
  await PgClient.connect({
    host: 'localhost',
    port: 4532,
    user: 'postgres',
    password: 'YOUR_PASSWORD',
  });
  expect(spyConnect).toHaveBeenCalledTimes(1);
});

it('should close the connection', async () => {
  const spyClose = jest.spyOn(PgClient, 'close');

  await PgClient.connect({
    host: 'localhost',
    port: 4532,
    user: 'postgres',
    password: 'YOUR_PASSWORD',
  });
  await PgClient.close();

  expect(spyClose).toHaveBeenCalledTimes(1);
});
