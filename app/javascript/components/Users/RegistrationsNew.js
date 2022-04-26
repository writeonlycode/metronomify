import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TextInput, PasswordInput, Space, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconLock } from "@tabler/icons";
import { signUp } from "../../apis/users";

const RegistrationNew = () => {
  const queryClient = useQueryClient();

  const signUpMutation = useMutation(signUp, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Welcome!",
        message: "You have signed up successfully.",
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
      password_confirmation: "",
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => signUpMutation.mutate(values))}>
        <TextInput
          required
          disabled={signUpMutation.isLoading}
          icon={<IconAt />}
          placeholder="Your email"
          type="email"
          {...form.getInputProps("email")}
        />
        <Space h="xl" />
        <PasswordInput
          required
          disabled={signUpMutation.isLoading}
          icon={<IconLock />}
          placeholder="Password (6 characters minimum)"
          {...form.getInputProps("password")}
        />
        <Space h="sm" />
        <PasswordInput
          required
          disabled={signUpMutation.isLoading}
          icon={<IconLock />}
          placeholder="Password confirmation"
          {...form.getInputProps("password_confirmation")}
        />
        <Space h="xl" />
        <Button loading={signUpMutation.isLoading} fullWidth type="submit">
          Sign Up
        </Button>
      </form>
      {/*
      <div>
        <Anchor size="sm" href="#">Log In</Anchor>
      </div>
      */}
    </div>
  );
};

export default RegistrationNew;

// <body>
//     <h2>Sign up</h2>

// <form class="new_user" id="new_user" action="/users" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="l7pikmbX4FrBS3zB6bk6UpCsTNf3R1WR9vwio3wAOLBWlFPj8QnLq8iaVCsBvBhcMOhdhlSq4oF-zlhiGLqyAA" autocomplete="off">

//   <div class="field">
//     <label for="user_email">Email</label><br>
//     <input autofocus="autofocus" autocomplete="email" type="email" value="" name="user[email]" id="user_email">
//   </div>

//   <div class="field">
//     <label for="user_password">Password</label>
//     <em>(6 characters minimum)</em>
//     <br>
//     <input autocomplete="new-password" type="password" name="user[password]" id="user_password">
//   </div>

//   <div class="field">
//     <label for="user_password_confirmation">Password confirmation</label><br>
//     <input autocomplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation">
//   </div>

//   <div class="actions">
//     <input type="submit" name="commit" value="Sign up" data-disable-with="Sign up">
//   </div>
// </form>
//   <a href="/users/sign_in">Log in</a><br>
// </body>
