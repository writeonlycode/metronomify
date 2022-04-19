import React from 'react';
import {ActionIcon, Affix} from '@mantine/core';
import {IconAdjustments} from '@tabler/icons';

const SettingsButton = ({onClick}) => {
  return (
    <Affix position={{ top: 32, right: 32 }}>
      <ActionIcon size="xl" radius="xl" variant="filled" onClick={onClick}>
        <IconAdjustments />
      </ActionIcon>
    </Affix>
   );
}

export default SettingsButton;
