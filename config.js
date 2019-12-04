module.exports = {
    app: {
        port: process.env.PORT || 4000,
        db: process.env.MONGODB_URI || 'mongodb://localhost:27017/cicloFit',
        secret: 'CiCloFitLedSecretToken',
    }
}