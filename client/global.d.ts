

declare global {
 
  type  User = {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    deleted_at: Date | null;
  }

}

export {};