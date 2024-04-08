import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/Button'

const zapierHook = 'https://hooks.zapier.com/hooks/catch/18452229/3p52w81/'

export const ContactForm = ({ formName }) => {
  const [submitting, setSubmitting] = useState(false)

  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  // Function to run on form submit that sends data to Zapier
  const onSubmit = async (data) => {
    setSubmitting(true)

    try {
      const response = await fetch(zapierHook, {
        method: 'POST',
        body: data,
      })
      const result = await response.json()

      reset()
      alert('Thank you.')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        formName === 'first'
          ? 'relative xl:pt-[46px] xl:pb-[36px] xl:px-[50px] pt-[30px] pb-[30px] px-[33px] rounded-[8px] bg-[#ffffff25] flex flex-col items-start gap-[16px]'
          : 'relative xl:pt-[46px] xl:pb-[36px] xl:px-[50px] pt-[30px] pb-[30px] px-[33px] rounded-[8px] bg-white flex flex-col items-start gap-[16px]'
      }
    >
      <div className="w-full">
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter your name"
          className={
            formName === 'first'
              ? 'bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
              : 'bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
          }
        />
        {errors.name && (
          <p
            className={
              formName === 'first'
                ? 'text-white uppercase text-[12px]'
                : 'text-black uppercase text-[12px]'
            }
          >
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Enter your email"
          type="email"
          className={
            formName === 'first'
              ? 'bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
              : 'bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
          }
        />
        {errors.email && (
          <p
            className={
              formName === 'first'
                ? 'text-white uppercase text-[12px]'
                : 'text-black uppercase text-[12px]'
            }
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <input
          {...register('phone', { required: 'Phone number is required' })}
          placeholder="Enter your phone"
          type="tel"
          className={
            formName === 'first'
              ? 'bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
              : 'bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
          }
        />
        {errors.phone && (
          <p
            className={
              formName === 'first'
                ? 'text-white uppercase text-[12px]'
                : 'text-black uppercase text-[12px]'
            }
          >
            {errors.phone.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <textarea
          {...register('message', { required: 'Message is required' })}
          placeholder="Enter your message"
          className={
            formName === 'first'
              ? 'bg-[#222] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
              : 'bg-[#efeeed] rounded-[4px] font-nunito text-[17px] font-bold lg:px-[17px] lg:py-[10px] px-[10px] py-[3px] border-none w-full'
          }
        />
        {errors.message && (
          <p
            className={
              formName === 'first'
                ? 'text-white uppercase text-[12px]'
                : 'text-black uppercase text-[12px]'
            }
          >
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          loading={submitting}
          className="text-[16px] font-normal px-[24px] py-[12px] rounded-[4px] text-white bg-[#223661]"
        >
          SUBMIT
        </Button>
        <div className=""></div>
      </div>
    </form>
  )
}
