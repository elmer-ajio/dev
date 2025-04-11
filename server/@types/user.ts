

interface User {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export type { User }