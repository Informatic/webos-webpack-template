import 'core-js/stable';
import 'regenerator-runtime/runtime';

import serviceInfo from './services.json';
const service = new Service(serviceInfo.id);

service.register("demo", (message) => {
  message.respond({
    some: 'value',
  });
});
