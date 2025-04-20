export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "xxxxx@bennett.edu.in",
    componentType: "input",
    type: "email",
  },
  // {
  //     name: 'role',
  //     label: 'Role',
  //     placeholder: 'Select your role',
  //     componentType: 'select',
  //     options:[
  //         {id:"staff",label:"Staff"},
  //         {id:"student",label:"Student"},

  //     ]
  // },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// i have given the login form details

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addQrFormElements = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your Name",
    componentType: "input",
    type: "text",
  },

  {
    name: "timing",
    label: "Timing",
    placeholder: "Select Timing",
    componentType: "select",
    options: [
      { id: "breakfast", label: "BreakFast" },
      { id: "lunch", label: "Lunch" },
      { id: "snacks", label: "Snacks" },
      { id: "dinner", label: "Dinner" },
    ],
  },
  {
    name: "date",
    label: "Date",
    placeholder: "Select Date",
    componentType: "input",
    type: "date",
  },
];


export const TimingOptions={
  breakfast:'BreakFast',
  lunch:'Lunch',
  snacks:'Snacks',
  dinner:'Dinner'
}