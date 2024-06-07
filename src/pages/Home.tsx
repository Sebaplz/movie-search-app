export const Home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center gap-4">
      <h1 className="text-4xl">Movie Search App</h1>
      <form className="flex gap-2">
        <input type="text" placeholder="Search for a movie or TV show" />
        <button type="submit">Search</button>
      </form>
    </main>
  );
};
