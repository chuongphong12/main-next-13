import { Modal, Typography, Box } from "@mui/material";
import Button from "elements/Button";
import React from "react";
import styles from "./Modal.module.scss";

interface Modal {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  style?: any;
  title: string;
}

const ModalComponent = ({ open, onClose, onConfirm, style, title }: Modal) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box className={styles.wrapper_button}>
          <Button onClick={onClose} title="No" cate="out-line" />
          <Button onClick={onConfirm} title="Yes" cate="standard" />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
