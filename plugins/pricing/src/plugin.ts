import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pricingPlugin = createPlugin({
  id: 'pricing',
  routes: {
    root: rootRouteRef,
  },
});

export const PricingPage = pricingPlugin.provide(
  createRoutableExtension({
    name: 'PricingPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
