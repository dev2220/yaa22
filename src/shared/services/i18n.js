import i18next from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import * as resources from 'shared/locales';

i18next.use(reactI18nextModule).init({
  fallbackLng: 'en',
  defaultNS: 'common',
  fallbackNS: 'common',
  resources,
  debug: false,
});

export default i18next;
