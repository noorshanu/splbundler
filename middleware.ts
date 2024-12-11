import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/", "/dashboard/settings"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const currentPath = req.nextUrl.pathname;

  // Helper to create absolute URLs dynamically
  const createUrl = (path: string | URL) => {
    const baseUrl = req.nextUrl.origin || `https://${req.headers.get("host")}`;
    return new URL(path, baseUrl);
  };

  // Handle unauthenticated users on private routes
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect users who haven't completed onboarding to the settings page
  if (
    userId &&
    !sessionClaims?.metadata?.onboardingComplete &&
    currentPath !== "/dashboard/settings"
  ) {
    return NextResponse.redirect(createUrl("/dashboard/settings"));
  }

  // Redirect users who completed onboarding to the dashboard if they visit the root
  if (
    userId &&
    sessionClaims?.metadata?.onboardingComplete &&
    currentPath === "/"
  ) {
    return NextResponse.redirect(createUrl("/dashboard"));
  }

  // Allow access to private routes for authenticated users
  return NextResponse.next();
});

// Middleware configuration to handle routes
export const config = {
  matcher: [
    // Match all dynamic routes except for static files and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always match API routes
    '/(api|trpc)(.*)',
  ],
};