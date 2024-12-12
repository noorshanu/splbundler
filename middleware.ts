import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/", "/dashboard/settings"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Dynamic base URL configuration
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://spl.blocktools.ai" // Production domain
      : req.nextUrl.origin || `http://${req.headers.get("host")}`;

  // Helper function to build full URLs
  const buildUrl = (path: string | URL) => new URL(path, baseUrl).toString();

  // Redirect to sign-in if the user is not logged in and the route is private
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: buildUrl(req.nextUrl.pathname) });
  }

  // Redirect users who haven't completed onboarding
  if (
    userId &&
    !sessionClaims?.metadata?.onboardingComplete &&
    req.nextUrl.pathname !== "/dashboard/settings"
  ) {
    return NextResponse.redirect(buildUrl("/dashboard/settings"));
  }

  // Redirect users who completed onboarding from the root to the dashboard
  if (
    userId &&
    sessionClaims?.metadata?.onboardingComplete &&
    req.nextUrl.pathname === "/"
  ) {
    return NextResponse.redirect(buildUrl("/dashboard"));
  }

  // Allow the request to proceed if the user is logged in and the route is protected
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}