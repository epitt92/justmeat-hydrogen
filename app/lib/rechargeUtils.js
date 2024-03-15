import { loginWithShopifyCustomerAccount } from '@rechargeapps/storefront-client';
import { json } from '@shopify/remix-oxygen';

const RECHARGE_SESSION_KEY = 'rechargeSession';

// loginHelper function
async function loginRecharge(context) {
  const customerAccessToken = await context.customerAccount.getAccessToken();
  const rechargeSession = await loginWithShopifyCustomerAccount(customerAccessToken);

  if (rechargeSession) {
    context.rechargeSession.set(RECHARGE_SESSION_KEY, rechargeSession);
  } else {
    // this should match your catch boundary
    throw json('No session created', { status: 400 });
  }

  return rechargeSession;
}

// helper function for data fetching
export async function rechargeQueryWrapper(rechargeFn, context) {
  let rechargeSession = context.rechargeSession.get(RECHARGE_SESSION_KEY);
  if (!rechargeSession) {
    rechargeSession = await loginRecharge(context);
  }

  try {
    return await rechargeFn(rechargeSession);
  } catch (e) {
    try {
      if (e?.status === 401) {
        // handle auth error, login again and retry request
        rechargeSession = await loginRecharge(context);
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