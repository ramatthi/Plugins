
import { OAuth2 } from '@backstage/core-app-api';
import {
  AnyApiFactory,
  BackstageIdentityApi,
  configApiRef,
  createApiFactory,
  OpenIdConnectApi,

  ApiRef,
  ProfileInfoApi,
  SessionApi,
  createApiRef,
  discoveryApiRef,
  oauthRequestApiRef,
} from '@backstage/core-plugin-api';



export const oidcAuthApiRef: ApiRef<
OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi
> = createApiRef({
  id:"auth.keycloak.oidc"
});

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: oidcAuthApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      oauthRequestApi: oauthRequestApiRef,
      configApi: configApiRef,
    },
    factory: ({ discoveryApi, oauthRequestApi, configApi }) =>
      OAuth2.create({
        discoveryApi,
        oauthRequestApi,
        provider: {
          id: 'keycloak',
          title: 'keycloak Auth Provider',
          icon: () => null,
        },
        environment: configApi.getOptionalString('auth.environment'),
        defaultScopes: ['openid', 'profile', 'email'],
        popupOptions: {
          size: {
            width: 1000,
            height: 1000,
          },
        },
      }),
  }),
  
 
];
