import React from "react";
import "./Background.css";
import Avatar from "@material-ui/core/Avatar";
import { postData } from "../../Data.js/PostData";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { followUnfollowUser } from "../../features/Users/UserSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    display: "block",
    margin: "auto",
    position: "absolute",
    top: "73%",
    left: "45%",
    border: "4px solid #3a3b3c",
  },
}));
const useStyles2 = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    display: "block",
    margin: "auto",
    position: "absolute",
    top: "82%",
    left: "33%",
    border: "4px solid #3a3b3c",
  },
}));
function Background({ individualUser, individualUserPost }) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const currentUser = useSelector((state) => state.currentUser.User);
  const dispatch = useDispatch();

  const isFollowingTheUSer = (user) => {
    const isFollowing = individualUser?.followers?.some(
      (ele) => ele?.user == currentUser._id
    );

    if (isFollowing == true) {
      return "unfollow";
    } else if (isFollowing == false) {
      return "follow";
    }
  };

  return (
    <div>
      <div className="background-image-container">
        <div className="background-image">
          <img
            className="bg-img-1"
            src={
              individualUser?.backgroundImage ||
              "https://images.unsplash.com/photo-1553531384-397c80973a0b?ixid=MnwxMjA3fDF8MHxzZWFyY2h8NDd8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
          />
          <img
            className="bg-img-2"
            src={
              individualUser?.backgroundImage ||
              "https://images.unsplash.com/photo-1553531384-397c80973a0b?ixid=MnwxMjA3fDF8MHxzZWFyY2h8NDd8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
          />

          <div className="mobile-hide">
            <Avatar
              alt="Remy Sharp"
              src={
                individualUser?.profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8-ixw2ZnQsPJj5GUxaRhyam0tbduUsbWJw&usqp=CAU"
              }
              className={classes.large}
            />
            {currentUser?._id == individualUser?._id && (
              <i class="fas fa-camera user-avatar-camera"></i>
            )}
          </div>
          <div className="desktop-hide">
            <Avatar
              alt="Remy Sharp"
              src={
                individualUser?.profileImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8-ixw2ZnQsPJj5GUxaRhyam0tbduUsbWJw&usqp=CAU"
              }
              className={classes2.large}
            />
            {currentUser?._id == individualUser?._id && (
              <i class="fas fa-camera user-avatar-camera"></i>
            )}
          </div>
        </div>
        <div className="background-user-info">
          <h1>{individualUser?.name}</h1>
          {currentUser?._id != individualUser?._id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const dataToBeSent = {
                  id: individualUser?._id,
                  token: currentUser?.token,
                };
                dispatch(followUnfollowUser(dataToBeSent));
              }}
            >
              {isFollowingTheUSer(individualUser)}
            </Button>
          )}
          <div className="user-meta-data">
            <h4>{individualUserPost?.length} Post</h4>
            <p>{individualUser?.following?.length} following</p>
            <p>{individualUser?.followers?.length} followers</p>
          </div>
        </div>

        {currentUser?._id == individualUser?._id && (
          <div className="update-user-bg-image">
            <i class="fas fa-camera user-bg-camera"></i>
            <p>Edit cover photo</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Background;
