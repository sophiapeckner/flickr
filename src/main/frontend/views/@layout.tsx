import { useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';
import { AppLayout} from '@vaadin/react-components';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const defaultTitle = document.title;
const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});

// Publish for Vaadin to use
(window as any).Vaadin.documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title ?? defaultTitle;

  useEffect(() => {
    documentTitleSignal.value = currentTitle;
  }, [currentTitle]);

  return <AppLayout primarySection="drawer">
    <Suspense>
      <Outlet />
    </Suspense>
  </AppLayout>;
}
