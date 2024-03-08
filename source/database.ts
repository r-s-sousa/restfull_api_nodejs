import { randomUUID } from "crypto";

class UserDAL {

    private inMemoryDatabase = new Map();

    public Save(name: string, age: number): string {
        const randomId = randomUUID();
        this.inMemoryDatabase.set(randomId, { name, age });
        return randomId;
    }

    public Update(id: string, name: string, age: number) {
        this.inMemoryDatabase.set(id, { name, age });
    }

    public UpdateOrCreate(id: string, name: string, age: number) {
        this.inMemoryDatabase.set(id, { name, age });
    }

    public Get(id: string): { id: string, name: string, age: number } | null {
        const result = this.inMemoryDatabase.get(id)

        if (!result) return null;

        return {
            id: id,
            name: result.name,
            age: result.age
        };
    }

    public Delete(id: string) {
        this.inMemoryDatabase.delete(id)
    }

    public List(name: string): { id: String, name: String, age: Number }[] {
        let users: { id: String, name: String, age: Number }[] = new Array();
        let entries = Array.from(this.inMemoryDatabase.entries());
        entries.map((entry) => {
            if (entry[1].name.includes(name))
                users.push({ id: entry[0], name: entry[1].name, age: entry[1].age })
        });
        return users;
    }
}

export default new UserDAL();
