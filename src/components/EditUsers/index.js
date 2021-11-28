import { Component } from "react";
import "./index.css";

class EditUsers extends Component {
  state = { updatedUser: {} };

  componentDidMount() {
    this.updateUserDetails();
  }

  updateUserDetails = () => {
    const { userDetails } = this.props;
    const newUser = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role: userDetails.role,
      select: userDetails.select,
    };
    this.setState({ updatedUser: newUser });
  };

  changeInput = (event) => {
    const { updatedUser } = this.state;
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newUserData = { ...updatedUser };
    newUserData[inputName] = inputValue;
    this.setState({ updatedUser: newUserData });
  };

  onClickingCancel = () => {
    const { userDetails, cancelUpdate } = this.props;
    cancelUpdate(userDetails.id);
  };

  onClickingSave = () => {
    const { saveChanges } = this.props;
    const { updatedUser } = this.state;
    saveChanges(updatedUser);
  };

  render() {
    const { updatedUser } = this.state;
    return (
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>
          <input
            type="text"
            name="name"
            className="input-element"
            value={updatedUser.name}
            onChange={this.changeInput}
          ></input>
        </td>
        <td>
          <input
            type="email"
            name="email"
            className="input-element"
            value={updatedUser.email}
            onChange={this.changeInput}
          ></input>
        </td>
        <td>
          <input
            type="text"
            name="role"
            className="input-element"
            value={updatedUser.role}
            onChange={this.changeInput}
          ></input>
        </td>
        <td>
          <button className="button-element save" onClick={this.onClickingSave}>
            Save Changes
          </button>
          <button
            className="button-element cancel"
            onClick={this.onClickingCancel}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }
}

export default EditUsers;
