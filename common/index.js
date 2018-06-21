export class User {
    constructor(firstName, lastName, address, email, password){
      this.id = id;
      this.first_name = firstName;
      this.last_name = lastName;
      this.address = address;
      this.email = email;
      this.password = password;
    }
  }
  
  export class UserInput extends User {
    constructor(firstName, lastName, address, email, password){
      super(firstname, lastname, address, email, password);
    }
  }
  
  export class UserInputMessage {
    constructor(status, description){
      this.status = status;
      this.description = description;
    }
  }
  
  export class StatusMessage {
    constructor(status_code, message, description){
      this.status_code = status_code;
      this.message = message;
      this.description = description || message;
    }
  }
  
  export class Address {
    constructor(address1, address2, city, state, zip, country){
      this.address1 = address1;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.zip = zip;
      this.country = country;
    }
  }
  
  export class AddressInput extends Address {
    constructor(address1, address2, city, state, zip, country){
      super(address1, address2, city, state, zip, country);
    }
  }