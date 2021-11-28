import "./App.css";
import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ViewUsers from "./components/ViewUsers";
import EditUsers from "./components/EditUsers";
import Pagination from "./components/Pagination";

const usersPerPageCount = 10;

class App extends Component {
  state = {
    userData: [],
    editUserId: null,
    searchInput: "",
    activePageNumber: 1,
    apiStatus: "",
  };

  componentDidMount() {
    this.getData();
  }

  //API call
  getData = async () => {
    this.setState({ apiStatus: "Loading" });
    const response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );

    if (response.ok === true) {
      const fetchedData = await response.json();
      const usersListData = fetchedData.map((eachUser) => ({
        ...eachUser,
        select: false,
      }));

      this.setState({ userData: usersListData, apiStatus: "Success" });
    } else {
      this.setState({ apiStatus: "Failure" });
    }
  };

  //Changing Search Input
  onChangingSearchInput = (event) => {
    this.setState({ searchInput: event.target.value.toLowerCase() });
  };

  //Edit User Item
  editUserItem = (id) => {
    const { editUserId } = this.state;
    editUserId
      ? this.setState({ editUserId: null })
      : this.setState({ editUserId: id });
  };

  // Deleting a UserItem
  deleteUserItem = (id) => {
    const { userData } = this.state;
    const updatedUserData = userData.filter((eachUser) => eachUser.id !== id);
    this.setState({ userData: updatedUserData });
  };

  // Saving Edited UserItem
  saveUserItem = (newUser) => {
    const { userData } = this.state;
    const savedUserData = userData.map((eachUser) => {
      if (eachUser.id === newUser.id) return newUser;
      return eachUser;
    });
    this.setState({ userData: savedUserData, editUserId: null });
  };

  // Selecting Checkboxes
  toggleCheckboxes = (id) => {
    const { userData } = this.state;
    const updatedUserData = userData.map((eachUser) => {
      if (eachUser.id === id) {
        eachUser.select = !eachUser.select;
      }
      return eachUser;
    });
    this.setState({ userData: updatedUserData });
  };

  //Selecting Multiple Checkboxes
  onSelectingAll = (event) => {
    const { userData, activePageNumber } = this.state;
    const afterSelectingUserData = userData
      .slice(activePageNumber * 10 - 10, activePageNumber * 10)
      .map((eachUser) => {
        eachUser.select = event.target.checked;
        return eachUser;
      });
    userData.splice(activePageNumber * 10 - 10, 10, ...afterSelectingUserData);
    this.setState({ userData: userData });
  };

  // Deleting selected Checkbox
  deleteMultipleUserItems = () => {
    const { userData } = this.state;
    const remainingUserData = userData.filter((eachUser) => !eachUser.select);
    this.setState({ userData: remainingUserData });
  };

  changePageNumber = (num) => {
    this.setState({ activePageNumber: num });
  };

  //Retrying
  onRetrying = () => {
    this.getData();
  };

  render() {
    const {
      userData,
      searchInput,
      activePageNumber,
      editUserId,
      apiStatus,
    } = this.state;
    //Filtering by Search Input
    const searchedData = userData.filter((eachUser) => {
      return (
        eachUser.name.toLowerCase().includes(searchInput) ||
        eachUser.email.toLowerCase().includes(searchInput) ||
        eachUser.role.toLowerCase().includes(searchInput)
      );
    });

    // getting current Users per page
    const lastUserIndex = activePageNumber * usersPerPageCount;
    const firstUserIndex = lastUserIndex - usersPerPageCount;

    let currentUserData = searchedData.slice(firstUserIndex, lastUserIndex);
    if (searchedData.length <= 10) {
      currentUserData = searchedData;
    }

    // calculating total number of pages
    const totalPagesCount = Math.ceil(searchedData.length / usersPerPageCount);

    //Success View
    const successView = (
      <div className="main-cont">
        <div className="mini-cont">
          <div className="search-cont">
            <input
              className="search-bar"
              type="search"
              placeholder="Search by name,email or role"
              onChange={this.onChangingSearchInput}
            />
          </div>
          <table>
            <thead>
              <tr>
                <td>
                  <input type="checkbox" onChange={this.onSelectingAll} />
                </td>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUserData.map((eachUser) => (
                <div key={eachUser.id}>
                  {editUserId === eachUser.id ? (
                    <EditUsers
                      userDetails={eachUser}
                      saveChanges={this.saveUserItem}
                      cancelUpdate={this.editUserItem}
                    />
                  ) : (
                    <ViewUsers
                      userDetails={eachUser}
                      editUserItem={this.editUserItem}
                      toggleCheckbox={this.toggleCheckboxes}
                      deleteSingleUserItem={this.deleteUserItem}
                    />
                  )}
                </div>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPagesCount={totalPagesCount}
            activePageNumber={activePageNumber}
            changePageNumber={this.changePageNumber}
            deleteMultipleUsers={this.deleteMultipleUserItems}
          />
        </div>
      </div>
    );

    //Failure View
    const failureView = (
      <div className="main-cont">
        <div className="mini-cont">
          <h1 className="heading">Click anywhere on the image to try again.</h1>
          <img
            src="https://res-console.cloudinary.com/dtg51opfy/thumbnails/transform/v1/image/upload//v1636884681/b29vcHNfanFlMjhk/drilldown"
            className="failure-image"
            alt="retry"
            onClick={this.onRetrying}
          />
        </div>
      </div>
    );

    //Loading View
    const loadingView = (
      <div className="main-cont">
        <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
      </div>
    );

    switch (apiStatus) {
      case "Success":
        return successView;
      case "Failure":
        return failureView;
      default:
        return loadingView;
    }
  }
}

export default App;
