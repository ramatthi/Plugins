import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import {
  GroupTransformer,
  keycloakTransformerExtensionPoint,
  UserTransformer,
} from '@janus-idp/backstage-plugin-keycloak-backend';

const customGroupTransformer: GroupTransformer = async (
  entity,
  realm,
  groups,
) => {
  /* apply transformations */
  return entity;
};
const customUserTransformer: UserTransformer = async (
  entity,
  user,
  realm,
  groups,
) => {
  /* apply transformations */
  return entity;
};

export const catalogModuleKeycloakTransformer = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'keycloak-transformer',
  register(reg) {
    reg.registerInit({
      deps: { logger: coreServices.logger,    keycloak: keycloakTransformerExtensionPoint,},
      async init({ keycloak }) {
        keycloak.setUserTransformer(customUserTransformer);
        keycloak.setGroupTransformer(customGroupTransformer);
      },
    });
  },
});
