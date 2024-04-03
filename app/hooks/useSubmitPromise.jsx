import { useEffect, useCallback, useRef } from 'react'
import { useSubmit, useActionData, useNavigation } from '@remix-run/react'

export function useSubmitPromise() {
  const submit = useSubmit()
  const navigation = useNavigation()
  const actionData = useActionData()
  const deferredRef = useRef(deferred())

  useEffect(() => {
    if (navigation.state === 'idle' && actionData) {
      deferredRef.current.resolve(actionData)
    }
  }, [navigation.state, actionData])

  const _submit = useCallback(
    (target, options = {}) => {
      deferredRef.current = deferred()
      submit(target, options)
      return deferredRef.current.promise
    },
    [submit],
  )

  return _submit
}

function deferred() {
  let resolve
  let reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return { resolve, reject, promise }
}
