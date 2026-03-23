import Repository from ".";
import Trigger from "./Trigger";

export default class RepositoryHTTP extends Trigger implements Repository {
    private baseUrl: string;
    private getToken: () => string | null;

    methodsMap: { [key: string]: any } = {
        create: this.create.bind(this),
        update: this.update.bind(this),
        delete: this.delete.bind(this),
        findMany: this.findMany.bind(this),
        findOne: this.findOne.bind(this),
    };

    constructor(baseUrl: string, getToken: () => string | null) {
        super();
        this.baseUrl = baseUrl;
        this.getToken = getToken;
    }

    private headers(): HeadersInit {
        const token = this.getToken();
        const h: HeadersInit = { "Content-Type": "application/json" };
        if (token) h["Authorization"] = `Bearer ${token}`;
        return h;
    }

    private async request<T>(url: string, options?: RequestInit): Promise<T> {
        const res = await fetch(url, { headers: this.headers(), ...options });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async create(collection: string, value: any): Promise<[any, boolean]> {
        try {
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}`, {
                method: "POST",
                body: JSON.stringify(value),
            });
            this.fireTrigger(collection, result, "create");
            return [result, false];
        } catch (err) {
            return [err, true];
        }
    }

    async update(collection: string, id: string, value: any): Promise<[any, boolean]> {
        try {
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}/${id}`, {
                method: "PUT",
                body: JSON.stringify(value),
            });
            this.fireTrigger(collection, result, "update");
            return [result, false];
        } catch (err) {
            return [err, true];
        }
    }

    async updateQuery(collection: string, query: any, value: any): Promise<[any, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}/query/update?q=${q}`, {
                method: "PUT",
                body: JSON.stringify(value),
            });
            return [result, false];
        } catch (err) {
            return [err, true];
        }
    }

    async updateMany(collection: string, query: any, value: any): Promise<[any, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}/query/updateMany?q=${q}`, {
                method: "PUT",
                body: JSON.stringify(value),
            });
            return [result, false];
        } catch (err) {
            return [err, true];
        }
    }

    async delete(collection: string, id: string): Promise<[any, boolean]> {
        try {
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}/${id}`, {
                method: "DELETE",
            });
            this.fireTrigger(collection, result, "delete");
            return [result, false];
        } catch (err) {
            return [err, true];
        }
    }

    async deleteMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any[]>(`${this.baseUrl}/api/${collection}/query/deleteMany?q=${q}`, {
                method: "DELETE",
            });
            return [result, false];
        } catch (err) {
            return [[err as any], true];
        }
    }

    async findMany(collection: string, query: { [index: string]: any }): Promise<[Array<any>, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any[]>(`${this.baseUrl}/api/${collection}?q=${q}`);
            return [result, false];
        } catch (err) {
            return [[], true];
        }
    }

    async findManySortLimit(collection: string, query: { [index: string]: any }, limit: number, sort: 1 | -1): Promise<[Array<any>, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any[]>(
                `${this.baseUrl}/api/${collection}?q=${q}&limit=${limit}&sort=${sort}`
            );
            return [result, false];
        } catch (err) {
            return [[], true];
        }
    }

    async findManyPaginated(collection: string, query: { [index: string]: any }, page: number = 1, pageSize: number = 20): Promise<[{ data: any[], total: number, page: number, pageSize: number, totalPages: number }, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<{ data: any[], total: number, page: number, pageSize: number, totalPages: number }>(
                `${this.baseUrl}/api/${collection}/paginated?q=${q}&page=${page}&pageSize=${pageSize}`
            );
            return [result, false];
        } catch (err) {
            return [{ data: [], total: 0, page, pageSize, totalPages: 0 }, true];
        }
    }

    async findManyToMany(collection: string, query: { [index: string]: any }): Promise<[any[], boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any[]>(
                `${this.baseUrl}/api/join/${encodeURIComponent(collection)}?q=${q}`
            );
            return [result, false];
        } catch (err) {
            return [[], true];
        }
    }

    async findOne(collection: string, query: { [index: string]: any }): Promise<[any, boolean]> {
        try {
            const q = encodeURIComponent(JSON.stringify(query));
            const result = await this.request<any>(`${this.baseUrl}/api/${collection}/one?q=${q}`);
            return [result, false];
        } catch (err) {
            return [null, true];
        }
    }
}
