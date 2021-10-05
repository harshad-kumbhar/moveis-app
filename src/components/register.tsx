import * as React from 'react';
import { Component } from 'react';
import  Joi from 'joi-browser';
import Input from '../common-components/input-fiels';
import { toast } from 'react-toastify';
import http from '../services/httpService';
import Message from './message';


interface Props {
    history: any;
}
 
interface State {
    
}
 
class Register extends Component<Props, State> {
     state = {
         user: {
             username: '',
             password: '',
             name: ''
         },
         errors: {}
     }

     schema = {
         username: Joi.string().required().label('Username'),
         password: Joi.string().required().label('Password'),
         name: Joi.string().required().label('Name'),
     }

     validate = () => {
         const option = {abortEarly: false};
         const result = Joi.validate(this.state.user, this.schema, option);
         if (!result.error) return null;

         const errors = {};
         result.error.details.forEach((item: any) => {
            errors[item.path[0]] = item.message;
         }) 
         this.setState({errors});
         return errors;   
     }

     validateProperty = ({name, value}) => {
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
     }

     handleChange = ({currentTarget}) => {
        const user = {...this.state.user};
        const errors = {...this.state.errors};

        const errorMessage = this.validateProperty(currentTarget);
        if (errorMessage) errors[currentTarget.name] = errorMessage;
        else delete errors[currentTarget.name];

        user[currentTarget.name] = currentTarget.value;

        this.setState({user, errors});
     }

     onSave = async (e: any) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        if (errors) return null;
         try {                    
                await http.post('api/user/register', this.state.user);
                this.props.history.push('/login');
            } catch (ex: any) {
                toast.error(ex.response.data.message);
            }
    }

     render() { 
         const {username, password, name} = this.state.user;
         return ( 
            <form className="container custom-form" onSubmit={this.onSave}>
                <div className="mb-3">
                    <Input error={this.state.errors && this.state.errors['username']} value={username} name='username'
                     label='Username' onChange={this.handleChange} type="text"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors && this.state.errors['password']} value={password} name='password'
                     label='Password' onChange={this.handleChange} type="text"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors && this.state.errors['name']} value={name} name='name'
                     label='Name' onChange={this.handleChange} type="text"></Input>
                </div>
                <button className="btn btn-primary" onClick={() => this.onSave}>Submit</button>
            </form>
          );
     }
}
 
export default Register;