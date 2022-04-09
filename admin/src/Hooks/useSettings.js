import { useState, useEffect } from 'react'
import { request, useNotification } from '@strapi/helper-plugin'
import pluginId from '../pluginId'
import getTrad from '../utils/getTrad'

export function useSettings() {
  const [settings, setSettings] = useState({
    baseURL: '',
  })
  const [refetchIndex, setRefetchIndex] = useState(true)
  const [baseURL, setBaseURL] = useState('')
  const toggleNotification = useNotification()

  const refetchSettings = () =>
    setRefetchIndex((prevRefetchIndex) => !prevRefetchIndex)

  const updateSettings = async () => {
    const { error } = await request(`/${pluginId}/settings`, {
      method: 'POST',
      body: {
        data: { baseURL },
      },
    })
    if (error) {
      toggleNotification({
        type: 'warning',
        message: {
          id: getTrad(error.response?.data?.error?.message),
          defaultMessage: 'Failed to update Settings',
        },
      })
    } else {
      refetchSettings()
      toggleNotification({
        type: 'success',
        message: {
          id: getTrad('settings.successful-update'),
          defaultMessage: 'Settings sucessfully updated!',
        },
      })
    }
  }

  const fetchSettings = async () => {
    const { data, error } = await request(`/${pluginId}/settings`, {
      method: 'GET',
    })

    if (error) {
      toggleNotification({
        type: 'warning',
        message: {
          id: getTrad(error.response?.data?.error?.message),
          defaultMessage: 'Failed to get settings',
        },
      })
    } else {
      setSettings(data)
      setBaseURL(data?.baseURL)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [refetchIndex])

  return {
    settings,
    updateSettings,
    setBaseURL,
    baseURL,
  }
}
export default useSettings
