/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2022 Power Kernel
 */

import { Client } from 'pg';
import { PgConfig } from '.';

class PgClient {
  private wrappedClient?: Client;

  get client(): Client {
    if (!this.wrappedClient) {
      throw new Error('Cannot access PostgreSQL client before connecting');
    }
    return this.wrappedClient;
  }

  async connect(pgConfig: PgConfig): Promise<void> {
    this.wrappedClient = new Client({
      host: pgConfig.host,
      port: pgConfig.port,
      user: pgConfig.user,
      password: pgConfig.password,
    });
    await this.wrappedClient.connect();
  }

  async close(): Promise<void> {
    if (this.wrappedClient) {
      await this.wrappedClient.end();
    }
  }
}

export default new PgClient();
