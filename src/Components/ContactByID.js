import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class ContactByID extends React.Component {

    constructor(){
        super();
        this.state = {
          dataContact: {
            firstName: "",
            lastName: "",
            age: "",
            photo: ""
            } 
        }
    }

    // ambil data contact berdasarkan ID
    componentDidMount(){

        // id dinamis yang dilepar dari route yang ada di file App.js, 
        // sesuai dengan id yg dimasukkan user inputan search by ID
        let contact_id = this.props.match.params.id;
        // console.log(contact_id)
        axios.get(`https://simple-contact-crud.herokuapp.com/contact/${contact_id}`)
        .then((x) => {
            console.log(x.data.data)
            this.setState({
                dataContact: x.data.data
            })
        })
        .catch((err) => {
            console.log(err)
            console.log('error')
        })
    }

    // note : fungsi updateContact ini akan jalan jika fungsi PUT by ID di dokumentasi bisa jalan, 
    // karna beberapa kali Saya coba fungsi PUT by ID di dokumentasi >> https://simple-contact-crud.herokuapp.com/documentation#!/contact/deleteContactId fungsinya tidak jalan. 
    // maybe something wrong dengan api nya. Dan Saya juga tidak bisa melakukan pengecekan problemnya. karna itu data dummy dari contact API heroku. Thank you :)
    // update contact by id yg dipilih
    updateContact = () => {
        let contact_id = this.state.dataContact.id
        console.log(contact_id)
        axios.put(`https://simple-contact-crud.herokuapp.com/contact/${contact_id}`, this.state.dataContact)
        .then(() => {
            swal({
                icon: "success",
                title: "Contact updated!"
            })

            // supaya ketika data sukses diupdate, maka langsung ke direct ke halaman contacs
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err);
            swal({
                icon: "warning",
                title: "Update failed!"
            })
        })
    }

    // note : dan juga fungsi deleteContact ini akan jalan jika fungsi DELETE by ID di dokumentasi bisa jalan, 
    // karna beberapa kali Saya coba fungsi DELETE by ID di dokumentasi >> https://simple-contact-crud.herokuapp.com/documentation#!/contact/deleteContactId, juga fungsinya tidak jalan. 
    // maybe something wrong dengan api nya. Dan Saya juga tidak bisa melakukan pengecekan problemnya. karna itu data dummy dari contact API heroku. Thank you :) 
    // fungsi untuk delete contact by id yang dipilih
    deleteContact = () => {
        let contact_id = this.state.dataContact.id
        axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${contact_id}`)
        .then(() => {
            swal({
                icon: "success",
                title: "Contact deleted!"
            })

            // supaya ketika data sukses didelete, maka langsung ke direct ke halaman contacs
            window.location.href = "/"
        })
        .catch(() => {
            swal({
                icon: "warning",
                title: "Delete failed!"
            })
        })
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
        return(
            <div>
                
                <h4 className="text-center text-uppercase">{this.state.dataContact.firstName}&nbsp;{this.state.dataContact.lastName}</h4>
                <a href="/"><button type="button" className="btn btn-primary mb-2"><i class="fas fa-chevron-left"></i> Back</button></a>
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
                        <tr>
                            <th scope="row">{this.state.dataContact.id}</th>
                            <td>{this.state.dataContact.firstName}</td>
                            <td>{this.state.dataContact.lastName}</td>
                            <td>{this.state.dataContact.age}</td>

                            {/* Jika value photo === N/A maka tampilin defaultb photo, tapi jika ada tampilin photonya */}
                            <td>{this.state.dataContact.photo === "N/A" ? 
                                <img alt="photo" src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png"
                                style={{width: '100px', height: 'auto'}} />
                                :
                                <img alt="photo" src={this.state.dataContact.photo} 
                                style={{width: "100px", height: 'auto'}}/>
                                }
                            </td>
                            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editContactModal">Edit</button></td>
                            <td><button onClick={this.deleteContact} type="button" className="btn btn-danger">Delete</button></td>
                        </tr>
                        {this.displayModalEditContact()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ContactByID;