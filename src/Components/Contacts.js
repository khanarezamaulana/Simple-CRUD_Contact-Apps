import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

class Contacts extends React.Component {
    
    constructor(){
        super();
        this.state = {
          contacts: [],
          dataContact: {
            firstName: "",
            lastName: "",
            age: "",
            photo: ""
          }     
        }
    }

    // untuk ambil semua data
    componentDidMount(){
        var url = "https://simple-contact-crud.herokuapp.com/contact";
        axios.get(url)
        .then((x) => {
            this.setState({
                contacts: x.data.data
            })
            console.log(x.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // fungsi untuk add contact
    addContact = () => {
        var url = "https://simple-contact-crud.herokuapp.com/contact";
        axios.post(url, this.state.dataContact)
        .then((x) => {
            console.log(x)
            swal({
                icon: "success",
                title: "Successfully!"
            })
        })
        .catch((err) => {
            console.log(err)
            swal({
                icon: "warning",
                title: "Failed!"
            })
        })
    }

    // untuk ambil data by id yg dipilih
    editContact = (id) => {
        // untuk ambil data by id yg dipilih
        axios.get(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        .then((x) => {
            this.setState({
                dataContact: x.data.data
            })
            console.log(x.data.data)
        })
        .catch((err) => {
            console.log(err)
        })

        // // untuk edit contact by id yg dipilih
        // axios.put(`https://simple-contact-crud.herokuapp.com/contact/${id}`, this.state.dataContact)
        // .then(() => {
        //     swal({
        //         icon: "success",
        //         title: "Contact updated!"
        //     })
        // })
        // .catch(() => {
        //     swal({
        //         icon: "warning",
        //         title: "Update failed!"
        //     })
        // })
    }

    // untuk edit contact by id yg dipilih
    updateContact = () => {
        console.log(this.state.dataContact.id)
        console.log('ghghg')
        axios.put(`https://simple-contact-crud.herokuapp.com/contact/${this.state.dataContact.id}`, this.state.dataContact)
        .then(() => {
            swal({
                icon: "success",
                title: "Contact updated!"
            })
        })
        .catch(() => {
            swal({
                icon: "warning",
                title: "Update failed!"
            })
        })
    }

    // fungsi untuk delete contact by id
    deleteContact = (id) => {
        axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        .then(() => {
            swal({
                icon: "success",
                title: "Contact deleted!"
            })
        })
        .catch(() => {
            swal({
                icon: "warning",
                title: "Delete failed!"
            })
        })
    }

    // mapping data contacts untuk di tampilin ke halaman 
    contacts() {
        return this.state.contacts.map((val, i) => {
            return (
                <tr>
                    <th scope="row">{val.id}</th>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.age}</td>
                    <td>{val.photo ? 
                        <img alt="photo" src={val.photo} 
                        style={{width: "100px", height: 'auto'}}/>
                        : 
                        <img alt="photo" src="http://chittagongit.com//images/default-profile-icon/default-profile-icon-24.jpg"
                        style={{width: '25%', height: 'auto'}} />
                        }
                    </td>
                    <td><button onClick={() => {this.editContact(val.id)}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#editContactModal">Edit</button></td>
                    <td><button onClick={() => {this.deleteContact(val.id)}} type="button" className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })
    }

    // display modal untuk add contact
    displayModalAddContact() {
        return (
            <React.Fragment>
                <div className="modal fade" id="addContactModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Contact</h5>
                                <button type="button" classNameName="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="border p-3 m-5">
                                    <div>
                                        {/* First Name */}
                                        <div className="form-group">
                                            <label htmlFor="name">First Name</label>
                                            <input type="name" className="form-control" id="firstname" onChange={(e) => {
                                                let dataContactCopy = this.state.dataContact;
                                                dataContactCopy.firstname = e.target.value;
                                                this.setState({
                                                    dataContact: dataContactCopy
                                                })
                                            }}
                                                placeholder="Enter first name" />
                                        </div>

                                        {/* Last Name */}
                                        <div className="form-group">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="name" className="form-control" id="lastname" onChange={(e) => {
                                                let dataContactCopy = this.state.dataContact;
                                                dataContactCopy.lastname = e.target.value;
                                                this.setState({
                                                    dataContact: dataContactCopy
                                                })
                                            }}
                                                placeholder="Enter last name" />
                                        </div>

                                        {/* Age */}
                                        <div className="form-group">
                                            <label htmlFor="age">Age</label>
                                            <input type="number" className="form-control" id="age" onChange={(e) => {
                                                let dataContactCopy = this.state.dataContact;
                                                dataContactCopy.age = e.target.value;
                                                this.setState({
                                                    dataContact: dataContactCopy
                                                })
                                            }}
                                                placeholder="Enter age" />
                                        </div>

                                        {/* Photo */}
                                        <div className="form-group">
                                            <label htmlFor="photo">Photo</label>
                                            <input type="text" className="form-control" id="username" onChange={(e) => {
                                                let dataContactCopy = this.state.dataContact;
                                                dataContactCopy.photo = e.target.value;
                                                this.setState({
                                                    dataContact: dataContactCopy
                                                })
                                            }}
                                                placeholder="Enter url photo" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button onClick={this.addContact} type="button" className="btn btn-primary">Add Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    // display modal untuk edit contact
    displayModalEditContact() {
        return (
            <React.Fragment>
                <div className="modal fade" id="editContactModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Contact</h5>
                                <button type="button" classNameName="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="border p-3 m-5">
                                    <div>
                                        {/* First Name */}
                                        <div className="form-group">
                                            <label htmlFor="name">First Name</label>
                                            <input type="name" className="form-control" id="firstname" onChange={(e) => {
                                                    let dataContactCopy = this.state.dataContact;
                                                    dataContactCopy.firstName = e.target.value;
                                                    this.setState({
                                                        dataContact: dataContactCopy
                                                    })
                                                }}
                                                value={this.state.dataContact.firstName}
                                            placeholder="Enter first name" />
                                        </div>

                                        {/* Last Name */}
                                        <div className="form-group">
                                            <label htmlFor="name">Last Name</label>
                                            <input type="name" className="form-control" id="lastname" onChange={(e) => {
                                                    let dataContactCopy = this.state.dataContact;
                                                    dataContactCopy.lastName = e.target.value;
                                                    this.setState({
                                                        dataContact: dataContactCopy
                                                    })
                                                }}
                                                value={this.state.dataContact.lastName}
                                            placeholder="Enter last name" />
                                        </div>

                                        {/* Age */}
                                        <div className="form-group">
                                            <label htmlFor="age">Age</label>
                                            <input type="number" className="form-control" id="age" onChange={(e) => {
                                                    let dataContactCopy = this.state.dataContact;
                                                    dataContactCopy.age = e.target.value;
                                                    this.setState({
                                                        dataContact: dataContactCopy
                                                    })
                                                }}
                                                value={this.state.dataContact.age}
                                            placeholder="Enter age" />
                                        </div>

                                        {/* Photo */}
                                        <div className="form-group">
                                            <label htmlFor="photo">Photo</label>
                                            <input type="text" className="form-control" id="username" onChange={(e) => {
                                                    let dataContactCopy = this.state.dataContact;
                                                    dataContactCopy.photo = e.target.value;
                                                    this.setState({
                                                        dataContact: dataContactCopy
                                                    })
                                                }}
                                                value={this.state.dataContact.photo}
                                            placeholder="Enter url photo" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button onClick={this.updateContact} type="button" className="btn btn-primary">Update Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render(){
        return (
            <div>
                <h4 className="text-center mb-3 text-uppercase">Simple Contact App</h4>
                <div className="row mb-2">
                    <div className="col-md-2">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addContactModal">Add Contact</button>
                    </div>
                    <div class="input-group col-md-10">
                        <input type="text" class="form-control" placeholder="Search by ID"/>
                        <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Photo</th>
                        <th scope="col" colSpan="2" className="text-center">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contacts ? this.contacts() : ""}
                        {this.displayModalAddContact()}
                        {this.displayModalEditContact()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Contacts;