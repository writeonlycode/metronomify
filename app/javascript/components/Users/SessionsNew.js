import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  TextInput,
  PasswordInput,
  Space,
  Button,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconLock } from "@tabler/icons";
import { signIn } from "../../apis/users";

const SessionsNew = () => {
  const queryClient = useQueryClient();

  const signInMutation = useMutation(signIn, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Welcome!",
        message: "You are now loggged in as " + data.email + ".",
      });
    },
    onError: (data) => {
      showNotification({
        color: "red",
        title: "Ops, something is wrong...",
        message: data.error,
      });
    },
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => signInMutation.mutate(values))}>
        <TextInput
          required
          disabled={signInMutation.isLoading}
          icon={<IconAt />}
          placeholder="Your email"
          type="email"
          {...form.getInputProps("email")}
        />
        <Space h="sm" />
        <PasswordInput
          required
          disabled={signInMutation.isLoading}
          icon={<IconLock />}
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Space h="xl" />
        <Checkbox disabled={signInMutation.isLoading} label="Remember me" />
        <Space h="xl" />
        <Button fullWidth loading={signInMutation.isLoading} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default SessionsNew;
