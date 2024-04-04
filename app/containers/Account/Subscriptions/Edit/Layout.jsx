import { useState } from 'react'
import { addDays, format } from 'date-fns'
import { NavLink, useLoaderData, useNavigate } from '@remix-run/react'
import { useSubmitPromise } from '~/hooks/useSubmitPromise'
import { Button } from '~/components/Button'

export const SubscriptionEditLayout = ({ children }) => {
  const submit = useSubmitPromise()
  const navigate = useNavigate()

  const { id, subscription, upcomingChargeId } = useLoaderData()

  const [processing, setProcessing] = useState(false)
  const [delaying, setDelaying] = useState(false)
  const [canceling, setCanceling] = useState(false)

  const handleProcess = async () => {
    setProcessing(true)

    const res = await submit(
      {
        body: JSON.stringify({
          api: 'process-charge',
          chargeId: upcomingChargeId,
        }),
      },
      {
        method: 'post',
        action: `/account/subscriptions/${id}`,
      },
    )

    if (res.msg === 'ok') {
      alert("We've successfully proceeded your order")
    }

    setProcessing(false)
    navigate('..')
  }

  const handleDelay = async () => {
    setDelaying(true)

    const date = format(
      addDays(subscription.next_charge_scheduled_at, 7),
      'yyyy-MM-dd',
    )

    const res = await submit(
      {
        body: JSON.stringify({
          api: 'delay-subscription',
          date,
        }),
      },
      { method: 'post', action: `/account/subscriptions/${id}` },
    )

    if (res.msg === 'ok') {
      alert('Your next order has been delayed one week')
    }

    setDelaying(false)
    navigate('..')
  }

  const handleCancel = async () => {
    setCanceling(true)

    const res = await submit(
      {
        body: JSON.stringify({
          api: 'cancel-subscription',
        }),
      },
      { method: 'post', action: `/account/subscriptions/${id}` },
    )

    if (res.msg === 'ok') {
      alert('Your subscription has been canceled')
      navigate('..', { replace: true })
    }

    setCanceling(false)
    navigate('..')
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#eeeeee]">
      <div className="container mb-10 custom-collection-wrap">
        <div className="relative flex sm:flex-row flex-col sm:gap-0 gap-2 sm:justify-center sm:items-center items-start mt-[36px] mb-[30px]">
          <NavLink
            end
            prefetch="intent"
            className="sm:absolute sm:left-0 py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
            to="/account/subscriptions"
          >
            Back to Account
          </NavLink>
          <h3 className="text-2xl font-bold sm:text-4xl">
            Customize Your Order
          </h3>
        </div>
        <hr className="border border-[#707070] border-solid" />

        <div className="flex gap-2 mt-6 mb-3 sm:mt-10 sm:mb-5">
          <Button
            loading={processing}
            onClick={handleProcess}
            className="py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
          >
            Process Now
          </Button>
          <Button
            loading={delaying}
            onClick={handleDelay}
            className="py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
          >
            1 Week Delay
          </Button>
        </div>
        {children}
        <div className="my-5">
          {subscription.status === 'active' && (
            <div className="mt-10 mb-10">
              <Button
                loading={canceling}
                onClick={handleCancel}
                className="inline-block py-[5px] px-[30px] border-2 border-[#425B34] border-solid bg-white"
              >
                Cancel Subscription
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
