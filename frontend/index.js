import 'core-js/stable';
import 'regenerator-runtime';
import 'whatwg-fetch';

async function example() {
  const resp = await fetch('http://ifconfig.me/ip');
  document.body.innerText = (await resp.text());
}

example();
