import swaggerJsDoc from 'swagger-jsdoc';
import * as path from "node:path";

const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '주니의 할 일 Express API!!',
            version: '0.0.0',
            description: '주니의 할 일 백엔드 API 명세에요 😎',
        },

        servers: [
            {
                url: 'http://localhost:8080/',
            },
        ],
    },

    apis: ['../../api/**/*.ts'],
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

export default swaggerDoc;

// export const setupSwaggerDocument = (express: Express) => {
//     express.use(`${API_VERSION}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
// }
