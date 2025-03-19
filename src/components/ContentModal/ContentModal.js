import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Fade, Box, Button, CircularProgress } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import "./ContentModal.css";

const img_500 = "https://image.tmdb.org/t/p/w500";
const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open || !media_type || !id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
      setLoading(false);
    };

    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        if (data.results.length > 0) {
          setVideo(data.results[0].key);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    const fetchCast = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCast(data.cast.slice(0, 6)); // Only show first 6 cast members
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchData();
    fetchVideo();
    fetchCast();
  }, [open, media_type, id]);

  return (
    <>
      <div className="media" style={{ cursor: "pointer" }} onClick={handleOpen}>
        {children}
      </div>

      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box className="ContentModal">
            {loading ? (
              <Box className="loading-box">
                <CircularProgress />
              </Box>
            ) : content ? (
              <>
                <div className="ContentModal__container">
                  {/* Left Section: Movie Poster */}
                  <img
                    src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                    alt={content.title || content.name}
                    className="ContentModal__image"
                  />

                  {/* Right Section: Movie Details */}
                  <div className="ContentModal__info">
                    <h2 className="ContentModal__title">
                      {content.title || content.name} ({(content.release_date || content.first_air_date || "----").substring(0, 4)})
                    </h2>
                    <p className="ContentModal__tagline">
                      {content.tagline ? content.tagline : "Make every moment count."}
                    </p>
                    <div className="ContentModal__overview">
                      {content.overview || "No description available."}
                    </div>

                    {/* Cast Section */}
                    <div className="ContentModal__cast">
                      {cast.map((actor) => (
                        <div key={actor.id} className="ContentModal__cast-member">
                          <img
                            src={
                              actor.profile_path
                                ? `${img_500}/${actor.profile_path}`
                                : "https://via.placeholder.com/100?text=No+Picture"
                            }
                            alt={actor.name}
                            className="ContentModal__cast-image"
                          />
                          <p className="ContentModal__cast-name">{actor.name}</p>
                        </div>
                      ))}
                    </div>

                    {/* Trailer Button */}
                    {video && (
                      <a href={`https://www.youtube.com/watch?v=${video}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" className="ContentModal__trailer-button">
                          <YouTubeIcon style={{ marginRight: 5 }} />
                          WATCH THE TRAILER
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-center">No Content Available</h2>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
