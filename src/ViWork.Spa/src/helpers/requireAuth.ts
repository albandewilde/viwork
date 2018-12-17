import AuthService from "../services/AuthService";

/**
 * Filter for routes requiring an authenticated user
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
export default function requireAuth(to: any, from: any, next: any) {
    if (!AuthService.isConnected) {
        next({
            path: "/login",
            query: { redirect: to.fullPath },
        });

        return;
    }

    const requiredProviders = to.meta.requiredProviders;

    if (requiredProviders && !AuthService.isBoundToProvider(requiredProviders)) {
        next({
            path: "/",
        });

        return;
    }

    next();
}
