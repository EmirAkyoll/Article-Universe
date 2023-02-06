import { createI18n } from "vue-i18n";

import { v_turkish } from "./languages/tr";
import { v_english } from "./languages/en";
import { v_japanese } from "./languages/ja";
import { v_french } from "./languages/fr";
import { v_italian } from "./languages/it";

const i18n = createI18n({
locale: 'Türkçe',
fallbackLocale: 'English',
messages: {
  Türkçe: v_turkish, // turkish version
  English: v_english, // english version
  日本: v_japanese, // japanese version
  Français: v_french, // french version
  Italiano: v_italian, // italian version
  // Russian: {},
  // Arabic: {},
  // and more..
}
});

export default i18n;