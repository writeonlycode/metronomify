import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Text,
  TextInput,
  PasswordInput,
  Space,
  Button,
  Overlay,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconLock } from "@tabler/icons";
import { updateUser, destroyUser } from "../../apis/users";
import {useModals} from "@mantine/modals";

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

  const destroyMutation = useMutation(destroyUser, {
    onSettled: () => queryClient.invalidateQueries("currentUser"),
    onSuccess: (data) => {
      showNotification({
        title: "Your account has been deleted successfully.",
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

  const modals = useModals();

  const openConfirmModal = () => modals.openConfirmModal({
    title: 'Delete your profile',
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is
        destructive and permanent.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => destroyMutation.mutate(),
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
      <Space h="xl" />
      <Button loading={destroyMutation.isLoading} onClick={ () => openConfirmModal() } fullWidth color="red">
        Delete Account
      </Button>
    </div>
  );
};

export default RegistrationEdit;
