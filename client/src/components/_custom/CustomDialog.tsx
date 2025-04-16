"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@/src/html";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode[];
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  content,
  actions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      {actions && (
        <DialogActions>
          {actions.length > 0 &&
            actions.map((item, index) => <Box key={index}>{item}</Box>)}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
