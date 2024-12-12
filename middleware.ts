import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/dashboard/settings"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Set the base URL dynamically based on the environment
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://spl.blocktools.ai" // Replace with your production URL
      : req.nextUrl.origin || `http://${req.headers.get("host")}`;

  // Helper function to construct full URLs
  const buildUrl = (path: string | URL) => new URL(path, baseUrl).toString();

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding
  if (
    userId &&
    !sessionClaims?.metadata?.onboardingComplete &&
    req.nextUrl.pathname !== "/dashboard/settings"
  ) {
    return NextResponse.redirect(buildUrl("/dashboard/settings"));
  }

  // Redirect users with `onboardingComplete: true` to the dashboard
  if (
    userId &&
    sessionClaims?.metadata?.onboardingComplete &&
    req.nextUrl.pathname === "/"
  ) {
    return NextResponse.redirect(buildUrl("/dashboard"));
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};