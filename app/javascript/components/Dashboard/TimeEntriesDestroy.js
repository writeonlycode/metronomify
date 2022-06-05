import React from "react";

import { useMutation, useQueryClient } from "react-query";
import { destroyTimeEntry } from "../../apis/timeEntries";

import { ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { IconTrash } from "@tabler/icons";

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
        title: "Ops, something is wrong...",
        color: "red",
      });
    },
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
