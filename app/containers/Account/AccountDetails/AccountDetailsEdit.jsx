import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/Button'
import { useSubmitPromise } from '~/hooks/useSubmitPromise'
import { cn } from '~/lib/utils'

export const AccountDetailsEdit = ({ customer }) => {
  const submit = useSubmitPromise()

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)

    try {
      const res = await submit(
        {
          body: JSON.stringify({
            api: 'update-account-details',
            ...data,
          }),
        },
        {
          method: 'post',
          action: `/account/account-details`,
        },
      )

      if (res.msg === 'ok') {
        console.debug('ok')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1  gap-x-16 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              defaultValue={customer.firstName ?? ''}
              {...register('firstName', { required: 'First name is required' })}
              className={cn(
                'block w-full text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
                errors.firstName
                  ? 'ring-red-300 focus:ring-red-500'
                  : 'ring-gray-300 focus:ring-gray-500',
              )}
              minLength={2}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              defaultValue={customer.lastName ?? ''}
              {...register('lastName', { required: 'Last name is required' })}
              className={cn(
                'block w-full text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset',
                errors.lastName
                  ? 'ring-red-300 focus:ring-red-500'
                  : 'ring-gray-300 focus:ring-gray-500',
              )}
              minLength={2}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <Button
            type="submit"
            loading={submitting}
            className="px-8 py-1 text-lg font-bold text-black border-2 border-black rounded-sm shadow-sm"
          >
            SAVE
          </Button>
        </div>
      </div>
    </form>
  )
}
