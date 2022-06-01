import React from 'react';
import {Text, TextInput} from '@mantine/core';

const DisplayPomodoro = ({timer, description, setDescription}) => {
  return (
    <>
      <Text
        align="center"
        style={{
          marginBottom: "8px",
        }}
      >
        {timer.remaining.format("HH:mm:ss")}
      </Text>
      <TextInput
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        styles={{
          input: { textAlign: "center" },
        }}
      />
    </>
   );
}

export default DisplayPomodoro;
