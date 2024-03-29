import React from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DisplayUser from "./DisplayUser"

export default class App extends React.Component {
  state = {
    users: [
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Jon Snow",
        email: "jonsnow@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Ned Stark",
        email: "nedstark@winterfell.com"
      },
      {
        _id: Math.floor(Math.random() * 10000),
        name: "Frodo Baggins",
        email: "frodo@bagend.com"
      }
    ],
    newUserName: "",
    newUserEmail: "",
    userBeingEdited: 0,
    editedUserName: "",
    editedUserEmail: ""
  };

  render() {
    return (
      <React.Fragment>
      <div className="App">
        {this.state.users.map((user) => {
          return user._id === this.state.userBeingEdited ? 
            <React.Fragment>
              <div className="box">                
                  <EditUser 
                      user = {user}
                      userBeingEdited = {this.state.userBeingEdited}
                      editedUserName = {this.state.editedUserName}
                      editedUserEmail = {this.state.editedUserEmail}
                      updateFormField ={this.updateFormField}
                      cancelEdit = {this.cancelEdit}
                      confirmEdit = {this.confirmEdit}
                  />
              </div>
            </React.Fragment>
            :
            <React.Fragment>               
              <DisplayUser
                  user = {user}
                  beginEdit = {this.beginEdit}
                  deleteUser = {this.deleteUser}
                  />
            </React.Fragment>
          })}
        </div>

        <AddUser
                  newUserName={this.state.newUserName}
                  updateFormField={this.updateFormField}
                  newUserEmail={this.state.newUserEmail}
                  addUser={this.addUser}

        />    
      </React.Fragment>
    );
  }

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addUser = () => {
    this.setState({
      users: [
        ...this.state.users,
        {
          _id: Math.floor(Math.random() * 10000),
          name: this.state.newUserName,
          email: this.state.newUserEmail
        }
      ]
    });
  };

  beginEdit = (user) => {
    this.setState({
      userBeingEdited: user._id,
      editedUserEmail: user.email,
      editedUserName: user.name
    });
  };

  deleteUser = (user) => {
    let index = this.state.users.findIndex((u) => u._id === user._id);
    this.setState({
      users: [...this.state.users.slice(0, index), ...this.state.users.slice(index + 1)]
    });
  };

  cancelEdit = () => {
    this.setState({
      userBeingEdited: 0
    });
  };

  confirmEdit = (user) => {
    let index = this.state.users.findIndex((u) => u._id === user._id);
    this.setState({
      users: [
        ...this.state.users.slice(0, index),
        {
          ...user,
          email: this.state.editedUserEmail,
          name: this.state.editedUserName
        },
        ...this.state.users.slice(index + 1)
      ],
      userBeingEdited: 0
    });
  };
}
