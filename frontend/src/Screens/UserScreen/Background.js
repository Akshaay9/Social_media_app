import React, { useState, useRef, useEffect } from "react";
import "./Background.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  followUnfollowUser,
  updateUserImage,
} from "../../features/Users/UserSlice";
import { makeStyles } from "@material-ui/core/styles";

import { uploadImage } from "../../Utils/UploadImage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  const [image, setImage] = useState();
  const profileImage = React.useRef(null);
  const backgroundImage = React.useRef(null);

  const handleClick = (image) => {
    if (image == "profile") {
      profileImage.current.click();
    } else {
      backgroundImage.current.click();
    }
  };
  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(() => ({
        image: event.target.files[0],
        name: event.target.name,
      }));
    }
  };

  useEffect(() => {
    if (image != undefined) {
      (async () => {
        toast.info("uploading the image !");
        let imageURL = await uploadImage(image.image);
        toast.info("image uploaded !");
        let imageName = image.name;
        let dataToBeSent = {};

        if (image.name == "profileImage") {
          dataToBeSent = {
            token: currentUser.token,
            data: {
              profileImage: imageURL,
            },
          };
        } else {
          dataToBeSent = {
            token: currentUser.token,
            data: {
              backgroundImage: imageURL,
            },
          };
        }

        dispatch(updateUserImage(dataToBeSent));

        setImage();
      })();
    }
  }, [image]);

  const isFollowingTheUSer = () => {
    const isFollowing = individualUser?.followers?.some(
      (ele) => ele?.user._id == currentUser.id
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
            {currentUser?.id == individualUser?._id && (
              <i
                class="fas fa-camera user-avatar-camera"
                style={
                  image ? { cursor: "not-allowed", pointerEvents: "none" } : {}
                }
                onClick={() => {
                  handleClick("profile");
                }}
              ></i>
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
            {currentUser?.id == individualUser?._id && (
              <i
                style={
                  image ? { cursor: "not-allowed", pointerEvents: "none" } : {}
                }
                class="fas fa-camera user-avatar-camera"
                onClick={() => {
                  handleClick("profile");
                }}
              ></i>
            )}
          </div>
        </div>
        <div className="background-user-info">
          <h1>{individualUser?.name}</h1>
          {currentUser?.id != individualUser?._id && (
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
            <Link to={{ pathname: `/user/${individualUser?._id}/following` }}>
              {" "}
              <p>{individualUser?.following?.length} following</p>
            </Link>{" "}
            <Link to={{ pathname: `/user/${individualUser?._id}/followers` }}>
              <p>{individualUser?.followers?.length} followers</p>
            </Link>{" "}
          </div>
        </div>

        {currentUser?.id == individualUser?._id && (
          <div
            style={
              image ? { cursor: "not-allowed", pointerEvents: "none" } : {}
            }
            className="update-user-bg-image"
            onClick={() => {
              handleClick();
            }}
          >
            <i class="fas fa-camera user-bg-camera"></i>
            <p>Edit cover image</p>
          </div>
        )}
      </div>
      <input
        type="file"
        name="profileImage"
        accept="image/png, image/jpeg"
        ref={profileImage}
        onChange={handleChange}
        style={{ display: "none" }}
      />{" "}
      <input
        type="file"
        name="backgroundImage"
        accept="image/png, image/jpeg"
        ref={backgroundImage}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default Background;
