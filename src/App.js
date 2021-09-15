import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import searchImg from "./store/fetch";
import Button from "./components/Button/Button";
import Spiner from "./components/Spiner/Spiner";
import Modal from "./components/Modal/Modal";
import Message from "./components/Message/Message";

import "./App.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
  OPENMODAL: "openModal",
};

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [largeImg, setLargeImg] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!input) {
      return;
    }
    searchImg(input, page)
      .then((res) => res.json())
      .then((res) => {
        if (res.total === 0) {
          return setStatus(Status.REJECTED);
        }
        setImages(res.hits);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [input]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    searchImg(input, page)
      .then((res) => res.json())
      .then((res) => {
        setImages((prevImages) => [...prevImages, ...res.hits]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [page]);

  const updatePageNumber = () => {
    setPage((state) => state + 1);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onSearchValueInput = (value) => {
    setInput(value);
    setStatus(Status.PENDING);
    setPage(1);
  };

  const onFoundLargeImg = (value) => {
    setLargeImg(value);
    setStatus(Status.OPENMODAL);
  };

  const onResetLargeImg = () => {
    setLargeImg(null);
    setStatus(Status.RESOLVED);
  };

  if (status === Status.IDLE) {
    return <Searchbar onSubmitForm={onSearchValueInput} />;
  }

  if (status === Status.PENDING) {
    return (
      <div>
        <Searchbar onSubmitForm={onSearchValueInput} />
        <Spiner />
      </div>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <div>
        <Searchbar onSubmitForm={onSearchValueInput} />
        <ImageGallery images={images} onSelectedImg={onFoundLargeImg} />
        <Button onClick={updatePageNumber} />
      </div>
    );
  }

  if (status === Status.OPENMODAL) {
    return (
      <div>
        <Searchbar onSubmitForm={onSearchValueInput} />
        <ImageGallery images={images} onSelectedImg={onFoundLargeImg} />
        <Modal largeImg={largeImg} onCloseModal={onResetLargeImg} />
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return (
      <div>
        <Searchbar onSubmitForm={onSearchValueInput} />
        <Message error={error} />
      </div>
    );
  }
}
