import { loginShopifyApi } from '@rechargeapps/storefront-client';
import { json } from '@shopify/remix-oxygen';

// Recharge session is good for 60 minutes so set to 55 minutes to avoid race conditions
const RECHARGE_SESSION_DURATION = 1000 * 60 * 55;

// loginHelper function
export async function loginRecharge({ hydrogenSession, shopifyStorefrontToken }) {
  const customerAccessToken = await hydrogenSession.get('customerAccessToken');
  const rechargeSession = await loginShopifyApi(shopifyStorefrontToken, customerAccessToken);

  if (rechargeSession) {
    const sessionWithExpires = {
      ...rechargeSession,
      expiresAt: Date.now() + RECHARGE_SESSION_DURATION,
    };
    await hydrogenSession.set('rechargeSession', sessionWithExpires);
  } else {
    // this should match your catch boundary
    throw json('No session created', { status: 400 });
  }

  return rechargeSession;
}

// helper function for data fetching
export async function rechargeQueryWrapper(rechargeFn, { hydrogenSession, shopifyStorefrontToken }) {
  let rechargeSession = await hydrogenSession.get('rechargeSession');
  if (!rechargeSession || rechargeSession.expiresAt < Date.now()) {
    rechargeSession = await loginRecharge({
      hydrogenSession,
      shopifyStorefrontToken,
    });
  }

  try {
    return await rechargeFn(rechargeSession);
  } catch (e) {
    try {
      if (e?.status === 401) {
        // handle auth error, login again and retry request
        rechargeSession = await loginRecharge({
          hydrogenSession,
          shopifyStorefrontToken,
        });
        return await rechargeFn(rechargeSession);
      }
      // this should match your catch boundary
      throw json(e.message, { status: e?.status });
    } catch (error) {
      // this should match your catch boundary
      throw json(e.message, { status: e?.status });
    }
  }
}