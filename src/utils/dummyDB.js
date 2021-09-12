let users = {
  petermagdy: {
    id: "petermagdy",
    name: "Peter Magdy",
    password: "123456789",
    owner:false,
  },
  petergeorge: {
    id: "petergeorge",
    name: "Peter George",
    password: "123456789",
    owner:true,
    propertyIds:["8xf0y6ziyjabvozdd253nf"],
  },
};

let properties=[
  {
    owner:'petergeorge',
    id: "8xf0y6ziyjabvozdd253nf",
    name: "Beit el salam",
    sections:[
      {
        sectionName:'Dream',
        sectionsRooms:[
          {
            roomName:'regular',
            capacity:4,
            numberOfRooms:50
          },
          {
            roomName:'3anbar',
            capacity:12,
            numberOfRooms:10
          },
        ]

      },{
      sectionName:'3anaber',
        sectionsRooms:[
          {
            roomName:'regular',
            capacity:4,
            numberOfRooms:50
          },
        ]
      },

    ],
    halls:[
      {
        hallName:'Dream Hall 1',
        hallCapacity:45
      },
      {
        hallName:'Dream Hall 2',
       hallCapacity:30
      },
      {
        hallName:'Dream Hall 3',
        hallCapacity:25
      }
    ],
    Location: "3PXR+CQP, Al Agamy Al Bahri, Dekhela, Alexandria Governorate",
    website: "https://beitelsalam.org/",
  }
]
 
let pending=[
  {
    userName:'petermagdy',
    ownerName:'petergeorge',
    propertyId:"8xf0y6ziyjabvozdd253nf",
    numberOfCampers:50,
    ageRange:22,
    BookedSections:[
      {
        sectionsName:'dream',
        numberOfRoomsBooked:25,
      },
      {
        sectionsName:'3anaber',
        numberOfRoomsBooked:25,
      }
    ],
    hallsBooked:[
      {
        hallName:'Dream Hall 1',
        hallCapacity:25
      },
      {
        hallName:'Dream Hall 2',
       hallCapacity:25
      },
    ]


 },
 {
  userName:'abadeer',
  ownerName:'petergeorge',
  propertyId:"8xf0y6ziyjabvozdd253nk",
  numberOfCampers:50,
  ageRange:22,
  BookedSections:[
    {
      sectionsName:'dream',
      numberOfRoomsBooked:25,
    },
    {
      sectionsName:'3anaber',
      numberOfRoomsBooked:25,
    }
  ],
  hallsBooked:[
    {
      hallName:'Dream Hall 1',
      hallCapacity:25
    },
    {
      hallName:'Dream Hall 2',
     hallCapacity:25
    },
  ]


},
]

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getPending(ownerName){
  const notifications = pending.filter(pendingRequest => pendingRequest.ownerName===ownerName)
  console.log('backend',notifications)
  return new Promise((res, rej) => {
    
    setTimeout(() => res(notifications), 1000);
  });
}

export function _getProperties() {
  return new Promise((res, rej) => {
    setTimeout(() => res(properties), 1000);
  });
}
