import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './network/queries/client';
import router from './router';
import './assets/index.css';
import ListActionsProvider from './context/ListActions.provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ListActionsProvider>
        <RouterProvider router={router}></RouterProvider>
      </ListActionsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
