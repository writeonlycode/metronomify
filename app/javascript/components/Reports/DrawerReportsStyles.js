export const dateRangePickerStyles = 
  (theme) => ({
  wrapper: {
    width: "26rem",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "100%",
    },
  },
  input: { textAlign: "center" },
});
