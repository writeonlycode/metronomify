import React from 'react';
import {ActionIcon, Affix} from '@mantine/core';
import {IconCopy} from '@tabler/icons';

const CopyButton = ({onClick}) => {
  return (
    <Affix position={{ top: 84, right: 32 }}>
      <ActionIcon size="xl" radius="xl" variant="filled" onClick={onClick}>
        <IconCopy />
      </ActionIcon>
    </Affix>
   );
}

export default CopyButton;
