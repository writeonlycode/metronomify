import React, {useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { PasswordInput, Space, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconLock } from "@tabler/icons";
import { updatePassword } from "../../apis/users";

const PasswordsEdit = ({ resetPasswordToken }) => {
  const queryClient = useQueryClient();

  const [disabled, setDisabled] = useState(false);

  const updatePasswordMutation = useMutation(updatePassword, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      setDisabled(true);
      showNotification({
        title: "Your password has been changed successfully.",
        message: "You will be redirected in a few seconds...",
        onClose: () => window.location.href = '/',
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
      password: "",
      password_confirmation: "",
      reset_password_token: resetPasswordToken,
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) =>
          updatePasswordMutation.mutate(values)
        )}
      >
        <PasswordInput
          disabled={updatePasswordMutation.isLoading || disabled}
          icon={<IconLock />}
          placeholder="Password (6 characters minimum)"
          {...form.getInputProps("password")}
        />
        <Space h="sm" />
        <PasswordInput
          disabled={updatePasswordMutation.isLoading || disabled}
          icon={<IconLock />}
          placeholder="Password confirmation"
          {...form.getInputProps("password_confirmation")}
        />
        <Space h="xl" />
        <Button
          loading={updatePasswordMutation.isLoading || disabled}
          fullWidth
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordsEdit;

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
