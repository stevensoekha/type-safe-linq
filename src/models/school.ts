export type School = {
    name: string
    location: string
    founded: number
}

export const School = (name: string, location: string, founded: number): School => ({
    name,
    location,
    founded,
})
