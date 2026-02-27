import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import SplashScreen from './pages/SplashScreen';
import UserSelectionScreen from './pages/UserSelectionScreen';
import TravellerHomeScreen from './pages/TravellerHomeScreen';
import DestinationDetailPage from './pages/DestinationDetailPage';
import HostProfilePage from './pages/HostProfilePage';
import TrustDashboardScreen from './pages/TrustDashboardScreen';
import HostOnboardingFlow from './pages/HostOnboardingFlow';
import ExploreScreen from './pages/ExploreScreen';
import ProfileScreen from './pages/ProfileScreen';
import StoriesScreen from './pages/StoriesScreen';
import OfflineBanner from './components/OfflineBanner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <OfflineBanner />
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  ),
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SplashScreen,
});

const userSelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user-selection',
  component: UserSelectionScreen,
});

const travellerHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traveller/home',
  component: TravellerHomeScreen,
});

const travellerExploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traveller/explore',
  component: ExploreScreen,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || '',
    category: (search.category as string) || '',
  }),
});

const travellerStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traveller/stories',
  component: StoriesScreen,
});

const travellerTrustRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traveller/trust',
  component: TrustDashboardScreen,
});

const travellerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/traveller/profile',
  component: ProfileScreen,
});

const destinationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/destination/$id',
  component: DestinationDetailPage,
});

const hostProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/host/$id',
  component: HostProfilePage,
});

const hostOnboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/host/onboarding',
  component: HostOnboardingFlow,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  userSelectionRoute,
  travellerHomeRoute,
  travellerExploreRoute,
  travellerStoriesRoute,
  travellerTrustRoute,
  travellerProfileRoute,
  destinationDetailRoute,
  hostProfileRoute,
  hostOnboardingRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
