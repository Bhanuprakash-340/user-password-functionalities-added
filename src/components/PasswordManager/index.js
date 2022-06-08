import {Component} from 'react'

import {v4} from 'uuid'

import PasswordsLists from '../PasswordsLists'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    userWebsite: '',
    userName: '',
    userPassword: '',
    searchInput: '',
    isCheckBoxClicked: false,
  }

  onCheckBox = () => {
    const {isCheckBoxClicked} = this.state

    this.setState({isCheckBoxClicked: !isCheckBoxClicked})
  }

  onChangeSearchInput = event => {
    // console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    const updatedPasswordsList = passwordsList.filter(
      eachPassword => id !== eachPassword.id,
    )
    this.setState({passwordsList: updatedPasswordsList})
  }

  onChangeWebName = event => {
    // console.log(event.target.value)
    this.setState({userWebsite: event.target.value})
  }

  onChangeUserName = event => {
    // console.log(event.target.value)
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    // console.log(event.target.value)
    this.setState({userPassword: event.target.value})
  }

  onAddUsersPasswords = event => {
    // console.log('is clicked')
    event.preventDefault()
    const {userWebsite, userName, userPassword} = this.state
    const initialBackgroundColorClassName = `profile ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPasswordsList = {
      id: v4(),
      web: userWebsite,
      name: userName,
      password: userPassword,
      isCheckBoxClicked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordsList],
      userWebsite: '',
      userName: '',
      userPassword: '',
    }))
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state
    const searchResults = passwordsList.filter(each =>
      each.web.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {
      userWebsite,
      userName,
      userPassword,
      passwordsList,
      isCheckBoxClicked,
    } = this.state
    const searchResults = this.getSearchResults()

    // console.log(passwordsList[0])
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-image"
          />
        </div>
        <div className="extra-container">
          <div className="content-container">
            <div className="users-input-container">
              <div className="login-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
                  alt="password manager"
                  className="login-page-image"
                />
              </div>
              <form className="form" onSubmit={this.onAddUsersPasswords}>
                <div className="form-container">
                  <p className="description">Add New Password </p>
                  <div className="users-inputs-forms-container">
                    <div className="each-input">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                        alt="website"
                        className="logo"
                      />
                      <input
                        className="input-box"
                        type="text"
                        value={userWebsite}
                        placeholder="Enter Website"
                        onChange={this.onChangeWebName}
                      />
                    </div>
                    <div className="each-input">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                        alt="username"
                        className="logo"
                      />
                      <input
                        className="input-box"
                        type="text"
                        value={userName}
                        placeholder=" Enter Username"
                        onChange={this.onChangeUserName}
                        // value={searchInput}
                      />
                    </div>
                    <div className="each-input">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                        alt="password"
                        className="logo"
                      />
                      <input
                        className="input-box"
                        type="password"
                        value={userPassword}
                        placeholder="Enter Password"
                        onChange={this.onChangePassword}
                      />
                    </div>
                  </div>
                  <div className="button-container">
                    <button
                      className="add-button"
                      type="submit"
                      //   onClick={this.onGettingUsersInputs}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="password-container">
            <div className="password-search-container">
              <div className="password-text-and-count">
                <p className="your-password">Your Password</p>
                <p className="password-count">{passwordsList.length}</p>
              </div>
              <div className="search-bar-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
                <input
                  type="search"
                  className="search-bar"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="check-box-container">
              <input
                type="checkbox"
                className="check-box"
                id="checkboxId"
                onClick={this.onCheckBox}
              />
              <label htmlFor="checkboxId" className="label-text">
                Shows Passwords
              </label>
            </div>
            {passwordsList.length !== 0 ? (
              <ul className="passwords-lists-container">
                {searchResults.map(eachPassword => (
                  <PasswordsLists
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    deletePassword={this.deletePassword}
                    isCheckBoxClicked={isCheckBoxClicked}
                  />
                ))}
              </ul>
            ) : (
              <div className="login-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="password manager"
                  className="login-page-image"
                />
                <p className="no-password-text">No Passwords View</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
