import _ from "lodash";

export default class UpgradeManager {
    static CurrentVersion = 1;

    static GetVersion(fileData) {
        if (_.has(fileData, "version")) {
            return fileData.version;
        } else {
            return 0;
        }
    }

    static Upgrade(fileData) {
        let upgraded = false;

        // NO VERSION LEVEL
        // Append
        //  - Version
        if (!_.has(fileData, "version")) {
            _.merge(fileData, {
                version: 0,
            });

            upgraded = true;
            console.info(`Upgrading ${fileData.title} to version 0`);
        }

        // VERSION 1 UPDATE
        // Append
        //  - data.miscstats.basespeed = [0,0,0,0]
        if (fileData.version == 0) {
            if (_.has(fileData, "data.miscstats")) {
                _.merge(fileData, {
                    data: {
                        miscstats: {
                            basespeed: [fileData.data.miscstats.speed[0], fileData.data.miscstats.speed[2], fileData.data.miscstats.speed[3], fileData.data.miscstats.speed[4]],
                        },
                    },
                });

                fileData.data.miscstats.speed = [0, fileData.data.miscstats.speed[1], 0, 0, 0];
            }

            fileData.version = 1;
            upgraded = true;
            console.info(`Upgrading ${fileData.title} to version 1`);
        }

        return upgraded;
    }
}
