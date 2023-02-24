export interface Room {
  name: string,
  capacity: number,
  occupants: { username: string }[]
}
