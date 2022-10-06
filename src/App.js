import AccountInputArea from "./components/AccountInputArea/AccountInputArea";

function App() {
  return (
    <div>
      <div>
        <input type="radio" name="accountInputScreen" id="login-toggle" />
        <label htmlFor="login-toggle">SIGN IN</label>
        <input type="radio" name="accountInputScreen" id="create-account-toggle" />
        <label htmlFor="create-account-toggle">CREATE ACCOUNT</label>
      </div>
      <AccountInputArea
        type="email"
        labelText="Your E-Mail Address" />
      <AccountInputArea
        type="text"
        labelText="Create Password" />
      <AccountInputArea
        type="text"
        labelText="Confirm Password" />
      <AccountInputArea
        type="text"
        labelText="First Name" />
      <AccountInputArea
        type="text"
        labelText="Surname" />
      <AccountInputArea
        type="number"
        labelText="Postcode" />
      <input type="submit" />
    </div>
  );
}

export default App;
