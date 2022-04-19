import React, { useEffect, useRef, useState } from "react";
import { ActionIcon, Group, NumberInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";

const BeatsInput = ({ label, value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(2);
  const handlers = useRef();

  useEffect(() => {
    setCurrentValue(value);
  }, []);

  useEffect( () => {
    onChange(currentValue);
  }, [currentValue]);

  return (
    <Group position="apart">
    <label style={{ textTransform: "uppercase", fontWeight: "500", fontSize: "14px" }}>{ label }</label>
    <Group spacing={5}>
      <ActionIcon
        size="lg"
        radius="xl"
        variant="filled"
        style={{ flexGrow: 0 }}
        onClick={() => handlers.current.decrement()}
      >
        <IconMinus size="18px" />
      </ActionIcon>

      <NumberInput
        hideControls
        aria-label={label}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
        handlersRef={handlers}
        max={10}
        min={1}
        step={1}
        styles={{ input: { width: 54, textAlign: "center" } }}
        variant="unstyled"
      />

      <ActionIcon
        size="lg"
        radius="xl"
        variant="filled"
        style={{ flexGrow: 0 }}
        onClick={() => handlers.current.increment()}
      >
        <IconPlus size="18px" />
      </ActionIcon>
    </Group>
    </Group>
  );
};

export default BeatsInput;
