const config = {
    app: {
        port: process.env.PORRT || 8080,
        origins: [
            "http://localhost:8081"
        ]
    },
    db: {
        url: "mongodb://0.0.0.0:27017/mypham"
    }
};
module.exports = config;