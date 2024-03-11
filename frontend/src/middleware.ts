import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/features"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/chat", "/(api|trpc)(.*)"],
};
