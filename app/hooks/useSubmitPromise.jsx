import React, { useMemo, useState, useEffect, useCallback } from 'react'
import {
  Await,
  useSubmit,
  useActionData,
  useNavigation,
} from '@remix-run/react'

export function useSubmitPromise() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const actionData = useActionData()
  const $deferred = useMemo(() => deferred(), [])

  useEffect(() => {
    if (navigation.state === 'idle' && actionData) {
      $deferred.resolve(actionData)
    }
  }, [$deferred, navigation.state, actionData])

  const _submit = useCallback(
    (target, options = {}) => {
      submit(target, options)
      return $deferred.promise
    },
    [$deferred.promise, submit],
  )

  return _submit
}

// create a *deferred* promise
function deferred() {
  let resolve
  let reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return { resolve, reject, promise }
}
