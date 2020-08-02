
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }

    async setString(key: string, value: string) {
        await this.storage.set(key, value );
    }

    async getString(key: string): Promise<string> {
        return (await this.storage.get(key));
    }

    async setObject(key: string, value: any) {
        await this.storage.set(key, JSON.stringify(value));
    }

    async getObject(key: string): Promise<{ value: any }> {
        const data = await this.storage.get(key);
        return JSON.parse(data);
    }


    async removeItem(key: string) {
        await this.storage.remove(key);
    }

    async clear() {
        await this.storage.clear();
    }
}
