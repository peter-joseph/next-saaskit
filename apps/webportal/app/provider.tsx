"use client";

import { I18nProvider } from 'react-aria-components';

export function ClientProvider({lang, children} : ClientProviderProps) {
  return (
    <I18nProvider locale={lang}>
      { children }
    </I18nProvider>
  );
}

export type ClientProviderProps = {
    lang: string;
    children: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}