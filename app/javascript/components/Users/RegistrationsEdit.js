import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  TextInput,
  PasswordInput,
  Space,
  Button,
  Overlay,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconLock } from "@tabler/icons";
import { updateUser } from "../../apis/users";

const RegistrationEdit = ({ currentUser }) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateUser, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Your account has been updated successfully.",
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
      current_password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.setFieldValue("email", currentUser.data.email);
    }
  }, []);

  return (
    <div>
      {!currentUser && <Overlay opacity={0.6} color="#000" zIndex={5} />}
      <form onSubmit={form.onSubmit((values) => updateMutation.mutate(values))}>
        <TextInput
          required
          disabled={updateMutation.isLoading}
          icon={<IconAt />}
          placeholder="Your email"
          type="email"
          {...form.getInputProps("email")}
        />
        <Space h="xl" />
        <PasswordInput
          disabled={updateMutation.isLoading}
          icon={<IconLock />}
          placeholder="Password (6 characters minimum)"
          {...form.getInputProps("password")}
        />
        <Space h="sm" />
        <PasswordInput
          disabled={updateMutation.isLoading}
          icon={<IconLock />}
          placeholder="Password confirmation"
          {...form.getInputProps("password_confirmation")}
        />
        <Space h="xl" />
        <PasswordInput
          required
          disabled={updateMutation.isLoading}
          icon={<IconLock />}
          placeholder="Current password"
          {...form.getInputProps("current_password")}
        />
        <Space h="xl" />
        <Button loading={updateMutation.isLoading} fullWidth type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default RegistrationEdit;

// <Space h="xl" />
// <Button fullWidth onClick={}>
//   Delete Account
// </Button>

// <body>
//     <p class="notice">Welcome! You have signed up successfully.</p>
//     <p class="alert"></p>
//     <h2>Edit User</h2>

// <form class="edit_user" id="edit_user" action="/users" accept-charset="UTF-8" method="post"><input type="hidden" name="_method" value="put" autocomplete="off"><input type="hidden" name="authenticity_token" value="3_IBFfKN1CYNmOO7Ux14ZTnE3JTCDSFWA4kPd_okM3cMAg5sRrZr8ucU8sL5f5a-TeY6k7z_VRO7LcnV9IzlkA" autocomplete="off">

//   <div class="field">
//     <label for="user_email">Email</label><br>
//     <input autofocus="autofocus" autocomplete="email" type="email" value="jane@doe.com" name="user[email]" id="user_email">
//   </div>

//   <div class="field">
//     <label for="user_password">Password</label> <i>(leave blank if you don't want to change it)</i><br>
//     <input autocomplete="new-password" type="password" name="user[password]" id="user_password">
//       <br>
//       <em>6 characters minimum</em>
//   </div>

//   <div class="field">
//     <label for="user_password_confirmation">Password confirmation</label><br>
//     <input autocomplete="new-password" type="password" name="user[password_confirmation]" id="user_password_confirmation">
//   </div>

//   <div class="field">
//     <label for="user_current_password">Current password</label> <i>(we need your current password to confirm your changes)</i><br>
//     <input autocomplete="current-password" type="password" name="user[current_password]" id="user_current_password">
//   </div>

//   <div class="actions">
//     <input type="submit" name="commit" value="Update" data-disable-with="Update">
//   </div>
// </form>
// <h3>Cancel my account</h3>

// <p>Unhappy? </p><form class="button_to" method="post" action="/users"><input type="hidden" name="_method" value="delete" autocomplete="off"><button data-confirm="Are you sure?" type="submit">Cancel my account</button><input type="hidden" name="authenticity_token" value="t423SlVPDiLR-1er4jPdjxtDU2kL_4WS_pOaeXWVLZ_DbwE-T9iiHYB62lxqbX0M20SpLb6v91e38RlMQLEa_g" autocomplete="off"></form><p></p>

// <a href="javascript:history.back()">Back</a>
// </body>
