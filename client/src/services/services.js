export default function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
