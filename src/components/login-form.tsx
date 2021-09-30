import { Component } from 'react';
import Input from '../common-components/input-fiels';
import Joi from 'joi-browser';


 interface Props {
     message: string;
 }
  
 interface State {
     account: {username: string, password: string};
     errors: any;
 }
  
 class Login extends Component<Props, State> {
     state = {
         account: {
             username: '',
             password: ''
         },
         errors: {}
     }

     schema = {
         username: Joi.string().required().label('Username'),
         password: Joi.string().required().label('Password')
     }

     validate = () => {
         const option = {abortEarly: false};
         const result = Joi.validate(this.state.account, this.schema, option);
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
        const account = {...this.state.account};
        const errors = {...this.state.errors};

        const errorMessage = this.validateProperty(currentTarget);
        if (errorMessage) errors[currentTarget.name] = errorMessage;
        else delete errors[currentTarget.name];

        account[currentTarget.name] = currentTarget.value;

        this.setState({account, errors});
     }

     onSave = (e: any) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors });
        if (errors) return null;
    }

     render() { 
         const {username, password} = this.state.account;
         return ( 
            <form className="container custom-form" onSubmit={this.onSave}>
                <div className="mb-3">
                    <Input error={this.state.errors['username']} value={username} name='username'
                     label='Username' onChange={this.handleChange} type="text"></Input>
                </div>
                <div className="mb-3">
                    <Input error={this.state.errors['password']} value={password} name='password'
                     label='Password' onChange={this.handleChange} type="text"></Input>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
          );
     }
 }
  
 export default Login;