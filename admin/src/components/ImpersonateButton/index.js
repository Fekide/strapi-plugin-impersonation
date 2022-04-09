import React from 'react'
import { Button } from '@strapi/design-system/Button'
import Key from '@strapi/icons/Key'
import {
  CheckPermissions,
  useCMEditViewDataManager,
  useNotification,
} from '@strapi/helper-plugin'
import { useIntl } from 'react-intl'
import permissions from '../../permissions'
import axiosInstance from '../../utils/axiosInstance'
import { getTrad } from '../../utils'

export default function ImpersonateButton() {
  const { initialData, layout } = useCMEditViewDataManager()
  const toggleNotification = useNotification()
  const { formatMessage } = useIntl()

  if (layout.uid != 'plugin::users-permissions.user' || !initialData.id) {
    return <></>
  }

  const onClick = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axiosInstance.post('/impersonation/impersonate', {
        user: initialData,
      })
      window.open(data.impersonateURL, '_blank')
    } catch (error) {
      toggleNotification({
        type: 'warning',
        message: {
          id: getTrad(error.response?.data?.error?.message),
          defaultMessage: 'Failed to create impersonation URL',
        },
      })
    }
  }

  return (
    <CheckPermissions permissions={permissions.impersonate}>
      <Button startIcon={<Key />} variant="secondary" onClick={onClick}>
        {formatMessage({
          id: getTrad('impersonate-button.label'),
          defaultMessage: 'Impersonate',
        })}
      </Button>
    </CheckPermissions>
  )
}
