import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { ActionIcon, Text } from "@mantine/core";
import { destroyTimeEntry } from "../../apis/timeEntries";
import { IconTrash } from "@tabler/icons";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const TimeEntriesDestroy = ({ id }) => {
  const queryClient = useQueryClient();
  const destroyMutation = useMutation(() => destroyTimeEntry({ id }), {
    onSettled: () => {
      queryClient.invalidateQueries(["timeEntries"]);
    },
    onSuccess: () => {
      showNotification({
        title: "The time entry has been deleted successfully.",
      });
    },
    onError: () => {
      showNotification({
        color: "red",
        title: "Ops, something is wrong...",
      });
    },
  });

  const modals = useModals();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: "Delete time entry",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this time entry? This action is
          destructive and permanent.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => destroyMutation.mutate(),
    });

  return (
    <ActionIcon
      loading={destroyMutation.isLoading}
      onClick={() => {
        destroyMutation.mutate(id);
      }}
      color="red"
    >
      <IconTrash size="20px" />
    </ActionIcon>
  );
};

export default TimeEntriesDestroy;
