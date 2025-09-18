import swaggerAutogen from 'swagger-autogen';

const doc: object = {
    info: {
        title: 'Aptismart',
        description: 'Documentazione generata automaticamente con swagger-autogen',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile: string = './swagger-output.json';
const endpointsFiles: Array<string> = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log('✅ Documentazione Swagger generata con successo!');
});