import express from 'express';
import cors from 'cors';
import {API_VERSION} from "@common/constants";
import taskRoute from "./api/task/router/taskRoute";
import swaggerDoc from "./common/utility/swagger";
import swaggerUi from "swagger-ui-express";

const port = 8080;

const app = express();
// json 형식의 데이터를 해석할 수 있도록 미들웨어 정의
app.use(express.json());
// 교차 출처 데이터 공유 허용
app.use(cors());

// setupSwaggerDocument(app);
// 🔥 Swagger 경로 등록
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(taskRoute);

app.listen(port, () => {
    console.log(`🚀 Express Server가 정상 작동 중이에요! listening on http://localhost:${port}`);
});

app.get('/', (_, response) => {
    response.send(`안녕하세요! 천재 개발자 주니님! 👋`);
});

// app.use('/', taskRoute);
