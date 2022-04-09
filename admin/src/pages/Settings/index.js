import React from 'react'
import { useIntl } from 'react-intl'
import { SettingsPageTitle, useFocusWhenNavigate } from '@strapi/helper-plugin'
import {
  HeaderLayout,
  Layout,
  ContentLayout,
} from '@strapi/design-system/Layout'
import { Main, TextInput, Box, Typography, Button } from '@strapi/design-system'

import { Stack } from '@strapi/design-system/Stack'
import useSettings from '../../Hooks/useSettings'
import getTrad from '../../utils/getTrad'

const SettingsPage = () => {
  const { formatMessage } = useIntl()
  useFocusWhenNavigate()
  const { baseURL, setBaseURL, updateSettings } = useSettings()

  return (
    <Layout>
      <SettingsPageTitle name="Application" />
      <Main>
        <HeaderLayout
          title={formatMessage({
            id: getTrad('settings.title'),
            defaultMessage: 'Impersonation',
          })}
          subtitle={formatMessage({
            id: getTrad('settings.description'),
            defaultMessage:
              'Configure the settings for the Impersonation plugin',
          })}
        />
        <ContentLayout>
          <Box
            hasRadius
            background="neutral0"
            shadow="tableShadow"
            paddingTop={7}
            paddingBottom={7}
            paddingRight={6}
            paddingLeft={6}
          >
            <Stack spacing={5}>
              <Box padding={2}>
                <TextInput
                  placeholder="https://example.com?jwt="
                  label={formatMessage({
                    id: getTrad('settings.baseURL.label'),
                    defaultMessage: 'Base URL for impersonation',
                  })}
                  name="baseURL"
                  hint={formatMessage({
                    id: getTrad('settings.baseURL.hint'),
                    defaultMessage:
                      'A page or API on your site that reads the token from a URL parameter',
                  })}
                  value={baseURL}
                  onChange={(e) => setBaseURL(e.target.value)}
                />
              </Box>
              <Box paddingTop={1} paddingLeft={2}>
                <Typography variant="pi" style={{ color: 'red' }}>
                  {formatMessage({
                    id: getTrad('settings.security-warning'),
                    defaultMessage:
                      'This plugin will give an authorized admin user full access to all user accounts. Use this with caution!',
                  })}
                </Typography>
              </Box>
              <Box
                paddingTop={2}
                paddingLeft={2}
                paddingRight={2}
                paddingBottom={2}
              >
                <Button variant="secondary" onClick={() => updateSettings()}>
                  Save
                </Button>
              </Box>
            </Stack>
          </Box>
        </ContentLayout>
      </Main>
    </Layout>
  )
}

export default SettingsPage
