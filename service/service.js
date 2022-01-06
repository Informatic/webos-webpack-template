import 'core-js/stable';
import 'regenerator-runtime/runtime';

import packageInfo from './package.json';
const service = new Service(packageInfo.id);

service.register("demo", (message) => {
  message.respond({
    some: 'value',
  });
});
