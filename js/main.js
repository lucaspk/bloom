'use strict';

import { mountIcons } from './lib/icons.js';
import { initAppState } from './state.js';
import { render } from './bloom-app.js';
import './bloom-events.js';

mountIcons();
initAppState();
render();
