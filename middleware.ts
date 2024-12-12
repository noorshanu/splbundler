import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/dashboard/settings"])
const PRODUCTION_BASE_URL = "https://spl.blocktools.ai";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const currentPath = req.nextUrl.pathname;

  // Helper to construct the URL for redirection
  const createUrl = (path: string): URL => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? PRODUCTION_BASE_URL
        : req.nextUrl.origin || `http://${req.headers.get("host")}`;
    return new URL(path, baseUrl);
  };

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }  

 

  // // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete && req.nextUrl.pathname !== "/dashboard/settings") {
    const onboardingUrl = new URL("/dashboard/settings", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
  if (userId && sessionClaims?.metadata?.onboardingComplete && req.nextUrl.pathname == "/") {
    const onboardingUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(onboardingUrl);
  }
  // If the user is logged in and the route is protected, let them view.
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
};
