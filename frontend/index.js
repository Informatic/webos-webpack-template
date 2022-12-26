import 'core-js/stable';
import 'regenerator-runtime';
import 'whatwg-fetch';

import './domrect-polyfill';
import './spatial-navigation-polyfill';

import React from 'react';

import {App} from './App.js';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
