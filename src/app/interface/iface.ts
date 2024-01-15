
export interface Iface {
  
    id: number,
      first_name: string,
      last_name: string,
      email:string,
      password:string,
      id_number:string,
      category: string,
      rating: number,
      descri:string,
      thumbnail: string,
      images: string[]
}

export interface IMenuItem{
  label:string,
  icon:string
}

export interface Iuser{
  

  FirstName:string,
  LastName:string,
  Email:string,
  Password:string,
  IdNumber:string,
  Category:string,
  Role: string;
}

export interface IUser{
  
id:number,
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  idNumber:string,
  category:string,
  role: string;
}

export interface Ilogin{
  Email:string,
  Password:string,
}

export interface Ievent{
id:number,
  
  title:string,
  start:string,
  end:string
}

export interface Igetuser{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  idNumber: string,
  category: string,
  role: null
}

export interface Iemailmodel{
  To:string;
  Subject: string;
  Content: string;

}



