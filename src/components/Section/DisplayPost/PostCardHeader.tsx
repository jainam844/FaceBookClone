import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
interface PostCardHeaderProps {
  userName: string;
  avatarUrl: string;
  createdAt: string;
  isDeleteIconVisible: boolean;
  onMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteClick: () => void;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onDelete: () => void;
}

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
  userName,
  avatarUrl,
  createdAt,
  isDeleteIconVisible,
  onMenuClick,
  onDeleteClick,
  anchorEl,
  onClose,
  onDelete,
}) => {
  return (
    <React.Fragment>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        action={
          <>
            {isDeleteIconVisible && (
              <IconButton
                aria-label="settings"
                aria-controls="post-menu"
                aria-haspopup="true"
                onClick={onMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            {!isDeleteIconVisible && (
              <IconButton aria-label="remove" onClick={onDeleteClick}>
                <ClearIcon />
              </IconButton>
            )}
          </>
        }
        title={userName}
        subheader={new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "120px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f7f7f7",
          },
          "& .MuiList-root": {
            padding: "0",
          },
          "& .MuiMenuItem-root": {
            fontSize: "14px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "#ebebeb",
            },
          },
          "& .MuiMenuItem-root:last-child": {
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          },
        }}
      >
        <MenuItem
            onClick={onDelete}
          sx={{
            fontSize: "14px",
            padding: "8px 16px",
            color: "#ff0000",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ffdada",
            },
          }}
        >
          <span>Delete</span>
        </MenuItem>
        <MenuItem
       onClick={onClose}
          sx={{
            fontSize: "14px",
            padding: "8px 16px",
            color: "#333333",
            "&:hover": {
              backgroundColor: "#ebebeb",
            },
          }}
        >
          <span>Cancel</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default PostCardHeader;
