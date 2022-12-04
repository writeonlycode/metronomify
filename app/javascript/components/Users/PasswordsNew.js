import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TextInput, Space, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAt } from "@tabler/icons";
import { createPassword } from "../../apis/users";

const PasswordsNew = () => {
  const queryClient = useQueryClient();

  const createPasswordMutation = useMutation(createPassword, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Reset instructions sent!",
        message: "You will receive an email with instructions on how to reset your password in a few minutes.",
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
    },
  });

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => createPasswordMutation.mutate(values))}>
        <TextInput
          required
          disabled={createPasswordMutation.isLoading}
          icon={<IconAt />}
          placeholder="Your email"
          type="email"
          {...form.getInputProps("email")}
        />
        <Space h="xl" />
        <Button loading={createPasswordMutation.isLoading} fullWidth type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordsNew;

// <body>
//     <p class="notice">You will receive an email with instructions on how to reset your password in a few minutes.</p>
//     <p class="alert"></p>
//     <h2>Forgot your password?</h2>

// <form class="new_user" id="new_user" action="/users/password" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="OVh4Eq6LkE2X-98UiEg5AaBr-DI0J9O1wuJwJwMgh2AFR0moteswcsecD2Jzoylrh7qBKPSq08RO68Un3x_D_A" autocomplete="off">
  

//   <div class="field">
//     <label for="user_email">Email</label><br>
//     <input autofocus="autofocus" autocomplete="email" type="email" value="" name="user[email]" id="user_email">
//   </div>

//   <div class="actions">
//     <input type="submit" name="commit" value="Send me reset password instructions" data-disable-with="Send me reset password instructions">
//   </div>
// </form>
// </body>
