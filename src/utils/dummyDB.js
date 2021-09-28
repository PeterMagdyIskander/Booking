let users = [
  {
    id: "petermagdy",
    name: "Peter Magdy",
    password: "123456789",
    owner: false,
    propertyIds: [],
  },
  {
    id: "petergeorge",
    name: "Peter George",
    password: "12345678",
    owner: true,
    propertyIds: ["8xf0y6ziyjabvozdd253nf"],
  },
];

let properties = [
  {
    owner: "petergeorge",
    id: "8xf0y6ziyjabvozdd253nf",
    name: "Beit el salam",
    reservation: [
      {
        accepted: false,
        userName: "petermagdy",
        numberOfCampers: 50,
        ageRange: 22,
        BookedSections: [
          {
            sectionsName: "dream",
            numberOfRoomsBooked: 25,
          },
          {
            sectionsName: "3anaber",
            numberOfRoomsBooked: 25,
          },
        ],
        hallsBooked: [
          {
            hallName: "Dream Hall 1",
            hallCapacity: 25,
          },
          {
            hallName: "Dream Hall 2",
            hallCapacity: 25,
          },
        ],
      },
    ],
    sections: [
      {
        sectionName: "Dream",
        sectionsRooms: [
          {
            roomName: "regular",
            capacity: 4,
            numberOfRooms: 50,
          },
          {
            roomName: "3anbar",
            capacity: 12,
            numberOfRooms: 10,
          },
        ],
      },
      {
        sectionName: "3anaber",
        sectionsRooms: [
          {
            roomName: "regular",
            capacity: 4,
            numberOfRooms: 50,
          },
        ],
      },
    ],
    halls: [
      {
        hallName: "Dream Hall 1",
        hallCapacity: 45,
      },
      {
        hallName: "Dream Hall 2",
        hallCapacity: 30,
      },
      {
        hallName: "Dream Hall 3",
        hallCapacity: 25,
      },
    ],
    Location: "3PXR+CQP, Al Agamy Al Bahri, Dekhela, Alexandria Governorate",
    website: "https://beitelsalam.org/",
  },
]
//new property
/*
let pendingPropertiesForAcceptence = [
  {
    accepted: false,
    owner: "karim",
    id: "8xf0y6ziyjabvozdd253jb",
    name: "Villa Patty",
    sections: [
      {
        sectionName: "3anaber",
        sectionsRooms: [
          {
            roomName: "regular",
            capacity: 4,
            numberOfRooms: 50,
          },
        ],
      },
    ],
    halls: [
      {
        hallName: "Dream Hall 1",
        hallCapacity: 45,
      },
    ],
    Location: "3PXR+CQP, Al Agamy Al Bahri, Dekhela, Alexandria Governorate",
    website: "https://beitelsalam.org/",
  },
];
*/

function binarySearch(ArrayOfUsers, username) {
  let data = ArrayOfUsers;
  data.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1));
  let l = 0;
  let r = data.length - 1;
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);

    let res = username.localeCompare(data[m].id);

    if (res === 0) return m;

    if (res > 0) l = m + 1;
    else r = m - 1;
  }
  return -1;
}



export function _getPending(ownerName) {
  let notifications = properties.filter(
    (property) => property.owner === ownerName
  );
  return new Promise((res, rej) => {
    setTimeout(() => res(notifications[0].reservation), 1000);
  });
}

export function _getProperties() {
  return new Promise((res, rej) => {
    setTimeout(() => res(properties), 1000);
  });
}


export function _signIn(username, password) {
  let userAccount = null;
  let index = binarySearch(users, username);
  if (index !== -1 && users[index].password === password) {
    userAccount = users[index];
  }
  return new Promise((res, rej) => {
    setTimeout(() => res(userAccount), 1000);
  });
}

export function _addProperty(property){
  properties.push(property);
  let index = binarySearch(users, property.owner);
  users[index].propertyIds.push(property.id);
  return new Promise((res, rej) => {
    setTimeout(() => res(true), 1000);
  });
}
