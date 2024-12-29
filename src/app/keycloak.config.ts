import {
  AutoRefreshTokenService,
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';
import { environment } from '../environments/environment';

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(\/api\/v1)(\/.*)?$/i
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: environment.keycloak.issuer,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: true,
      enableLogging: true
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
      }
    ]
  });
