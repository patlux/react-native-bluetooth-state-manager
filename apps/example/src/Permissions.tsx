import { useMutation, useQuery } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'
import { Button } from 'react-native'
import { check, PERMISSIONS, request } from 'react-native-permissions'
import { queryClient } from './queryClient'

/**
 * First check permission for BLUETOOTH_CONNECT
 * if denied, display button to ask user to request permission
 * if granted, render children
 */

export const Permissions = ({ children }: PropsWithChildren) => {
  const { data } = useQuery({
    queryKey: ['/permissions', '/bluetooth-connect'],
    queryFn: () => {
      return check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
    },
  })

  const requestPermission = useMutation({
    mutationFn: async () => {
      return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/permissions', '/bluetooth-connect'],
      })
    },
  })

  console.log('Permissions()', {
    data,
    requestError: requestPermission.error,
  })

  if (data !== 'granted') {
    return (
      <Button
        title="Request for permission"
        disabled={requestPermission.isPending}
        onPress={() => requestPermission.mutate()}
      />
    )
  }

  return <>{children}</>
}
