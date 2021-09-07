let users = {
  petermagdy: {
    id: "petermagdy",
    name: "Peter Magdy",
    password: "123456789",
  },
  petergeorge: {
    id: "petergeorge",
    name: "Peter George",
    password: "123456789",
  },
};

let properties=[
  {
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


export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getProperties() {
  return new Promise((res, rej) => {
    setTimeout(() => res(properties), 1000);
  });
}
