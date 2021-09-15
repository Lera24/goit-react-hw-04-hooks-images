const key = "22659523-ac255ed135817256fe2f96438";

const searchImg = (input, page) => {
  const response = fetch(
    `https://pixabay.com/api/?q=${input}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};

export default searchImg;
