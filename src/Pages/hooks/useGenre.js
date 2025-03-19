const useGenre = (selectedGenres = []) => {
    if (!selectedGenres.length) return ""; // Handle empty or undefined case
    return selectedGenres.map((g) => g.id).join(","); // More readable & efficient
  };
  
  export default useGenre;
  