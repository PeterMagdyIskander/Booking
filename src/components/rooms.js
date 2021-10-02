
const Rooms =(props)=>{
    return(
        <table>
        <tbody>
            <tr>
                <th>Room Name</th>
                <th>Number of Rooms</th>
                <th>Capacity of each room</th>
            </tr>
            {
                props.sectionRooms.map((sectionRoom)=>{
                    return <tr key={sectionRoom.roomName}>
                        <th>{sectionRoom.roomName}</th>
                        <th>{sectionRoom.numberOfRooms}</th>
                        <th>{sectionRoom.roomCapacity}</th>
                    </tr>
                })
            }
            </tbody>
        </table>

    )
}
export default Rooms;