import * as fs from "fs";
import * as crypto from "crypto";

export const createDB = (filePath) => {
    return {
        file: filePath,
        readFile: function () {
            return JSON.parse(fs.readFileSync(this.file, 'utf8'))
        },
        saveFile: function (data) {
            fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
        },
        find: function (id) {
            let data = this.readFile();
            return data[id];
        },
        findAll: function() {
            let data = this.readFile();
            return Object.values(data);
        },
        findBy: function (criteria, limit = null) {
            let data = this.readFile();
            let result = [];

            itemLoop: for (const id in data) {
                const item = data[id];

                for (const [key, value] of Object.entries(criteria)) {
                    if (item[key] !== value) {
                        continue itemLoop;
                    }
                }

                result.push(item);
            }

            return result;
        },
        findOneBy: function (criteria) {
            let data = this.readFile();

            itemLoop: for (const id in data) {
                const item = data[id];

                for (const [key, value] of Object.entries(criteria)) {
                    if (item[key] !== value) {
                        continue itemLoop;
                    }
                }

                return item;
            }
        },
        save: function (item) {
            let data = this.readFile();
            const id = item.id || crypto.randomUUID();
            data[id] = {...item, id};
            this.saveFile(data);
        },
        delete: function (id) {
            let data = this.readFile();
            delete data[id];
            this.saveFile(data);
        }
    }
}