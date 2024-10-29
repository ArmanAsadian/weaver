import {createLogger, packageTracer, getEnv, type FetchOptions} from 'alwatr/nanolib';
import {Region, StoreFileType, type AlwatrNitrobaseConfig, type StoreFileStat} from 'alwatr/nitrobase';

import type {CryptoFactoryConfig, NanotronApiServerConfig} from 'alwatr/nanotron';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */ createLogger(__package_name__);

export const config = {
  token: {
    secret: getEnv({ name: 'tokenSecret', developmentValue: 'DEV_SECRET' }),
    duration: '1y',
  } as CryptoFactoryConfig,

  nanotronApiServer: {
    host: getEnv({name: 'host', defaultValue: '0.0.0.0'}),
    port: +getEnv({name: 'port', defaultValue: '80', developmentValue: '8000'}),
    prefix: '/api/',
    // allowAllOrigin: true,
  } as NanotronApiServerConfig,

  nitrobase: {
    config: {
      rootPath: getEnv({name: 'dbPath', developmentValue: './db'}),
    } as AlwatrNitrobaseConfig,

    usersCollection: {
      name: 'user-info',
      region: Region.PerUser,
      type: StoreFileType.Collection,
    } as StoreFileStat,
  } as const,

  fetchOptions: {
    retry: 2,
    timeout: '6s',
  } as Partial<FetchOptions>,
} as const;

__dev_mode__: logger.logProperty?.('config', config);
