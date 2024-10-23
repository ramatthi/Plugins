import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pricingPlugin, PricingPage } from '../src/plugin';

createDevApp()
  .registerPlugin(pricingPlugin)
  .addPage({
    element: <PricingPage />,
    title: 'Root Page',
    path: '/pricing',
  })
  .render();
