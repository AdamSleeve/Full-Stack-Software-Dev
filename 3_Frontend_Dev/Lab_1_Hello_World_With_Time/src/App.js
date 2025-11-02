function App(props) {
  const currDate = new Date();

  return (
    <div>
      <h1>Hello world!</h1>
      <h2>It is Adam Adelumola here</h2>

      <p>It is {currDate.toLocaleDateString()} today and the time now is {currDate.toLocaleTimeString()}.</p>
    </div>
  );
}

export default App;
